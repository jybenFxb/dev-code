// lib/utils/format.dart

import 'package:intl/intl.dart';

final _currencyFmt = NumberFormat('#,##0.00', 'zh_CN');
final _monthFmt = DateFormat('yyyy年MM月');
final _dateFmt = DateFormat('MM月dd日');
final _fullDateFmt = DateFormat('yyyy-MM-dd');

String formatAmount(double amount) => '¥${_currencyFmt.format(amount)}';

String formatMonth(DateTime dt) => _monthFmt.format(dt);

String formatDate(DateTime dt) => _dateFmt.format(dt);

String formatFullDate(DateTime dt) => _fullDateFmt.format(dt);

/// 判断两个 DateTime 是否在同一天
bool isSameDay(DateTime a, DateTime b) =>
    a.year == b.year && a.month == b.month && a.day == b.day;

/// 今天 / 昨天 / 具体日期
String friendlyDate(DateTime dt) {
  final now = DateTime.now();
  if (isSameDay(dt, now)) return '今天';
  if (isSameDay(dt, now.subtract(const Duration(days: 1)))) return '昨天';
  return formatDate(dt);
}
