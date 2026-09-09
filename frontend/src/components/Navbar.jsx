import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/current-user/",
                {
                    withCredentials: true
                }
            );

            setUsername(response.data.username);
        } catch (error) {
            console.error("Unable to fetch current user:", error);
        }
    };

    fetchCurrentUser();
}, []);

    const handleLogout = async () => {

        const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
);

if (!confirmLogout) {
    return;
}

    try {
        const csrfResponse = await axios.get(
            "http://localhost:8000/csrf/",
            {
                withCredentials: true
            }
        );

        const csrfToken = csrfResponse.data.csrfToken;

        await axios.post(
            "http://localhost:8000/logout/",
            {},
            {
                headers: {
                    "X-CSRFToken": csrfToken
                },
                withCredentials: true
            }
        );

        navigate("/?logout=success");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

    return (
        <nav className="navbar navbar-dark bg-dark px-3 flex-wrap">
            <Link className="navbar-brand" to="/dashboard">
                Employee Management
            </Link>

            <div className="d-flex gap-3 align-items-center flex-wrap justify-content-center">
                {username && (
    <span className="text-white">
        <i className="bi bi-person-circle me-1"></i>
        {username}
    </span>
)}
                <Link className="nav-link text-white" to="/dashboard">
                    Dashboard
                </Link>

                <Link className="nav-link text-white" to="/employees">
                    Employees
                </Link>

                <Link className="nav-link text-white" to="/departments">
                    Departments
                </Link>

                <Link className="nav-link text-white" to="/tasks">
                    Tasks
                </Link>

                <button
                    className="btn btn-outline-light btn-sm px-3"
                    onClick={handleLogout}
                >
                   <i className="bi bi-box-arrow-right me-1"></i>
                     Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;