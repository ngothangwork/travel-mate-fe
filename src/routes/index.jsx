import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import CommunityPlan from "../pages/Plan/CommunityPlan";
import PlanDetail from "../pages/Plan/PlanDetail";
import Layout from "../layouts/Layout.jsx";


function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path="/plans"
                element={
                    <Layout>
                        <CommunityPlan />
                    </Layout>
                }
            />
            <Route
                path="/plans/:idSlug"
                element={
                    <Layout>
                        <PlanDetail />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
