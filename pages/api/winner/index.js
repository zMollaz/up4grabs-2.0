import prisma from "../../../lib/prisma";

export default async function winnerHandler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ messsage: "Method not allowed" });
  }

  if (req.method === "POST") {
    const { user_id, listing_id } = req.body;
    // console.log(555,user_id);
    const winner = await prisma.Winners.create({
      data: { user_id, listing_id },
    });
    res.json({ winner });
  }
}
