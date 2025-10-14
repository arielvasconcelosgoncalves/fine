import { TransactionType } from "@prisma/client";
import { CategorySummary } from "./category.types";



export interface TransactionFilter {
    userId: string,
    date?: {
        gte: Date
        lte: Date
    },
    type?: TransactionType,
    categoryId?: string
}

// gte -> greater then or equal -> Maior ou igual
// lte -> lower then or equal -> Menor ou igual

export interface TransactionSummary {
    totalExpenses: number;
    totalIncomes: number,
    balance: number,
    expensesByCategory: CategorySummary[];
    incomesByCategory: CategorySummary[];
}