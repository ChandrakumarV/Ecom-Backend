import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import config from "./config";
import router from "./routes";

export const createServer = () => {
  const app = express();

  app.use(bodyParser.json());

  app.get("/health", async (req: Request, res: Response) => {
    res.json({ ok: true, environment: config.env });
  });

  app.use(router);

  return app;
};
