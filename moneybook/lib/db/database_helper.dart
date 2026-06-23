// lib/db/database_helper.dart

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../models/category.dart';
import '../models/transaction.dart';

class DatabaseHelper {
  static const _dbName = 'moneybook.db';
  static const _dbVersion = 1;

  static const tableTransactions = 'transactions';
  static const tableCategories = 'categories';

  DatabaseHelper._internal();
  static final DatabaseHelper instance = DatabaseHelper._internal();

  Database? _db;

  Future<Database> get database async {
    _db ??= await _initDB();
    return _db!;
  }

  Future<Database> _initDB() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, _dbName);
    return openDatabase(
      path,
      version: _dbVersion,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE $tableCategories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        type TEXT NOT NULL,
        color_value INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE $tableTransactions (
        id TEXT PRIMARY KEY,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        category_id TEXT NOT NULL,
        note TEXT,
        date INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES $tableCategories(id)
      )
    ''');

    // 插入默认分类
    final batch = db.batch();
    for (final cat in kDefaultCategories) {
      batch.insert(tableCategories, cat.toMap());
    }
    await batch.commit(noResult: true);
  }

  // ── Categories ────────────────────────────────────────────

  Future<List<Category>> getCategories({CategoryType? type}) async {
    final db = await database;
    final where = type != null ? 'type = ?' : null;
    final whereArgs = type != null
        ? [type == CategoryType.income ? 'income' : 'expense']
        : null;
    final maps = await db.query(
      tableCategories,
      where: where,
      whereArgs: whereArgs,
      orderBy: 'name ASC',
    );
    return maps.map(Category.fromMap).toList();
  }

  Future<Category?> getCategoryById(String id) async {
    final db = await database;
    final maps = await db.query(
      tableCategories,
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return null;
    return Category.fromMap(maps.first);
  }

  Future<void> insertCategory(Category category) async {
    final db = await database;
    await db.insert(
      tableCategories,
      category.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> deleteCategory(String id) async {
    final db = await database;
    await db.delete(tableCategories, where: 'id = ?', whereArgs: [id]);
  }

  // ── Transactions ──────────────────────────────────────────

  Future<List<Transaction>> getTransactions({
    DateTime? from,
    DateTime? to,
    String? categoryId,
    TransactionType? type,
    int? limit,
    int? offset,
  }) async {
    final db = await database;
    final conditions = <String>[];
    final args = <dynamic>[];

    if (from != null) {
      conditions.add('date >= ?');
      args.add(from.millisecondsSinceEpoch);
    }
    if (to != null) {
      conditions.add('date <= ?');
      args.add(to.millisecondsSinceEpoch);
    }
    if (categoryId != null) {
      conditions.add('category_id = ?');
      args.add(categoryId);
    }
    if (type != null) {
      conditions.add('type = ?');
      args.add(type == TransactionType.income ? 'income' : 'expense');
    }

    final maps = await db.query(
      tableTransactions,
      where: conditions.isEmpty ? null : conditions.join(' AND '),
      whereArgs: args.isEmpty ? null : args,
      orderBy: 'date DESC',
      limit: limit,
      offset: offset,
    );
    return maps.map(Transaction.fromMap).toList();
  }

  Future<Transaction?> getTransactionById(String id) async {
    final db = await database;
    final maps = await db.query(
      tableTransactions,
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return null;
    return Transaction.fromMap(maps.first);
  }

  Future<void> insertTransaction(Transaction tx) async {
    final db = await database;
    await db.insert(
      tableTransactions,
      tx.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> updateTransaction(Transaction tx) async {
    final db = await database;
    await db.update(
      tableTransactions,
      tx.toMap(),
      where: 'id = ?',
      whereArgs: [tx.id],
    );
  }

  Future<void> deleteTransaction(String id) async {
    final db = await database;
    await db.delete(tableTransactions, where: 'id = ?', whereArgs: [id]);
  }

  // ── 统计查询 ──────────────────────────────────────────────

  /// 指定月份收支汇总
  Future<MonthlySummary> getMonthlySummary(int year, int month) async {
    final db = await database;
    final start = DateTime(year, month).millisecondsSinceEpoch;
    final end = DateTime(year, month + 1).millisecondsSinceEpoch;

    final rows = await db.rawQuery('''
      SELECT type, SUM(amount) as total
      FROM $tableTransactions
      WHERE date >= ? AND date < ?
      GROUP BY type
    ''', [start, end]);

    double income = 0, expense = 0;
    for (final row in rows) {
      final total = (row['total'] as num?)?.toDouble() ?? 0;
      if (row['type'] == 'income') income = total;
      if (row['type'] == 'expense') expense = total;
    }
    return MonthlySummary(
      year: year,
      month: month,
      totalIncome: income,
      totalExpense: expense,
    );
  }

  /// 指定月份按分类汇总（用于饼图）
  Future<List<Map<String, dynamic>>> getCategorySummary({
    required int year,
    required int month,
    required TransactionType type,
  }) async {
    final db = await database;
    final start = DateTime(year, month).millisecondsSinceEpoch;
    final end = DateTime(year, month + 1).millisecondsSinceEpoch;
    final typeStr = type == TransactionType.income ? 'income' : 'expense';

    return db.rawQuery('''
      SELECT category_id, SUM(amount) as total, COUNT(*) as cnt
      FROM $tableTransactions
      WHERE date >= ? AND date < ? AND type = ?
      GROUP BY category_id
      ORDER BY total DESC
    ''', [start, end, typeStr]);
  }

  /// 最近 N 个月趋势
  Future<List<MonthlySummary>> getMonthlyTrend({int months = 6}) async {
    final now = DateTime.now();
    final results = <MonthlySummary>[];
    for (var i = months - 1; i >= 0; i--) {
      final d = DateTime(now.year, now.month - i);
      results.add(await getMonthlySummary(d.year, d.month));
    }
    return results;
  }
}
