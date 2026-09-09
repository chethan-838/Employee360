import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddTask() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        employee: "",
        deadline: "",
        status: "Pending"
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch employees
    const fetchEmployees = async () => {
        try {
            const response = await API.get("employees/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear error when user changes a field
        setErrorMessage("");
    };

    // Today's date
    const today = new Date().toISOString().split("T")[0];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check browser validation
        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }

        // Deadline validation
        if (formData.deadline <= today) {
            setErrorMessage(
                "Deadline cannot be today. Please select a future date."
            );
            return;
        }

        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        try {
            await API.post("tasks/", formData);

            setSuccessMessage("Task added successfully!");

            setTimeout(() => {
                navigate("/tasks");
            }, 3000);

        } catch (error) {

    console.error("Failed to add task:", error);
    console.error("Server response:", error.response?.data);

    if (error.response?.data) {
        const serverError = error.response.data;

        if (typeof serverError === "object") {
            const firstError = Object.values(serverError)[0];

            if (Array.isArray(firstError)) {
                setErrorMessage(firstError[0]);
            } else {
                setErrorMessage(String(firstError));
            }
        } else {
            setErrorMessage(String(serverError));
        }
    } else {
        setErrorMessage(
            "Failed to add task. Please check the entered details."
        );
    }

    setLoading(false);
}
    };

    return (
        <>
            <Navbar />

            <div className="container py-4">

                {/* Page Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">

                    <div>
                        <h1 className="fw-bold mb-1">
                            Add New Task
                        </h1>

                        <p className="text-muted mb-0">
                            Create and assign a new task to an employee
                        </p>
                    </div>

                    <div>

                        <button
                            className="btn btn-secondary me-2"
                            onClick={() => navigate("/tasks")}
                            disabled={loading}
                        >
                            ← Back to Tasks
                        </button>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate("/dashboard")}
                            disabled={loading}
                        >
                            Dashboard
                        </button>

                    </div>

                </div>

                {/* Form Card */}
                <div
                    className="card shadow-sm border-0 mx-auto w-100"
                    style={{ maxWidth: "800px" }}
                >

                    <div className="card-body p-3 p-md-4">

                        <p className="text-muted small mb-4">
                            All fields marked as required must be completed.
                        </p>

                        <h5 className="fw-bold mb-3">
                            Task Information
                        </h5>

                        {/* Success Message */}
                        {successMessage && (
                            <div
                                className="alert alert-success text-center fw-bold"
                                role="alert"
                            >
                                ✓ {successMessage}
                            </div>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <div
                                className="alert alert-danger text-center fw-bold"
                                role="alert"
                            >
                                ⚠ {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Task Title */}
                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Task Title{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <small className="text-muted d-block mb-2">
                                    Enter a short and clear title for the task.
                                </small>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter task title"
                                    maxLength={200}
                                    minLength={3}
                                    required
                                />

                                <small className="text-muted d-block text-end">
                                    {formData.title.length}/200 characters
                                </small>

                            </div>

                            {/* Description */}
                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Task Description{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <small className="text-muted d-block mb-2">
                                    Provide a brief description of the task.
                                </small>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter task description"
                                    maxLength={1000}
                                    minLength={10}
                                    required
                                />

                                <small className="text-muted d-block text-end">
                                    {formData.description.length}/1000 characters
                                </small>

                            </div>

                            {/* Employee */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Employee{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <select
                                    name="employee"
                                    className="form-select"
                                    value={formData.employee}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.employee_id} -{" "}
                                            {employee.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* Deadline */}
                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Deadline{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <small className="text-muted d-block mb-2">
                                    Select a future date by which the task
                                    should be completed.
                                </small>

                                <input
                                    type="date"
                                    name="deadline"
                                    className="form-control"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                />

                            </div>

                            {/* Status */}
                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Task Status{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <small className="text-muted d-block mb-2">
                                    Select the current status of this task.
                                </small>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                </select>

                            </div>

                            {/* Add Task Button */}
                            <button
                                type="submit"
                                className="btn btn-primary me-3"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>

                                        Adding Task...
                                    </>
                                ) : (
                                    "Add Task"
                                )}

                            </button>

                            {/* Loading Message */}
                            {loading && (
                                <small className="text-muted ms-2">
                                    Please wait...
                                </small>
                            )}

                            {/* Clear Form Button */}
                            <button
                                type="button"
                                className="btn btn-outline-secondary me-3"
                                onClick={() => {

                                    if (
                                        window.confirm(
                                            "Are you sure you want to clear the form?"
                                        )
                                    ) {

                                        setFormData({
                                            title: "",
                                            description: "",
                                            employee: "",
                                            deadline: "",
                                            status: "Pending"
                                        });

                                        setErrorMessage("");
                                        setSuccessMessage("");
                                    }

                                }}
                                disabled={loading}
                            >
                                Clear Form
                            </button>

                            {/* Cancel Button */}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {

                                    if (
                                        window.confirm(
                                            "Are you sure you want to cancel?"
                                        )
                                    ) {
                                        navigate("/tasks");
                                    }

                                }}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            {/* Return to Tasks */}
                            <div className="mt-4">

                                <button
                                    type="button"
                                    className="btn btn-link text-decoration-none"
                                    onClick={() => navigate("/tasks")}
                                    disabled={loading}
                                >
                                    ← Return to Tasks
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AddTask;