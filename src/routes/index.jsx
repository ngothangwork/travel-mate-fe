import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;
