import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../services/api";

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        employee: "",
        deadline: "",
        status: "Pending"
    });

    const [search, setSearch] = useState("");

    const fetchTasks = async () => {
        try {
            const response = await API.get("tasks/");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await API.get("employees/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const deleteTask = async (id) => {
        try {
            await API.delete(`tasks/${id}/`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task.");
        }
    };

    const editTask = (task) => {
        setEditingId(task.id);

        setEditFormData({
            title: task.title,
            description: task.description,
            employee: task.employee,
            deadline: task.deadline,
            status: task.status
        });
    };

    const updateTask = async () => {
        try {
            await API.put(`tasks/${editingId}/`, editFormData);

            setEditingId(null);
            fetchTasks();

        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task.");
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const employee = employees.find(
            (employee) => employee.id === task.employee
        );

        const employeeName = employee?.name || "";

        return (
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            employeeName.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <>
            <Navbar />

            <div className="container-fluid py-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h1 className="fw-bold">
                            Tasks ({tasks.length})
                        </h1>

                        <p className="text-muted">
                            Manage and track employee tasks
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="btn btn-secondary"
                    >
                        ← Dashboard
                    </Link>

                    <Link
                        to="/add-task"
                        className="btn btn-primary ms-2"
                    >
                        + Add Task
                    </Link>

                </div>


                {/* Edit Task Form */}

                {editingId && (
                    <div className="card shadow-sm border-0 mb-4">

                        <div className="card-body">

                            <h5 className="fw-bold mb-3">
                                Edit Task
                            </h5>


                            {/* Task Title */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Task Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={editFormData.title}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            title: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Description */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={editFormData.description}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            description: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Employee */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Employee
                                </label>

                                <select
                                    className="form-control"
                                    value={editFormData.employee}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            employee: e.target.value
                                        })
                                    }
                                >

                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map((employee) => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.name}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* Deadline */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Deadline
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={editFormData.deadline}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            deadline: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Status */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-control"
                                    value={editFormData.status}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            status: e.target.value
                                        })
                                    }
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


                            {/* Buttons */}

                            <button
                                className="btn btn-success me-2"
                                onClick={updateTask}
                            >
                                Update Task
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={() => setEditingId(null)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                )}


                {/* Task Table */}

                <div className="card shadow-sm border-0">

                    <div className="card-body">


                        {/* Search */}

                        <div className="mb-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                            {search && (
                                <button className="btn btn-secondary mt-2"
                                onClick={() =>
                                    setSearch("")
                                }
                                >
                                    clear search
                                </button>
                            )}

                        </div>


                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Task</th>

                                        <th>Employee</th>

                                        <th>Deadline</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredTasks.length > 0 ? (

                                        filteredTasks.map((task) => (

                                            <tr key={task.id}>

                                                <td>
                                                    {task.id}
                                                </td>

                                                <td>
                                                    {task.title}
                                                </td>

                                                <td>
                                                    {employees.find(
                                                        (employee) =>
                                                            employee.id === task.employee
                                                    )?.name || "Unknown"}
                                                </td>

                                                <td>
                                                    {task.deadline}
                                                </td>

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

                                                <td>

                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() =>
                                                            editTask(task)
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
                                                                    `Delete ${task.title}?`
                                                                )
                                                            ) {
                                                                deleteTask(task.id);
                                                            }

                                                        }}
                                                    >
                                                         <i className="bi bi-trash me-1"></i>
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-4"
                                            >
                                             <div className="text-center py-5">
    <i className="bi bi-people fs-1 text-muted"></i>

    <h5 className="mt-3">
        No tasks found
    </h5>

    <p className="text-muted">
        Try changing your search or add a new tasks.
    </p>
</div> 
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Tasks;