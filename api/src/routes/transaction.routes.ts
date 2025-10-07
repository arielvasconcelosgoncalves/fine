import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/createTransaction.controller";
import {
  deleteTransactionSchema,
  getHistoricalTransactionsSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
import getTransactions from "../controllers/getTransactions.controller";
import { toJSONSchema, z } from "zod";
import { getTransactionsSummary } from "../controllers/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/deleteTransaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getHistoricalTransactions } from "../controllers/getHistoricalTransactions.controller";

function toFastifySchema(schema: z.ZodTypeAny) {
  const jsonSchema = toJSONSchema(schema);
  delete (jsonSchema as any).$schema; // 🔥 remove referência ao draft 2020-12
  return jsonSchema;
}

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authMiddleware);
  //Lançar uma transação

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: {
        type: "object",
        required: ["description", "amount", "date", "categoryId", "type"],
        properties: {
          description: { type: "string" },
          amount: { type: "number" },
          categoryId: { type: "string" },
          type: { type: "string", enum: ["expense", "income"] },
        },
      },
    },
    handler: createTransaction,
  });

  //Buscar com Filtros

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: toFastifySchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  // Busccar um Resumo

  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: toFastifySchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: toFastifySchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });


  // Histórico de Transação
  fastify.route({
    method: "GET",
    url: "/historical",
    schema: {
      querystring: toFastifySchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTransactions,
  });

};

export default transactionRoutes;
