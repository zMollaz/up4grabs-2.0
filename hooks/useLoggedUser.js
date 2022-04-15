import { getSession } from "next-auth/react";
import axios from "axios";

const useLoggedUser = async () => {
  const users = await axios.get("/api/users");
  console.log("users inside session hook", users);
  const session = await getSession();
  const user = users.find((user) => user.email === session?.user.email);
  console.log("user inside session hook", user);
  return { user, users };
};

export default useLoggedUser;
