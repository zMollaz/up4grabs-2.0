import prisma from "../../lib/prisma";

export default async function usersHandler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ messsage: "Method not allowed" });
  }

  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.json({ users });
  }

  if (req.method === "POST") {
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
