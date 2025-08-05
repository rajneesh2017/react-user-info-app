import react, { useEffect, useState, useMemo, useContext } from "react";
//import fetchUsers from "../api/userApi";
import { UserContext } from "../components/UserContext";
import UserDetailsModal from "../components/UserDetailsModal";
import AddUserModal from "../components/AddUserModal";
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

const AddUserButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #0056b3;
    outline: none;
  }

  &:active {
    background-color: #00408d;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem; /* add this */
`;

const UserListPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, loading, error } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState({ key: null, direction: "asc" });

  const openModal = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);

  //AddUserModal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    const term = (searchTerm || "").toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    sorted.sort((a, b) => {
      const aKey = a[sortColumn.key] ? a[sortColumn.key].toLowerCase() : "";
      const bKey = b[sortColumn.key] ? b[sortColumn.key].toLowerCase() : "";
      if (aKey < bKey) return sortColumn.direction === "ascending" ? -1 : 1;
      if (aKey > bKey) return sortColumn.direction === "ascending" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortColumn]);

  const handleSort = (key) => {
    setSortColumn((prev) => {
      if (prev.key === key) {
        // Toggle direction
        return {
          key,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return { key, direction: "ascending" };
    });
  };

  if (loading) return <Container>Loading users...</Container>;
  if (error) return <Container>Error loading users: {error}</Container>;

  return (
    <Container>
      <Title>User List</Title>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Search by name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search users by name or email"
        />
        <AddUserButton onClick={handleOpenAddModal}>Add User</AddUserButton>
      </Controls>
      <Table>
        <thead>
          <tr>
            <Th onClick={() => handleSort("name")}>Name</Th>
            <Th onClick={() => handleSort("email")}>Email</Th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedUsers) &&
            sortedUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => openModal(user)}
                style={{ cursor: "pointer" }}
              >
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
              </tr>
            ))}
        </tbody>
      </Table>
      <UserDetailsModal user={selectedUser} onClose={closeModal} />
      {isAddModalOpen && <AddUserModal onClose={handleCloseAddModal} />}
    </Container>
  );
};

export default UserListPage;
