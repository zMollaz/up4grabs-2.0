import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

const useUsers = () => {
  const [userObject, setUserObject] = useState({});

  const userInfoGetter = async () => {
    const response = await axios.get("/api/users");
    const users = response.data.users;
    const session = await getSession();
    const user = users.find((user) => user.email === session?.user.email);
    setUserObject({ user, users });
  };
  useEffect(() => {
    userInfoGetter();
  }, []);

  const { user, users } = userObject;
  return { user, users }; // this is what's in the context app.js
};

export default useUsers;
