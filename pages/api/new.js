import prisma from "../../lib/prisma";
import axios from "axios";
import dayjs from "dayjs";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};

const uploadToWebApi = async (listing) => {
  const image = listing.img_src;
  const form = new URLSearchParams();
  form.append("image", image);
  const imageServerWebApi = `https://api.imgbb.com/1/upload?key=44cfa4dc7b5f14fa19e55b846de10cd4`;
  const response = await axios.post(imageServerWebApi, form);
  const retrievedUrl = response.data.data.display_url;
  return retrievedUrl;
};

export default async function formHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ messsage: "Method not allowed" });
  }
  const retrievedState = req.body.state;
  const categoryToInteger = Number(retrievedState.category_id);
  const reqUser = req.body.user;
  const startDate = req.body.startDate;
  const user = await prisma.user.findUnique({
    where: {
      email: reqUser.email,
    },
  });
  // console.log(343, user);
  const imageUrl = await uploadToWebApi(retrievedState);
  const endDate = dayjs(retrievedState.end_date).format("YYYY-MM-DDTHH:mm:ss");
  const newListing = {
    ...retrievedState,
    img_src: imageUrl,
    user_id: user.id,
    category_id: categoryToInteger,
    end_date: endDate,
    start_date: startDate,
  };
  const savedListing = await prisma.listings.create({
    data: newListing,
  });

  res.json({ savedListing });
}
