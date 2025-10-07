import app from "./app.ts";
import {prismaConnect} from "./config/prisma.ts";
import { initializeGlobalCatgories } from "./services/globalCategories.services.ts";
import {env} from "./config/env.ts"
import initializeFirebaseAdmin from "./config/firebase.ts";

const PORT = env.PORT;

initializeFirebaseAdmin();

const startServer = async () => {
  try {

    await prismaConnect();

    await initializeGlobalCatgories();

    await app.listen({ port: PORT }).then(() => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
