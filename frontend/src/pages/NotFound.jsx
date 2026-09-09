import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container py-5 text-center">

            <div className="card shadow-sm border-0 rounded-4 p-5">

                <h1 className="display-1 fw-bold text-primary">
                    404
                </h1>

                <h2 className="fw-bold mb-3">
                    Page Not Found
                </h2>

                <p className="text-muted mb-4">
                    Sorry, the page you are looking for does not exist.
                </p>

                <div>
                    <Link
                        to="/dashboard"
                        className="btn btn-primary px-4"
                    >
                        <i className="bi bi-house-fill me-2"></i>
                        Back to Dashboard
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default NotFound;