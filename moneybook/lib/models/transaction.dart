// lib/models/transaction.dart

import 'category.dart';

enum TransactionType { income, expense }

class Transaction {
  final String id;
  final double amount;
  final TransactionType type;
  final String categoryId;
  final String note;
  final DateTime date;
  final DateTime createdAt;

  const Transaction({
    required this.id,
    required this.amount,
    required this.type,
    required this.categoryId,
    required this.note,
    required this.date,
    required this.createdAt,
  });

  factory Transaction.fromMap(Map<String, dynamic> map) => Transaction(
        id: map['id'] as String,
        amount: (map['amount'] as num).toDouble(),
        type: map['type'] == 'income'
            ? TransactionType.income
            : TransactionType.expense,
        categoryId: map['category_id'] as String,
        note: map['note'] as String? ?? '',
        date: DateTime.fromMillisecondsSinceEpoch(map['date'] as int),
        createdAt: DateTime.fromMillisecondsSinceEpoch(map['created_at'] as int),
      );

  Map<String, dynamic> toMap() => {
        'id': id,
        'amount': amount,
        'type': type == TransactionType.income ? 'income' : 'expense',
        'category_id': categoryId,
        'note': note,
        'date': date.millisecondsSinceEpoch,
        'created_at': createdAt.millisecondsSinceEpoch,
      };

  Transaction copyWith({
    String? id,
    double? amount,
    TransactionType? type,
    String? categoryId,
    String? note,
    DateTime? date,
    DateTime? createdAt,
  }) =>
      Transaction(
        id: id ?? this.id,
        amount: amount ?? this.amount,
        type: type ?? this.type,
        categoryId: categoryId ?? this.categoryId,
        note: note ?? this.note,
        date: date ?? this.date,
        createdAt: createdAt ?? this.createdAt,
      );
}

/// 月度统计汇总
class MonthlySummary {
  final int year;
  final int month;
  final double totalIncome;
  final double totalExpense;

  const MonthlySummary({
    required this.year,
    required this.month,
    required this.totalIncome,
    required this.totalExpense,
  });

  double get balance => totalIncome - totalExpense;
}

/// 按分类汇总（用于饼图）
class CategorySummary {
  final Category category;
  final double amount;
  final int count;

  const CategorySummary({
    required this.category,
    required this.amount,
    required this.count,
  });

  double percentage(double total) => total == 0 ? 0 : amount / total * 100;
}
