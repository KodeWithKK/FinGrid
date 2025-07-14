export const testUserId = "68693b802f4a79d52d0de5ce";

export const transactionCategories = {
  salary: "Salary",
  business: "Business",
  investments: "Investments",
  foodDining: "Food & Dining",
  groceries: "Groceries",
  transportation: "Transportation",
  entertainment: "Entertainment",
  shopping: "Shopping",
  healthcare: "Healthcare",
  travel: "Travel",
  education: "Education",
  subscriptions: "Subscriptions",
  other: "Other",
} as const;

type TransactionCategoryKeys = keyof typeof transactionCategories;

export const TRANSACTION_CATEGORIES = Object.keys(
  transactionCategories,
) as unknown as readonly [
  TransactionCategoryKeys,
  ...TransactionCategoryKeys[],
];
