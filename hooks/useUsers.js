import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "cookie-cutter";

const defaultUser = { id: "cl1urrhvl0000sdk1rzfgafx2" };

const useUsers = () => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [users, setUsers] = useState([]);

  const switchUser = (id) => {
    let uId = id;
    if (!uId) {
      uId = "cl1urrhvl0000sdk1rzfgafx2";
    }
    cookie.set("id", uId, { path: "/" });
    const user = users.find((user) => user.id === uId);
    setUser(user || defaultUser);
  };

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data.users);

        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.id]);

  useEffect(() => {
    const cookieId = cookie.get("id") || "cl1urrhvl0000sdk1rzfgafx2";
    switchUser(cookieId);
  }, [loaded]);

  const getUsers = async () => {
    const users = axios.get("/api/users");

    return users;
  };

  return { user, users, switchUser, loaded }; // this is what's in the context app.js
};

export default useUsers;
