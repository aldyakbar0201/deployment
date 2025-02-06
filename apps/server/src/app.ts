import "dotenv/config";
import express from "express";
import prisma from "./configs/prisma";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "API connected!" });
});

app.post("/api/v1/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json(newUser); // Kirim respons dengan data pengguna yang baru dibuat
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "general error.good luck" });
  }
});

app.get("/api/v1/users", async (req, res) => {
  try {
    console.log(process.env.SUPABASE_DATABASE_URL);
    console.log(process.env.SUPABASE_DIRECT_URL);
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.info(`server is listening on port: ${PORT}`);
});

export default app;
