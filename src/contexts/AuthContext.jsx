import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("accessToken");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedToken);
        }
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
        console.log(userData);
        console.log(token);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
