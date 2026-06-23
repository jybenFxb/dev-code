// lib/screens/stats_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';
import '../providers/transaction_provider.dart';
import '../models/transaction.dart';
import '../utils/format.dart';

class StatsScreen extends ConsumerWidget {
  const StatsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedMonth = ref.watch(selectedMonthProvider);
    final summaryAsync = ref.watch(monthlySummaryProvider);
    final expenseSummaryAsync = ref.watch(expenseCategorySummaryProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('${formatMonth(selectedMonth)} 统计'),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // 收支概览
          summaryAsync.when(
            data: (s) => _OverviewRow(
              income: s.totalIncome,
              expense: s.totalExpense,
              balance: s.balance,
            ),
            loading: () =>
                const Center(child: CircularProgressIndicator()),
            error: (_, __) => const SizedBox.shrink(),
          ),
          const SizedBox(height: 16),

          // 支出分类饼图
          expenseSummaryAsync.when(
            data: (list) {
              if (list.isEmpty) {
                return const _EmptyStats(label: '本月暂无支出数据');
              }
              final totalExpense =
                  list.fold(0.0, (sum, e) => sum + e.amount);
              return _PieCard(
                title: '支出分类分布',
                items: list,
                total: totalExpense,
              );
            },
            loading: () =>
                const Center(child: CircularProgressIndicator()),
            error: (_, __) => const SizedBox.shrink(),
          ),
          const SizedBox(height: 16),

          // 月度趋势柱状图
          ref.watch(monthlyTrendProvider).when(
                data: (trend) => _BarCard(trend: trend),
                loading: () =>
                    const Center(child: CircularProgressIndicator()),
                error: (_, __) => const SizedBox.shrink(),
              ),
        ],
      ),
    );
  }
}

class _OverviewRow extends StatelessWidget {
  final double income, expense, balance;
  const _OverviewRow(
      {required this.income,
      required this.expense,
      required this.balance});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        _OverviewCard(
            label: '收入',
            amount: income,
            color: const Color(0xFF00B894)),
        const SizedBox(width: 12),
        _OverviewCard(
            label: '支出',
            amount: expense,
            color: const Color(0xFFFF6B6B)),
        const SizedBox(width: 12),
        _OverviewCard(
          label: '结余',
          amount: balance,
          color: balance >= 0
              ? const Color(0xFF6C5CE7)
              : const Color(0xFFFF7675),
        ),
      ],
    );
  }
}

class _OverviewCard extends StatelessWidget {
  final String label;
  final double amount;
  final Color color;
  const _OverviewCard(
      {required this.label, required this.amount, required this.color});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label,
                style: TextStyle(
                    fontSize: 12, color: color.withOpacity(0.8))),
            const SizedBox(height: 4),
            Text(
              formatAmount(amount),
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: color,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

class _PieCard extends StatefulWidget {
  final String title;
  final List items;
  final double total;
  const _PieCard(
      {required this.title, required this.items, required this.total});

  @override
  State<_PieCard> createState() => _PieCardState();
}

class _PieCardState extends State<_PieCard> {
  int _touchedIndex = -1;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(widget.title,
              style: const TextStyle(
                  fontSize: 15, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          Row(
            children: [
              SizedBox(
                height: 180,
                width: 180,
                child: PieChart(
                  PieChartData(
                    pieTouchData: PieTouchData(
                      touchCallback: (_, pieTouchResponse) {
                        setState(() {
                          if (pieTouchResponse == null ||
                              pieTouchResponse.event is FlPointerExitEvent) {
                            _touchedIndex = -1;
                            return;
                          }
                          _touchedIndex = pieTouchResponse
                                  .touchedSection
                                  ?.touchedSectionIndex ??
                              -1;
                        });
                      },
                    ),
                    sections: widget.items.asMap().entries.map((e) {
                      final isTouched = e.key == _touchedIndex;
                      final item = e.value;
                      final color = Color(item.category.colorValue);
                      return PieChartSectionData(
                        color: color,
                        value: item.amount,
                        title: isTouched
                            ? '${item.percentage(widget.total).toStringAsFixed(1)}%'
                            : '',
                        radius: isTouched ? 80 : 65,
                        titleStyle: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      );
                    }).toList(),
                    centerSpaceRadius: 36,
                    sectionsSpace: 2,
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: widget.items.map((item) {
                    final color = Color(item.category.colorValue);
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        children: [
                          Container(
                            width: 10,
                            height: 10,
                            decoration: BoxDecoration(
                              color: color,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              item.category.name,
                              style: const TextStyle(fontSize: 12),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          Text(
                            formatAmount(item.amount),
                            style: TextStyle(
                              fontSize: 11,
                              color: Colors.grey.shade600,
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _BarCard extends StatelessWidget {
  final List<MonthlySummary> trend;
  const _BarCard({required this.trend});

  @override
  Widget build(BuildContext context) {
    if (trend.isEmpty) return const SizedBox.shrink();
    final maxVal = trend
        .expand((e) => [e.totalIncome, e.totalExpense])
        .reduce((a, b) => a > b ? a : b);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('近6个月收支对比',
              style:
                  TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          SizedBox(
            height: 200,
            child: BarChart(
              BarChartData(
                maxY: maxVal * 1.2,
                gridData: const FlGridData(
                  show: true,
                  drawVerticalLine: false,
                ),
                borderData: FlBorderData(show: false),
                titlesData: FlTitlesData(
                  leftTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        final idx = value.toInt();
                        if (idx < 0 || idx >= trend.length) {
                          return const SizedBox.shrink();
                        }
                        return Text(
                          '${trend[idx].month}月',
                          style: const TextStyle(
                              fontSize: 10, color: Colors.grey),
                        );
                      },
                    ),
                  ),
                ),
                barGroups: trend.asMap().entries.map((e) {
                  return BarChartGroupData(
                    x: e.key,
                    barRods: [
                      BarChartRodData(
                        toY: e.value.totalIncome,
                        color: const Color(0xFF00B894),
                        width: 10,
                        borderRadius: const BorderRadius.vertical(
                            top: Radius.circular(4)),
                      ),
                      BarChartRodData(
                        toY: e.value.totalExpense,
                        color: const Color(0xFFFF6B6B),
                        width: 10,
                        borderRadius: const BorderRadius.vertical(
                            top: Radius.circular(4)),
                      ),
                    ],
                    barsSpace: 4,
                  );
                }).toList(),
              ),
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              _Legend(color: Color(0xFF00B894), label: '收入'),
              SizedBox(width: 20),
              _Legend(color: Color(0xFFFF6B6B), label: '支出'),
            ],
          ),
        ],
      ),
    );
  }
}

class _Legend extends StatelessWidget {
  final Color color;
  final String label;
  const _Legend({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}

class _EmptyStats extends StatelessWidget {
  final String label;
  const _EmptyStats({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120,
      alignment: Alignment.center,
      child: Text(label, style: const TextStyle(color: Colors.grey)),
    );
  }
}
