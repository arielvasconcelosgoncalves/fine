import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/createTransaction.controller";
import {
  deleteTransactionSchema,
  getHistoricalTransactionsSchema,
  getHistoricalTransactionsSchemaYear,
  getTransactionsSchema,
  getTransactionsSummarySchema,
  getTransactionsSummarySchemaYear,
} from "../schemas/transaction.schema";
import getTransactions from "../controllers/getTransactions.controller";
import { toJSONSchema, z } from "zod";
import { getTransactionsSummary } from "../controllers/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/deleteTransaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getHistoricalTransactions,
  getHistoricalTransactionsYear,
} from "../controllers/getHistoricalTransactions.controller";
import { getTransactionsSummaryYear } from "../controllers/getTransactionsSummaryYear.controller";
import getTransactionsYear from "../controllers/getTransactionsYear.controller";

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

  fastify.route({
    method: "GET",
    url: "/year",
    schema: {
      querystring: toFastifySchema(getTransactionsSchema),
    },
    handler: getTransactionsYear,
  });

  // Busccar um Resumo

  fastify.route({
    method: "GET",
    url: "/summary/monthly",
    schema: {
      querystring: toFastifySchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  fastify.route({
    method: "GET",
    url: "/summary/yearly",
    schema: {
      querystring: toFastifySchema(getTransactionsSummarySchemaYear),
    },
    handler: getTransactionsSummaryYear,
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
    url: "/historical/monthly",
    schema: {
      querystring: toFastifySchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTransactions,
  });

  // Histórico de Transação
  fastify.route({
    method: "GET",
    url: "/historical/yearly",
    schema: {
      querystring: toFastifySchema(getHistoricalTransactionsSchemaYear),
    },
    handler: getHistoricalTransactionsYear,
  });
};

export default transactionRoutes;
