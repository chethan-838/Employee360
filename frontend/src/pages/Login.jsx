import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
    const logoutMessage =
        new URLSearchParams(window.location.search).get("logout");

    if (logoutMessage === "success") {
    setSuccessMessage("You have been logged out successfully.");

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );

    setTimeout(() => {
        setSuccessMessage("");
    }, 5000);
}
}, []);

    useEffect(() => {
    const checkAuthentication = async () => {

        try {
            await axios.get(
                "http://localhost:8000/current-user/",
                {
                    withCredentials: true
                }
            );

            navigate("/dashboard");
        } catch (error) {
            // User is not logged in
        }
    };

    checkAuthentication();
}, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            // Get CSRF token
            const csrfResponse = await axios.get(
                "http://localhost:8000/csrf/",
                {
                    withCredentials: true
                }
            );

            const csrfToken = csrfResponse.data.csrfToken;

            // Prepare login data
            const formData = new URLSearchParams();

            formData.append("username", username);
            formData.append("password", password);

            // Login
            const response = await axios.post(
                "http://localhost:8000/login/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-CSRFToken": csrfToken
                    },
                    withCredentials: true
                }
            );

            console.log("Login response:", response.data);

            if (response.data.success) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.status === 401) {
                setErrorMessage("Invalid username or password.");
            } else if (error.response?.status === 403) {
                setErrorMessage("CSRF verification failed. Please refresh the page and try again.");
            } else {
                setErrorMessage("Unable to connect to the server. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">

                    <div className="card shadow rounded-4">
                        <div className="card-body p-4">

                            <h2 className="text-center fw-bold mb-4">
                                Employee Management System
                            </h2>

                            <h5 className="text-center mb-4">
                                Login
                            </h5>

                            {errorMessage && (
                                <div
                                    className="alert alert-danger text-center"
                                    role="alert"
                                >
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
    <div className="alert alert-success text-center" role="alert">
        {successMessage}
    </div>
)}

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            ></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;