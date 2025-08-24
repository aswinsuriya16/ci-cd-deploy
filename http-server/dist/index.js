"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prismaClient = new client_1.PrismaClient();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prismaClient.user.findMany();
        const blogs = yield prismaClient.blog.findMany();
        return res.json({
            users, blogs
        });
    }
    catch (e) {
        return res.json({
            msg: "Error Fetching"
        });
    }
}));
app.post("/add-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield prismaClient.user.create({
            data: {
                username: username,
                password: password
            }
        });
        return res.json({
            msg: "User added!"
        });
    }
    catch (e) {
        return res.json({
            msg: "Error adding user to DB"
        });
    }
}));
app.post("/add-blog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = req.body;
    try {
        yield prismaClient.blog.create({
            data: {
                title, author
            }
        });
        return res.json({
            msg: "Blog added!"
        });
    }
    catch (e) {
        return res.json({
            msg: "Error adding blog !"
        });
    }
}));
app.listen(3001, () => {
    console.log("Port running on 3001");
});
