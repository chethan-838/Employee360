import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/current-user/",
                    {
                        withCredentials: true
                    }
                );

                setAuthenticated(response.data.authenticated);
            } catch (error) {
                if (error.response?.status === 401) {
                    setAuthenticated(false);
                } else {
                    console.error("Authentication check error:", error);
                    setAuthenticated(false);
                }
            }
        };

        checkAuthentication();
    }, []);

    if (authenticated === null) {
        return (
            <div className="text-center mt-5">
                <div
                    className="spinner-border"
                    role="status"
                ></div>

                <p className="mt-3">
                    Checking authentication...
                </p>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;