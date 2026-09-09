import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const refreshDashboard = () => {
    window.location.reload();
    };

    // Fetch Current User
useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/current-user/",
                {
                    credentials: "include"
                }
            );

            const data = await response.json();

            setUsername(data.username);
        } catch (error) {
            console.error("Unable to fetch current user:", error);
        }
    };

    fetchCurrentUser();
}, []);

    // Fetch Employees
    useEffect(() => {
        API.get("employees/")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
                setError("Failed to load employees. Please try again.");
            });
    }, []);

    // Fetch Departments
    useEffect(() => {
        API.get("departments/")
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
                setError("Failed to load departments. Please try again.");
            });
    }, []);

    // Fetch Tasks
    useEffect(() => {
        API.get("tasks/")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                setError("Failed to load tasks. Please try again.");
            })
            .finally(() => {
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
            });
    }, []);

    // Total Records
    const totalRecords =
        employees.length + departments.length + tasks.length;

    // Pending Tasks
    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    // In Progress Tasks
    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    // Completed Tasks
    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    if (loading) {
    return (
        <>
            <Navbar />

            <div className="container-fluid py-5 text-center">

                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3 text-muted">
                    Loading dashboard...
                </p>

            </div>
        </>
    );
}

if (error) {
    return (
        <>
            <Navbar />

            <div className="container-fluid py-5 text-center">

                <div className="alert alert-danger">
                    <h5 className="fw-bold">
                        Unable to load dashboard
                    </h5>

                    <p className="mb-0">
                        {error}
                    </p>
                </div>

            </div>
        </>
    );
}

    return (
        <>
            <Navbar />

            <div className="container-fluid py-4 dashboard-page">

                {/* Page Heading */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">

    <div>
        <h1 className="fw-bold mb-1">
            Dashboard
        </h1>

        <p className="text-muted mb-0">
             Welcome, <strong>{username || "User"}</strong>!
        </p>

        <p className="text-muted small mb-0">
    Last viewed: {new Date().toLocaleString()}
</p>
    </div>

    <button
        className="btn btn-outline-primary quick-action-btn"
        onClick={refreshDashboard}
    >
       🔄Refresh Dashboard
    </button>

</div>


                {/* Main Statistics Cards */}
                <h4 className="fw-bold mb-3">
                    System Overview
                </h4>

                <p className="text-muted mb-4">
                     Overview of employees, departments, and tasks
               </p>

                <div className="row g-4">

                    {/* Employees */}
                    <div className="col-md-4">

                        <div className="card shadow-sm border-0 h-100 dashboard-clickable-card rounded-4"
                             style={{ cursor: "pointer" }}
                             onClick={() =>
                                window.location.href = "/employees"
                             }
                        >

                            <div className="card-body">

                                <h6 className="text-muted">
                                    <i className="bi bi-people-fill me-2"></i>
                                    Total Employees
                                </h6>

                                <h2 className="fw-bold">
                                    {employees.length}
                                </h2>

                                <p className="text-muted mb-0">
                                    Active employees
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Departments */}
                    <div className="col-md-4">

                        <div className="card shadow-sm border-0 h-100 dashboard-clickable-card rounded-4"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                    window.location.href = "/departments"
                             }
                        >

                            <div className="card-body">

                                <h6 className="text-muted">
                                    <i className="bi bi-building me-2"></i>
                                    Departments
                                </h6>

                                <h2 className="fw-bold">
                                    {departments.length}
                                </h2>

                                <p className="text-muted mb-0">
                                    Company departments
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Total Tasks */}
                    <div className="col-md-4">

                        <div className="card shadow-sm border-0 h-100 dashboard-clickable-card rounded-4"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                window.location.href = "/tasks"
                             }
                        >

                            <div className="card-body">

                                <h6 className="text-muted">
                                    <i className="bi bi-list-task me-2"></i>
                                    Total Tasks
                                </h6>

                                <h2 className="fw-bold">
                                    {tasks.length}
                                </h2>

                                <p className="text-muted mb-0">
                                    Assigned tasks
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Task Statistics */}
                <div className="row g-4 mt-1">

                    {/* Total Records */}
                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 h-100 rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                 <i className="bi bi-database-fill me-2"></i>   
                                    Total Records
                                </h6>

                                <h2 className="fw-bold">
                                    {totalRecords}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* Pending Tasks */}
                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 h-100 rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    <i className="bi bi-hourglass-split me-2"></i>
                                    Pending Tasks
                                </h6>

                                <h2 className="fw-bold">
                                    {pendingTasks}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* In Progress Tasks */}
                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 h-100 rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    <i className="bi bi-arrow-repeat me-2"></i>
                                    In Progress Tasks
                                </h6>

                                <h2 className="fw-bold">
                                    {inProgressTasks}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* Completed Tasks */}
                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 h-100 rounded-4">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Completed Tasks
                                </h6>

                                <h2 className="fw-bold">
                                    {completedTasks}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Recent Employees */}
                <div className="card shadow-sm border-0 rounded-4 mt-5">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">

    <h4 className="fw-bold mb-0">
        <i className="bi bi-people-fill me-2"></i>
        Recent Employees
    </h4>

    <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => window.location.href = "/employees"}
    >
        View All Employees
    </button>

