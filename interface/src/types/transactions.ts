import type { Category, CategorySummary } from "./category";

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string | Date;
  categoryId: string;
  type: TransactionType;
  createdAt: string | Date;
  updateAt: string | Date;
  category: Category;
  userId: string;
}

export interface createTransactionDTO {
  description: string;
  amount: number;
  date: Date | string;
  categoryId: string;
  type: TransactionType;
}

export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}

export interface MonthlyItem {
  name: string;
  expenses: number;
  income: number;
}
