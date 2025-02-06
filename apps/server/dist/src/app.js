"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/Config");
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./configs/prisma"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.get("/api/v1", (req, res) => {
    res.status(200).json({ message: "API connected!" });
});
app.post("/api/v1/users", async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await prisma_1.default.user.create({
            data: { name, email },
        });
        res.status(201).json(newUser); // Kirim respons dengan data pengguna yang baru dibuat
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "general error.good luck" });
    }
});
app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.listen(PORT, () => {
    console.info(`server is listening on port: ${PORT}`);
});
exports.default = app;
