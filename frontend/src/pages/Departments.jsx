import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../services/api";

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [departmentName, setDepartmentName] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await API.get("departments/");
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const addDepartment = async () => {
        if (!departmentName.trim()) {
            return;
        }

        try {
            if (editingId) {
                await API.put(`departments/${editingId}/`, {
                    name: departmentName,
                });
            } else {
                await API.post("departments/", {
                    name: departmentName,
                });
            }

            setDepartmentName("");
            setEditingId(null);
            setShowForm(false);

            fetchDepartments();
        } catch (error) {
            console.error("Error saving department:", error);
        }
    };

    const deleteDepartment = async (id) => {
        try {
            await API.delete(`departments/${id}/`);

            fetchDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    const editDepartment = (department) => {
        setEditingId(department.id);
        setDepartmentName(department.name);
        setShowForm(true);
    };

    return (
        <>
            <Navbar />

            <div className="container-fluid py-4">

                {/* Page Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h1 className="fw-bold">
                            Departments ({departments.length})
                        </h1>

                       <p className="text-muted">
                           Manage Company Departments
                      </p>
                    </div>

                    <div>
                        <Link
                            to="/dashboard"
                            className="btn btn-secondary me-2"
                        >
                            ← Dashboard
                        </Link>

                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setEditingId(null);
                                setDepartmentName("");
                                setShowForm(true);
                            }}
                        >
                            <i className="bi bi-building-add me-1"></i>
                            Add Department
                        </button>
                    </div>

                </div>

                {/* Add / Edit Department Form */}
                {showForm && (
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">

                            <h5 className="fw-bold mb-3">
                                {editingId
                                    ? "Edit Department"
                                    : "Add Department"}
                            </h5>

                            <div className="row g-3">

                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter department name"
                                        value={departmentName}
                                        onChange={(e) =>
                                            setDepartmentName(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-4">

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={addDepartment}
                                    >
                                        {editingId ? "Update" : "Save"}
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowForm(false);
                                            setDepartmentName("");
                                            setEditingId(null);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                )}

                {/* Departments Table */}
                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Department Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {departments.map((department, index) => (
                                        <tr key={department.id}>

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>
                                                {department.name}
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() =>
                                                        editDepartment(department)
                                                    }
                                                >
                                                     <i className="bi bi-pencil-square me-1"></i>
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                `Delete ${department.name}?`
                                                            )
                                                        ) {
                                                            deleteDepartment(
                                                                department.id
                                                            );
                                                        }
                                                    }}
                                                >
                                                     <i className="bi bi-trash me-1"></i>
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Departments;