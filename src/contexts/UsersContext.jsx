import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { API_KEY, API_URL } from "../constants";
import { useContext } from "react";
import { AlertContext, AlertType } from "./AlertContext";
import { populateUserFull } from "../utils/populateUsers";

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
  const [userDetail, setUserDetail] = useState({});

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

        const populatedUsers = responseData.data.map(populateUserFull);
        setCacheUsers((prev) => {
          const exists = prev.some((cache) => cache.page === page);
          if (exists) return prev;
          return [...prev, { ...responseData, data: populatedUsers }];
        }); // store whole response
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

  const getUserById = async (id) => {
    setLoading({ ...loading, getUserById: true });

    try {
      const combinedUsers = cacheUsers
        .map((cacheUser) => cacheUser.data)
        .flat();

      let user = combinedUsers.find((user) => user.id === Number(id)); // get cache user

      if (!user) {
        const response = await axios.get(API_URL + `users/${id}`, {
          headers: API_KEY,
        });
        const responseData = response.data;
        user = responseData.data;
      }

      user = populateUserFull(user);
      setUserDetail(user);
    } catch (error) {
      fire({
        title: "Error",
        type: AlertType.error,
        message: error.message,
      });
    }

    setLoading({ ...loading, getUserById: false });
  };

  const addUser = async (user) => {
    setLoading({ ...loading, addUser: true });

    try {
      const requestBody = {
        name: `${user.first_name} ${user.last_name}`,
        job: user.role,
      };
      const response = await axios.post(API_URL + `users`, requestBody, {
        headers: API_KEY,
      });

      const responseData = response.data;

      const newUser = {
        id: Number(responseData.id),
        ...user,
      };

      setCacheUsers((prev) =>
        prev.map((cacheUser) => {
          if (cacheUser.page === 1) {
            return {
              ...cacheUser,
              data: [newUser, ...cacheUser.data],
            };
          }
          return cacheUser;
        })
      );

      fire({
        title: "Success",
        type: AlertType.success,
        message: "Successfully added new employee",
      });
    } catch (error) {
      fire({
        title: "Error",
        type: AlertType.error,
        message: error.message,
      });
    }

    setLoading({ ...loading, addUser: false });
  };

  const deleteUser = async (id) => {
    setLoading({ ...loading, deleteUser: true });

    try {
      setCacheUsers((prev) =>
        prev.map((cache) => {
          return {
            ...cache,
            data: cache.data.filter((user) => user.id !== id),
          };
        })
      );
    } catch (error) {
      fire({
        title: "Error",
        type: AlertType.error,
        message: error.message,
      });
    }

    setLoading({ ...loading, deleteUser: false });
  };

  const updateUser = async ({ id, userUpdate }) => {
    setLoading({ ...loading, updateUser: true });
    try {
      setCacheUsers((prev) =>
        prev.map((cache) => {
          return {
            ...cache,
            data: cache.data.map((user) => {
              if (user.id === id) {
                return userUpdate;
              }
              return user;
            }),
          };
        })
      );

      fire({
        title: "Success",
        type: AlertType.success,
        message: "Successfully update the employee",
      });
    } catch (error) {
      fire({
        title: "Error",
        type: AlertType.error,
        message: error.message,
      });
    }

    setLoading({ ...loading, updateUser: false });
  };

  return (
    <UsersContext.Provider
      value={{
        loading,
        getUsers,
        users,
        getUserById,
        userDetail,
        addUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
