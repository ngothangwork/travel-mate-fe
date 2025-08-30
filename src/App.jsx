import React, { StrictMode } from 'react';
import './index.css';
import AppRoutes from "./routes/index.jsx";
import {BrowserRouter} from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    );
}

export default App;