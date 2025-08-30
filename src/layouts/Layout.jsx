import React from "react";
import Header from "../components/Header.jsx";


function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Content */}
            <main className="flex-1 container mx-auto px-6 py-4">
                {children}
            </main>

            {/* Footer (optional) */}
            <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
                © {new Date().getFullYear()} TravelMate. All rights reserved.
            </footer>
        </div>
    );
}

export default Layout;
