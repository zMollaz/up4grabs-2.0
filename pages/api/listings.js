import prisma from "../../lib/prisma";

export default async function listingsHandler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ messsage: "Method not allowed" });
  }
  if (req.method === "GET") {
    const listings = await prisma.listings.findMany();

    res.json({ listings });
  }

}
