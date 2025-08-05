import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserListPage from '../pages/UserListPage';
import AddUserPage from '../pages/AddUserPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/add" element={<AddUserPage />} />
        </Routes>
    );
};

export default AppRoutes;