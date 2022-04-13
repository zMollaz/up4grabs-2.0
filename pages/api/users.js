const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function userHandler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ messsage: "Method not allowed" });
  }

  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.json({ users });
  }

  if (req.method === "POST") {
    console.log(777, req.body.state)
    const updateUser = await prisma.user.update({
      where: {
        email: req.body.state.email,
      },
      data: {
        name: req.body.state.name,
        password: req.body.state.password,
      },
    });
    res.json({ updateUser });
  }
}
