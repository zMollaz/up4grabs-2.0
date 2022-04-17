import prisma from "../../../lib/prisma";
export default async function winnerHandler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ messsage: "Method not allowed" });
  }
  if (req.method === "GET") {
    const winner = await prisma.Winners.findFirst({
      where: {
        listing_id: Number(req.query.id),
      },
    });
    
    res.json({ winner });
  }
}
