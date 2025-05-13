import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { API_KEY, API_URL } from "../constants";
import { useContext } from "react";
import { AlertContext, AlertType } from "./AlertContext";
import { populateUserCompact } from "../utils/populateUsers";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const { fire } = useContext(AlertContext);
  const [loading, setLoading] = useState({
    getUsers: false,
    getUserById: false,
    addUser: false,
    updateUser: false,
    deleteUser: false,
  });
  const [cacheUsers, setCacheUsers] = useState([]);
  const [users, setUsers] = useState({});

  const getUsers = async (page) => {
    setLoading({ ...loading, getUsers: true });

    try {
      const users = cacheUsers.find((cache) => cache.page === page); // find cache
      if (users) {
        setUsers(users);
      } else {
        const response = await axios.get(API_URL + `users?page=${page}`, {
          headers: API_KEY,
        });

        const responseData = response.data;

        const populatedUsers = responseData.data.map(populateUserCompact);
        setCacheUsers((prev) => [
          ...prev,
          { ...responseData, data: populatedUsers },
        ]); // store whole response
        setUsers({ ...responseData, data: populatedUsers }); // store only current page users
      }
    } catch (error) {
      fire({
        title: "Error",
        type: AlertType.error,
        message: error.message,
      });
    }

    setLoading({ ...loading, getUsers: false });
  };

  return (
    <UsersContext.Provider value={{ loading, getUsers, users }}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
