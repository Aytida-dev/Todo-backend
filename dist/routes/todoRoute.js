"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const todoRouter = express_1.default.Router();
exports.todoRouter = todoRouter;
const TodoModel_1 = require("../model/TodoModel");
/**
 * @swagger
 * /:
 *  get:
 *       summary: This api is used to test todos route
 *       description: This api is used to test todos route
 *       responses:
 *              200:
 *                  description: todo route
 *
 */
todoRouter.get("/", (req, res) => {
    res.send({
        message: "todo route",
    });
});
/**
 * @swagger
 * /create:
 *  post:
 *       summary: Create a new todo
 *       description: Create a new todo with a title and description.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the todo.
 *                 desc:
 *                   type: string
 *                   description: The description of the todo.
 *       responses:
 *         200:
 *           description: Todo created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 */
todoRouter.post("/create", async (req, res) => {
    try {
        const { title, desc } = req.body;
        const newTodo = new TodoModel_1.TodoModel({
            title,
            desc,
            completed: false,
        });
        const todo = await newTodo.save();
        res.status(200).send({
            message: "todo created",
            todo,
        });
    }
    catch (err) {
        res.status(400).send({
            err: err.message,
        });
    }
});
/**
 * @swagger
 * /allTodo:
 *  get:
 *       summary: Get all todos
 *       description: Get a list of all todos.
 *       responses:
 *         200:
 *           description: List of all todos
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   allTodos:
 *                     type: array
 *
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   err:
 *                     type: string
 */
todoRouter.get("/allTodo", async (req, res) => {
    try {
        const allTodos = await TodoModel_1.TodoModel.find({});
        res.status(200).send({
            allTodos,
        });
    }
    catch (err) {
        res.status(400).send({
            err: err.message,
        });
    }
});
/**
 * @swagger
 * /deleteTodo:
 *  delete:
 *    summary: Delete a specific todo by ID
 *    description: Delete a todo by its unique ID.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *                description: The ID of the todo to delete.
 *    responses:
 *      200:
 *        description: Todo deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The success message.
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                err:
 *                  type: string
 *                  description: Error message in case of a bad request.
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: No todo with the given ID is found.
 */
todoRouter.delete("/deleteTodo", async (req, res) => {
    try {
        const { id } = req.body;
        const todo = await TodoModel_1.TodoModel.findByIdAndDelete(id);
        if (!todo) {
            res.status(404).send({
                message: "no todo with the given id is found",
            });
        }
        console.log(todo);
        res.status(200).send({
            message: "todo deleted",
        });
    }
    catch (err) {
        res.status(400).send({
            err: err.message,
        });
    }
});
/**
 * @swagger
 * /changeCompleteStatus:
 *  patch:
 *    summary: Change the completion status of a specific todo
 *    description: Change the completion status of a todo by its unique ID.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *                description: The ID of the todo to update.
 *              completed:
 *                type: boolean
 *                description: The new completion status for the todo.
 *    responses:
 *      200:
 *        description: Todo completion status updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The success message.
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                err:
 *                  type: string
 *                  description: Error message in case of a bad request.
 */
todoRouter.patch("/changeCompleteStatus", async (req, res) => {
    try {
        const { id, completed } = req.body;
        const todo = await TodoModel_1.TodoModel.findById(id);
        todo.completed = completed;
        const newTodo = await TodoModel_1.TodoModel.findByIdAndUpdate(id, todo, {
            new: true,
        });
        res.status(200).send({
            message: "todo updated",
        });
    }
    catch (err) {
        res.status(400).send({
            err: err.message,
        });
    }
});
/**
 * @swagger
 * /updateTodo:
 *  put:
 *    summary: Update a specific todo
 *    description: Update a todo by its unique ID with new information.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *                description: The ID of the todo to update.
 *              title:
 *                type: string
 *                description: The new title of the todo.
 *              desc:
 *                type: string
 *                description: The new description of the todo.
 *              completed:
 *                type: boolean
 *                description: The new completion status of the todo.
 *              createdAt:
 *                type: string
 *                format: date-time
 *                description: The new creation date of the todo (ISO 8601 date-time format).
 *    responses:
 *      200:
 *        description: Todo updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The success message.
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                err:
 *                  type: string
 *                  description: Error message in case of a bad request.
 */
todoRouter.put("/updateTodo", async (req, res) => {
    try {
        const { id, title, desc, completed, createdAt, } = req.body;
        const newTodo = { title, desc, completed, createdAt };
        const todo = await TodoModel_1.TodoModel.findByIdAndUpdate(id, newTodo, { new: true });
        res.status(200).send({
            message: "todo updated",
        });
    }
    catch (err) {
        res.status(400).send({
            err: err.message,
        });
    }
});
//# sourceMappingURL=todoRoute.js.map