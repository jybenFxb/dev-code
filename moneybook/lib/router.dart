// lib/router.dart

import 'package:go_router/go_router.dart';
import 'screens/home_screen.dart';
import 'screens/add_transaction_screen.dart';
import 'screens/stats_screen.dart';

final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (_, __) => const HomeScreen(),
    ),
    GoRoute(
      path: '/transactions/add',
      builder: (_, __) => const AddTransactionScreen(),
    ),
    GoRoute(
      path: '/transactions/edit/:id',
      builder: (_, state) =>
          AddTransactionScreen(editId: state.pathParameters['id']),
    ),
    GoRoute(
      path: '/transactions',
      builder: (_, __) => const HomeScreen(), // 复用首页，可扩展独立列表页
    ),
    GoRoute(
      path: '/stats',
      builder: (_, __) => const StatsScreen(),
    ),
  ],
);
