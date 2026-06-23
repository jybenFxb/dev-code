// lib/providers/transaction_provider.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../db/database_helper.dart';
import '../models/transaction.dart';
import '../models/category.dart';

const _uuid = Uuid();

// ── 当前查看月份 ─────────────────────────────────────────────

final selectedMonthProvider = StateProvider<DateTime>(
  (ref) => DateTime(DateTime.now().year, DateTime.now().month),
);

// ── 分类列表 ─────────────────────────────────────────────────

final categoriesProvider = FutureProvider<List<Category>>((ref) async {
  return DatabaseHelper.instance.getCategories();
});

final expenseCategoriesProvider = FutureProvider<List<Category>>((ref) async {
  return DatabaseHelper.instance.getCategories(type: CategoryType.expense);
});

final incomeCategoriesProvider = FutureProvider<List<Category>>((ref) async {
  return DatabaseHelper.instance.getCategories(type: CategoryType.income);
});

// ── 当月交易列表 ─────────────────────────────────────────────

final monthlyTransactionsProvider =
    FutureProvider.autoDispose<List<Transaction>>((ref) async {
  final month = ref.watch(selectedMonthProvider);
  final from = DateTime(month.year, month.month);
  final to = DateTime(month.year, month.month + 1);
  return DatabaseHelper.instance.getTransactions(from: from, to: to);
});

// ── 当月收支汇总 ─────────────────────────────────────────────

final monthlySummaryProvider =
    FutureProvider.autoDispose<MonthlySummary>((ref) async {
  final month = ref.watch(selectedMonthProvider);
  return DatabaseHelper.instance.getMonthlySummary(month.year, month.month);
});

// ── 趋势数据（最近 6 个月）──────────────────────────────────

final monthlyTrendProvider =
    FutureProvider<List<MonthlySummary>>((ref) async {
  return DatabaseHelper.instance.getMonthlyTrend(months: 6);
});

// ── 当月分类汇总（饼图）─────────────────────────────────────

final expenseCategorySummaryProvider =
    FutureProvider.autoDispose<List<CategorySummary>>((ref) async {
  final month = ref.watch(selectedMonthProvider);
  final cats = await ref.watch(categoriesProvider.future);
  final catMap = {for (final c in cats) c.id: c};

  final rows = await DatabaseHelper.instance.getCategorySummary(
    year: month.year,
    month: month.month,
    type: TransactionType.expense,
  );

  return rows
      .where((r) => catMap.containsKey(r['category_id']))
      .map((r) => CategorySummary(
            category: catMap[r['category_id']]!,
            amount: (r['total'] as num).toDouble(),
            count: r['cnt'] as int,
          ))
      .toList();
});

// ── 操作：增删改（invalidate 触发 UI 刷新）──────────────────

class TransactionNotifier extends AsyncNotifier<void> {
  @override
  Future<void> build() async {}

  Future<void> add({
    required double amount,
    required TransactionType type,
    required String categoryId,
    required DateTime date,
    String note = '',
  }) async {
    final tx = Transaction(
      id: _uuid.v4(),
      amount: amount,
      type: type,
      categoryId: categoryId,
      note: note,
      date: date,
      createdAt: DateTime.now(),
    );
    await DatabaseHelper.instance.insertTransaction(tx);
    _invalidate();
  }

  Future<void> update(Transaction tx) async {
    await DatabaseHelper.instance.updateTransaction(tx);
    _invalidate();
  }

  Future<void> delete(String id) async {
    await DatabaseHelper.instance.deleteTransaction(id);
    _invalidate();
  }

  void _invalidate() {
    ref.invalidate(monthlyTransactionsProvider);
    ref.invalidate(monthlySummaryProvider);
    ref.invalidate(expenseCategorySummaryProvider);
    ref.invalidate(monthlyTrendProvider);
  }
}

final transactionNotifierProvider =
    AsyncNotifierProvider<TransactionNotifier, void>(TransactionNotifier.new);
