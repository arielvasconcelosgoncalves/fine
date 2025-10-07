import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetTransactionQuery } from "../schemas/transaction.schema";
import type { TransactionFilter } from "../types/transaction.types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../config/prisma";

dayjs.extend(utc);

const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionQuery }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário naõ autenticado" });
  }

  const { month, categoryId, year, type } = request.query;

  const filter: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs
      .utc(`${year}-${month}-01`)
      .startOf("month")
      .toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();

    filter.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filter.type = type;
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filter,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });
    reply.send(transactions);
  } catch (err) {
    request.log.error("Erro ao trazer as informações");
    reply.status(500).send({ error: "Erro do servidor" });
  }
};

export default getTransactions;
