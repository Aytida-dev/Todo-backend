"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: false },
    completed: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});
const TodoModel = mongoose_1.default.model("Todo", TodoSchema);
exports.TodoModel = TodoModel;
//# sourceMappingURL=TodoModel.js.map