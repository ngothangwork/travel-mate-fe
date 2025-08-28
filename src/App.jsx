import React, { StrictMode } from 'react';
import './index.css';
import AppRoutes from "./routes/index.jsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
}

export default App;