import React, { createContext, useState, useEffect } from "react";
import fetchUsers from "../api/userApi";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when the context mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const addUser = (user) => {
    // Add new user with unique id
    const newUser = { ...user, id: users.length + 1 };
    setUsers([...users, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, setUsers, addUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