</div>

 <p className="text-muted mb-4">
          Latest employees added to the system
 </p>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>
                                        <th>
                                            <i className="bi bi-person-badge me-2"></i>
                                            Employee ID
                                            </th>

                                        <th>
                                            <i className="bi bi-person me-2"></i>
                                            Name
                                            </th>

                                        <th>
                                            <i className="bi bi-briefcase me-2"></i>
                                            Position
                                            </th>

                                        <th>
                                            <i className="bi bi-building me-2"></i>
                                            Department
                                            </th>
                                    </tr>

                                </thead>


                                <tbody>

    {employees.length > 0 ? (

        employees.slice(-5).reverse().map((employee) => (

            <tr key={employee.id}>

                <td>{employee.employee_id}</td>

                <td>{employee.name}</td>

                <td>{employee.position}</td>

                <td>
                    {departments.find(
                        (department) =>
                            department.id === employee.department
                    )?.name || "Unknown"}
                </td>

            </tr>

        ))

    ) : (

        <tr>
            <td colSpan="4" className="text-center py-4 text-muted">
                No employees found
            </td>
        </tr>

    )}

</tbody>

                            </table>

                        </div>

                    </div>

                </div>


                {/* Recent Tasks */}
                
<div className="card shadow-sm border-0 rounded-4 mt-5">

    <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-4">

            <h4 className="fw-bold mb-0">
                <i className="bi bi-list-task me-2"></i>
                Recent Tasks
            </h4>

            <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => window.location.href = "/tasks"}
            >
                View All Tasks
            </button>

        </div>

        <p className="text-muted mb-4">
              Latest tasks assigned to employees
        </p>

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead className="table-dark">

                    <tr>
                        <th>
                            <i className="bi bi-list-task me-2"></i>
                            Task
                            </th>

                        <th>
                            <i className="bi bi-person me-2"></i>
                            Employee
                            </th>

                        <th>
                            <i className="bi bi-calendar-event me-2"></i>
                            Deadline
                            </th>

                        <th>
                            <i className="bi bi-flag-fill"></i>
                            Status
                            </th>
                    </tr>

                </thead>

                <tbody>

                    {tasks.length > 0 ? (

                        tasks.slice(-5).reverse().map((task) => (

                            <tr key={task.id}>

                                <td>{task.title}</td>

                                <td>
                                    {employees.find(
                                        (employee) =>
                                            employee.id === task.employee
                                    )?.name || "Unknown"}
                                </td>

                                <td>{task.deadline}</td>

                                <td>

                                    <span
                                        className={`badge ${
                                            task.status === "Pending"
                                                ? "bg-warning text-dark"
                                                : task.status === "In Progress"
                                                ? "bg-info text-dark"
                                                : task.status === "Completed"
                                                ? "bg-success"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {task.status}
                                    </span>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center py-4 text-muted"
                            >
                                No tasks found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    </div>

</div>

{/* Quick Actions */}
<div className="card shadow-sm border-0 rounded-4 mt-5">

    <div className="card-body">

        <h4 className="fw-bold mb-4">
            <i className="bi bi-lightning-charge-fill me-2"></i>
            Quick Actions
        </h4>

        <p className="text-muted mb-4">
              Quickly access common management actions
       </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">

            <button
                className="btn btn-primary quick-action-btn"
                onClick={() => window.location.href = "/add-employee"}
            >
                <i className="bi bi-person-plus-fill me-2"></i> 
                Add Employee
            </button>

            <button
                className="btn btn-outline-primary quick-action-btn"
                onClick={() => window.location.href = "/departments"}
            >
                <i className="bi bi-building me-2"></i> 
                Manage Departments
            </button>

            <button
                className="btn btn-success quick-action-btn"
                onClick={() => window.location.href = "/add-task"}
            >
                <i className="bi bi-plus-circle-fill me-2"></i> 
                Add Task
            </button>

            <button
                className="btn btn-outline-success quick-action-btn"
                onClick={() => window.location.href = "/tasks"}
            >
               <i className="bi bi-list-check me-2"></i> 
               View Tasks
            </button>

        </div>

    </div>

</div>

{/* Dashboard Footer */}
<footer className="dashboard-footer text-center text-muted py-4 mt-5 border-top">

    <p className="mb-1">
        Employee Management System
    </p>

    <small>
        © {new Date().getFullYear()} All Rights Reserved
    </small>

</footer>

            </div>
        </>
    );
}

export default Dashboard;