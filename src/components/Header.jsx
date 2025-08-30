import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xoá token trong localStorage hoặc context
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-blue-600">
                TravelMate
            </Link>

            {/* Nav menu */}
            <nav className="flex gap-6">
                <Link to="/" className="hover:text-blue-600">
                    Home
                </Link>
                <Link to="/plans" className="hover:text-blue-600">
                    Plans
                </Link>
                <Link to="/community" className="hover:text-blue-600">
                    Community
                </Link>
            </nav>

            {/* Auth */}
            <div>
                {localStorage.getItem("accessToken") ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
