export const testUserId = "68693b802f4a79d52d0de5ce";

export const incomeCategories = {
  salary: "Salary",
  business: "Business",
  investments: "Investments",
};

export const expenseCategory = {
  shopping: "Shopping",
  foodDining: "Food & Dining",
  groceries: "Groceries",
  transportation: "Transportation",
  entertainment: "Entertainment",
  healthcare: "Healthcare",
  travel: "Travel",
  education: "Education",
  subscriptions: "Subscriptions",
};

export const transactionCategories = {
  ...incomeCategories,
  ...expenseCategory,
  other: "Other",
};

export type IncomeCategoryKeys = keyof typeof incomeCategories;
export type ExpenseCategoryKeys = keyof typeof expenseCategory;
export type TransactionCategoryKeys = keyof typeof transactionCategories;

export const TRANSACTION_CATEGORIES = Object.keys(
  transactionCategories,
) as unknown as readonly [
  TransactionCategoryKeys,
  ...TransactionCategoryKeys[],
];

export const INCOME_CATEGORIES = Object.keys(
  incomeCategories,
) as unknown as readonly [IncomeCategoryKeys, ...IncomeCategoryKeys[]];

export const EXPENSE_CATEGORIES = Object.keys(
  expenseCategory,
) as unknown as readonly [ExpenseCategoryKeys, ...ExpenseCategoryKeys[]];
