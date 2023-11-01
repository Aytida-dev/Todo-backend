import express from "express";
import dotenv from "dotenv";
import { db } from "./db";
import cors from "cors";
import { todoRouter } from "./routes/todoRoute";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "todoBackend",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}/todo`,
      },
    ],
  },

  apis: ["./src/routes/todoRoute.ts", "./dist/routes/todoRoute.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/todo", todoRouter);

app.get("/", (req: any, res: any) => {
  res.send({
    message: "backend working",
  });
});

app.listen(port, async () => {
  try {
    await db;
    console.log("connected to db");
  } catch (err) {
    console.log(err, "error connecting to db");
  }

  console.log("app is listening on the port ", port);
});
