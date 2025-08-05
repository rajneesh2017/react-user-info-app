import react, { useEffect, useState, useMemo } from "react";
import fetchUsers from "../api/userApi";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 2px solid #ccc;
  padding: 0.75rem;
  text-align: left;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 300px;
  font-size: 1rem;
`;

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        console.log("Fetched users", users);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);

  // Filter users based on search term in name or email (case-insensitive)
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        if (!user) return false; // skip null/undefined users
        const name = user.name || "";
        const email = user.email || "";
        const term = (searchTerm || "").toLowerCase();
        return (
          name.toLowerCase().includes(term) ||
          email.toLowerCase().includes(term)
        );
      })
    : []; // Return empty array if users is not an array

  if (!users.length) return <Container>Loading users...</Container>;

  return (
    <Container>
      <Title>User List</Title>
      <SearchInput
        type="text"
        placeholder="Search by name or Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search users by name or email"
      />
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Company</Th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredUsers) &&
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.company?.name || "-"}</Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListPage;
