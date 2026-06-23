// lib/models/category.dart

enum CategoryType { income, expense }

class Category {
  final String id;
  final String name;
  final String icon; // emoji
  final CategoryType type;
  final int colorValue;

  const Category({
    required this.id,
    required this.name,
    required this.icon,
    required this.type,
    required this.colorValue,
  });

  factory Category.fromMap(Map<String, dynamic> map) => Category(
        id: map['id'] as String,
        name: map['name'] as String,
        icon: map['icon'] as String,
        type: map['type'] == 'income' ? CategoryType.income : CategoryType.expense,
        colorValue: map['color_value'] as int,
      );

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'icon': icon,
        'type': type == CategoryType.income ? 'income' : 'expense',
        'color_value': colorValue,
      };

  Category copyWith({
    String? id,
    String? name,
    String? icon,
    CategoryType? type,
    int? colorValue,
  }) =>
      Category(
        id: id ?? this.id,
        name: name ?? this.name,
        icon: icon ?? this.icon,
        type: type ?? this.type,
        colorValue: colorValue ?? this.colorValue,
      );
}

/// 内置默认分类
final kDefaultCategories = [
  // 支出
  Category(id: 'cat_food', name: '餐饮', icon: '🍜', type: CategoryType.expense, colorValue: 0xFFFF6B6B),
  Category(id: 'cat_transport', name: '交通', icon: '🚇', type: CategoryType.expense, colorValue: 0xFF4ECDC4),
  Category(id: 'cat_shopping', name: '购物', icon: '🛍️', type: CategoryType.expense, colorValue: 0xFFFFE66D),
  Category(id: 'cat_entertainment', name: '娱乐', icon: '🎮', type: CategoryType.expense, colorValue: 0xFFA29BFE),
  Category(id: 'cat_medical', name: '医疗', icon: '💊', type: CategoryType.expense, colorValue: 0xFFFF7675),
  Category(id: 'cat_housing', name: '住房', icon: '🏠', type: CategoryType.expense, colorValue: 0xFF74B9FF),
  Category(id: 'cat_education', name: '教育', icon: '📚', type: CategoryType.expense, colorValue: 0xFF55EFC4),
  Category(id: 'cat_other_expense', name: '其他支出', icon: '💸', type: CategoryType.expense, colorValue: 0xFFB2BEC3),
  // 收入
  Category(id: 'cat_salary', name: '工资', icon: '💰', type: CategoryType.income, colorValue: 0xFF00B894),
  Category(id: 'cat_bonus', name: '奖金', icon: '🎁', type: CategoryType.income, colorValue: 0xFF00CEC9),
  Category(id: 'cat_investment', name: '投资', icon: '📈', type: CategoryType.income, colorValue: 0xFF6C5CE7),
  Category(id: 'cat_other_income', name: '其他收入', icon: '✨', type: CategoryType.income, colorValue: 0xFFFDCB6E),
];
