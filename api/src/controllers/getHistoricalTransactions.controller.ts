import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  GetHistoricalTransactionsQuery,
  GetHistoricalTransactionsQueryYear,
} from "../schemas/transaction.schema";
import dayjs from "dayjs";
import prisma from "../config/prisma";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";

dayjs.locale("pt-br");
dayjs.extend(utc);

export const getHistoricalTransactions = async (
  request: FastifyRequest<{ Querystring: GetHistoricalTransactionsQuery }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário naõ autenticado" });
  }

  const { month, year, months = 12 } = request.query;

  const baseDate = new Date(year, month - 1, 1);

  const startDate = dayjs
    .utc(baseDate)
    .subtract(months - 1, "month")
    .startOf("month")
    .toDate();
  const endDate = dayjs.utc(baseDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        date: true,
      },
    });

    const montlyData = Array.from({ length: months }, (_, i) => {
      const date = dayjs.utc(baseDate).subtract(months - 1 - i, "month");
      return {
        name: date.format("MM/YYYY"),
        income: 0,
        expense: 0,
      };
    });

    transactions.forEach((transaction) => {
      const monthKey = dayjs.utc(transaction.date).format("MM/YYYY");
      const monthData = montlyData.find((m) => m.name === monthKey);

      if (monthData) {
        if (transaction.type === "income") {
          monthData.income += transaction.amount;
        } else {
          monthData.expense += transaction.amount;
        }
      }
    });

    reply.send({ history: montlyData });
  } catch (err) {}
};

export const getHistoricalTransactionsYear = async (
  request: FastifyRequest<{ Querystring: GetHistoricalTransactionsQueryYear }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário naõ autenticado" });
  }

  const { year, years = 5 } = request.query;

  const baseDate = new Date(year, 0, 1);

  const startDate = dayjs
    .utc(baseDate)
    .subtract(years - 1, "year")
    .startOf("year")
    .toDate();
  const endDate = dayjs.utc(baseDate).endOf("year").toDate();

  try {
    const transactionsYear = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        date: true,
      },
    });

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const date = dayjs.utc(baseDate).subtract(years - 1 - i, "year");
      return {
        name: date.format("YYYY"),
        income: 0,
        expense: 0,
      };
    });

    transactionsYear.forEach((transaction) => {
      const yearKey = dayjs.utc(transaction.date).format("YYYY");
      const yearData = yearlyData.find((m) => m.name === yearKey);

      if (yearData) {
        if (transaction.type === "income") {
          yearData.income += transaction.amount;
        } else {
          yearData.expense += transaction.amount;
        }
      }
    });

    reply.send({ history: yearlyData });
  } catch (err) {}
};
