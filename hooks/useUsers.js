import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "cookie-cutter";
import { getSession } from "next-auth/react";

// const defaultUser = { id: "cl1urrhvl0000sdk1rzfgafx2" };

// const useUsers = () => {
//   const [loaded, setLoaded] = useState(false);
//   const [user, setUser] = useState(sessionGetter());
//   const [users, setUsers] = useState([]);

//   const switchUser = (id) => {
//     let uId = id;
//     if (!uId) {
//       uId = "cl1urrhvl0000sdk1rzfgafx2";
//     }
//     cookie.set("id", uId, { path: "/" });
//     const user = users.find((user) => user.id === uId);
//     setUser(user || defaultUser);
//   };

//   useEffect(() => {
//     getUsers()
//       .then((response) => {
//         setUsers(response.data.users);

//         setLoaded(true);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [user.id]);

//   useEffect(() => {
//     const cookieId = cookie.get("id") || "cl1urrhvl0000sdk1rzfgafx2";
//     switchUser(cookieId);
//   }, [loaded]);

//   const getUsers = async () => {
//     const users = axios.get("/api/users");

//     return users;
//   };

//   return { user, users, switchUser, loaded }; // this is what's in the context app.js
// };

const useUsers = () => {
  const sessionGetter = async () => {
    const session = await getSession();
    const sessionUser = users.find(
      (user) => user.email === session?.user.email
    );
    setUser(sessionUser);
    return sessionUser;
  };

  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
      setLoaded(true);
      return response.data.users;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    sessionGetter();
  }, []);

  useEffect(async () => {
    getUsers();
    sessionGetter();

    // try {
    //   const session = await getSession();
    //   const sessionUser = users.find(
    //     (user) => user.email === session?.user.email
    //   );
    //   setUser(sessionUser);
    // } catch (error) {
    //   console.error(error);
    // }
  }, [user]);

  return { user, users, loaded }; // this is what's in the context app.js
};

export default useUsers;
