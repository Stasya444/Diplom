const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api/photographers", async (req, res) => {
  try {
    const photographers = await prisma.photographer.findMany({
      include: {
        photos: true,
        ratings: true,
      },
    });
    res.json(photographers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка при получении данных");
  }
});

app.listen(3001, () => {
  console.log("Backend работает на http://localhost:3000");
});
