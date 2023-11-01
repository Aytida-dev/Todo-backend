"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const todoRoute_1 = require("./routes/todoRoute");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use("/todo", todoRoute_1.todoRouter);
app.get("/", (req, res) => {
    res.send({
        message: "backend working",
    });
});
app.listen(port, async () => {
    try {
        await db_1.db;
        console.log("connected to db");
    }
    catch (err) {
        console.log(err);
    }
    console.log("app is listening on the port ", port);
});
//# sourceMappingURL=index.js.map