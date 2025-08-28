import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../../utils/api/Login/auth';
import './Login.css';
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const data = await loginWithGoogle(token);
        login(data.user, data.token);
        navigate("/");
    };

    const handleError = () => {
        console.log("Google Login Failed");
    };

    return (
        <div className="login-container">
            <div className="login-form w-100 h-100 justify-center items-center">
                <h2>Bạn cần đăng nhập</h2>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
        </div>
    );
}

export default Login;
