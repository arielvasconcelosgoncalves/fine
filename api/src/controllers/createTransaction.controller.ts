import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateTransactionBody,
  createTransactionSchema,
} from "../schemas/transaction.schema";
import prisma from "../config/prisma";

const createTransaction = async (
  request: FastifyRequest<{ Body: CreateTransactionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário naõ autenticado" });
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;

    reply.status(400).send({ error: errorMessage });
    return;
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });
    if (!category) {
      reply.status(400).send({ error: "Categoria Inválida" });
      return;
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error(err, "Erro ao criar transação");
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
};

export default createTransaction;
