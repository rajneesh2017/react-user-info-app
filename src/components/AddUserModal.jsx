// AddUserModal.jsx
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../components/UserContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;

  &:hover {
    background: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const AddUserModal = ({ onClose }) => {
  const { addUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      setError("All fields are required");
      return;
    }

    addUser(formData);
    onClose(); // close modal
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Add New User</ModalTitle>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">Add User</Button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddUserModal;
