import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function AddEmployee() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        joining_date: "",
        salary: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch departments
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await API.get("departments/");
            setDepartments(response.data);
            console.log("Departments loaded:", response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrorMessage("");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Employee ID validation
        const employeeIdPattern = /^[A-Za-z0-9_-]+$/;

        if (!employeeIdPattern.test(formData.employee_id)) {
            setErrorMessage(
                "Employee ID can contain only letters, numbers, hyphens, and underscores."
            );
            setLoading(false);
            return;
        }

        // Browser validation
        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }

        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const response = await API.post(
                "employees/",
                formData
            );

            console.log("Employee saved:", response.data);

            setSuccessMessage(
                "Employee added successfully"
            );

            setTimeout(() => {
                navigate("/employees");
            }, 1000);

        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );

            setErrorMessage(
                "Failed to add employee. Please check the entered details."
            );

            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-4">

                {/* Page Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h1 className="fw-bold">
                            Add Employee
                        </h1>

                        <p className="text-muted">
                            Add a new employee to the system
                        </p>
                    </div>

                    <Link
                        to="/employees"
                        className="btn btn-secondary"
                    >
                        ← Back
                    </Link>

                </div>

                {/* Employee Form */}
                <div className="card shadow-sm border-0">

                    <div className="card-body p-4">

                        {/* Success Message */}
                        {successMessage && (
                            <div
                                className="alert alert-success"
                                role="alert"
                            >
                                {successMessage}
                            </div>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="row g-3">

                                {/* Employee ID */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Employee ID
                                    </label>

                                    <input
                                        type="text"
                                        name="employee_id"
                                        title="Employee ID can contain only letters, numbers, hyphens, and underscores."
                                        className="form-control"
                                        placeholder="Enter employee ID"
                                        value={formData.employee_id}
                                        onChange={handleChange}
                                        required
                                        minLength={3}
                                        maxLength={20}
                                        pattern="[A-Za-z0-9_-]+"
                                    />

                                </div>

                                {/* Full Name */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        pattern="[A-Za-z ]+"
                                        className="form-control"
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        maxLength={100}
                                        
                                    />

                                </div>

                                {/* Email */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        maxLength={254}
                                    />

                                </div>

                                {/* Phone */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        minLength={10}
                                        maxLength={15}
                                        pattern="[0-9]+"
                                    />

                                </div>

                                {/* Position */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Position
                                    </label>

                                    <input
                                        type="text"
                                        name="position"
                                        className="form-control"
                                        placeholder="e.g. Python Developer"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        maxLength={100}
                                    />

                                </div>

                                {/* Department */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Department
                                    </label>

                                    <select
                                        name="department"
                                        className="form-select"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Department
                                        </option>

                                        {departments.map(
                                            (department) => (
                                                <option
                                                    key={department.id}
                                                    value={department.id}
                                                >
                                                    {department.name}
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>

                                {/* Joining Date */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Joining Date
                                    </label>

                                    <input
                                        type="date"
                                        name="joining_date"
                                        max={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        className="form-control"
                                        value={formData.joining_date}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Salary */}
                                <div className="col-md-6">

                                    <label className="form-label">
                                        Salary
                                    </label>

                                    <input
                                        type="number"
                                        name="salary"
                                        className="form-control"
                                        placeholder="Enter salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="9999999999"
                                        step="0.01"
                                        pattern="^\d+(\.\d{1,2})?$"
                                    />

                                </div>

                                {/* Buttons */}
                                <div className="col-12 mt-4">

                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Saving..."
                                            : "Save Employee"}
                                    </button>

                                    <Link
                                        to="/employees"
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </Link>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AddEmployee;