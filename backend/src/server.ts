import { app } from "./app.js";
import { env } from "./config/env.js";
import { database } from "./database/connection.js";

async function startServer(): Promise<void> {
  try {
    await database.raw("SELECT 1");

    const server = app.listen(env.backendPort, "0.0.0.0", () => {
      console.log(`StudioFlow API executando na porta ${env.backendPort}.`);
      console.log("Conexão com o PostgreSQL estabelecida.");
    });

    const shutdown = async (signal: string): Promise<void> => {
      console.log(`Sinal ${signal} recebido. Encerrando a aplicação...`);

      server.close(async () => {
        await database.destroy();

        console.log("Conexões encerradas.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => {
      void shutdown("SIGTERM");
    });

    process.on("SIGINT", () => {
      void shutdown("SIGINT");
    });
  } catch (error) {
    console.error("Não foi possível iniciar a StudioFlow API.");
    console.error(error);

    await database.destroy();
    process.exit(1);
  }
}

void startServer();