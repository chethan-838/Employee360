import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../services/api";

function Employees() {

const [employees, setEmployees] = useState([]);

const [search, setSearch] = useState("");

const [loading, setLoading] = useState(true);

const [updateLoading, setUpdateLoading] = useState(false);

const [deleteLoading, setDeleteLoading] = useState(null);

const [errorMessage, setErrorMessage] = useState("");

const [successMessage, setSuccessMessage] = useState("");

const [editingId, setEditingId] = useState(null);

const [editFormData, setEditFormData] = useState({  
    employee_id:"",  
    name:"",  
    email:"",  
    phone:"",  
    position:"",  
    department:"",  
    joining_date:"",  
    salary:"",  
});  

useEffect(() => {  
    fetchEmployees();  
}, []);  

const fetchEmployees = async () => {

    setLoading(true);
    setErrorMessage("");

    try {

        const response = await API.get("employees/");

        await new Promise(resolve => setTimeout(resolve, 2000));

        setEmployees(response.data);

    } catch (error) {

        console.error(
            "Error fetching employees:",
            error
        );

        setErrorMessage(
            "Unable to load employees. Please try again."
        );

    } finally {

        setLoading(false);

    }
};

const editEmployee = (employee) => {  
    
setSuccessMessage("");
setErrorMessage("");

setEditingId(employee.id);  

setEditFormData({  
    employee_id: employee.employee_id,  
    name: employee.name,  
    email: employee.email,  
    phone: employee.phone,  
    position: employee.position,  
    department: employee.department,  
    joining_date: employee.joining_date,  
    salary: employee.salary  
});  
};  

const updateEmployee = async () => {

    setUpdateLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {

        await API.put(
            `employees/${editingId}/`,
            editFormData
        );

        setEditingId(null);

        setSuccessMessage("Employee updated successfully!");

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        await fetchEmployees();

    } catch (error) {

        console.error(
            "Error updating employee:",
            error
        );

        setErrorMessage(
    error.response?.data?.detail ||
    "Unable to update employee. Please try again."
);

    } finally {

        setUpdateLoading(false);

    }
};
const deleteEmployee = async (id) => {

    setDeleteLoading(id);
    setErrorMessage("");
    setSuccessMessage("");

    try {

        await API.delete(`employees/${id}/`);

        setSuccessMessage("Employee deleted successfully!");

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        await fetchEmployees();

    } catch (error) {

        console.error(
            "Error deleting employee:",
            error
        );

       setErrorMessage(
    error.response?.data?.detail ||
    "Unable to delete employee. Please try again."
);

    } finally {

        setDeleteLoading(null);

    }
};

return (  
    <>  
        <Navbar />  

        <div className="container-fluid py-4">  

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">  

                <div>  
                    <h1 className="fw-bold">  
                        Employees  
                    </h1>  

                    <p className="text-muted">  
                        Manage company employees  
                    </p>  
                </div>  

                 <Link  
                    to="/dashboard"  
                    className="btn btn-secondary"  
                >  
                    ← Dashboard
                </Link>  

                <Link
    to="/add-employee"
    className="btn btn-primary"
>
    <i className="bi bi-person-plus-fill me-1"></i>
    Add Employee
</Link> 

                <button
    className="btn btn-outline-primary"
    onClick={fetchEmployees}
    disabled={loading}
>
    <i className="bi bi-arrow-clockwise me-1"></i>
    {loading ? "Refreshing..." : "Refresh"}
</button>

            </div>  

            {editingId && (  
<div className="card shadow-sm border-0 mb-4">  
    <div className="card-body">  
        <h5 className="fw-bold mb-3">Edit Employee</h5>  

         <form onSubmit={(e) => {
    e.preventDefault();
    updateEmployee();
}}>

        <div className="row g-3">  

            <div className="col-md-6">  
                <label className="form-label">Employee ID</label>  
               <input  
                  type="text"  
                  className="form-control"  
                  value={editFormData.employee_id}  
                      onChange={(e) =>  
                 setEditFormData({  
                    ...editFormData,  
                  employee_id: e.target.value  
                })  
                }  
                />  
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Name</label>  
                <input  
                  type="text"  
                  className="form-control"  
                  value={editFormData.name}  
                  onChange={(e) =>  
                  setEditFormData({  
                      ...editFormData,  
                  name: e.target.value  
                })  
                }  
                />  
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Email</label>  
                <input  
                  type="email"  
                  className="form-control"  
                  value={editFormData.email}  
                  onChange={(e) =>  
                      setEditFormData({  
                           ...editFormData,  
                           email: e.target.value  
                        })  
                    }  
                />  
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Phone</label>  
                <input
    type="text"
    className="form-control"
    value={editFormData.phone}
    onChange={(e) =>
        setEditFormData({
            ...editFormData,
            phone: e.target.value
        })
    }
/>
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Position</label>  
                <input  
                   type="text"  
                   className="form-control"  
                   value={editFormData.position}  
                   onChange={(e) =>  
                       setEditFormData({  
                           ...editFormData,  
                           position: e.target.value  
                        })  
                    }  
                />  
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Department</label>  
                <input  
                   type="text"  
                   className="form-control"  
                   value={editFormData.department}  
                   onChange={(e) =>  
                       setEditFormData({  
                           ...editFormData,  
                           department: e.target.value  
                        })  
                    }  
                />  
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Joining Date</label>  
                <input  
                   type="date"  
                   className="form-control"  
                   value={editFormData.joining_date}  
                   onChange={(e) =>  
                       setEditFormData({  
                           ...editFormData,  
                           joining_date: e.target.value  
                        })  
                    }  
                />  
            </div>  

            <div className="col-md-6">  
                <label className="form-label">Salary</label>  
                <input  
                   type="number"  
                   className="form-control"  
                   value={editFormData.salary}  
                   onChange={(e) =>  
                       setEditFormData({  
                           ...editFormData,  
                           salary: e.target.value  
                        })  
                    }  
                />  
            </div>  

            <div className="mt-4">  
               <button
    className="btn btn-success me-2"
    onClick={updateEmployee}
    disabled={updateLoading}
>
    {updateLoading ? (
        <>
            <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
            ></span>
            Updating...
        </>
    ) : (
        "Update Employee"
    )}
</button>

        <button
          className="btn btn-secondary"
          onClick={() => {
             setEditingId(null);
             setSuccessMessage("");
             setErrorMessage("");
            }}
        >
             Cancel
        </button>
           
           </div>  
           
        </div>  
       </form>
        
    </div>  
</div>


)}

{errorMessage && (
    <div className="alert alert-danger text-center fw-bold mb-3">
        ⚠️ {errorMessage}
    </div>
)}

{successMessage && (
    <div className="alert alert-success text-center fw-bold mb-3">
        ✅ {successMessage}
    </div>
)}

<div className="card shadow-sm border-0">  

                <div className="card-body">  

                    <div className="mb-3 d-flex gap-2">  
                 <input  
                  type="text"  
                  className="form-control"  
                  placeholder="Search employees..."  
                  value={search}  
                  onChange={(e) => setSearch(e.target.value)}  
                 />  

                 {search && (  
                 <button  
                  className="btn btn-secondary"  
                  onClick={() => setSearch("")}  
                 >  
                 Clear  
                 </button>  
                 )}  
                </div>  

                  {loading && (
    <div className="text-center py-4">
        <div
            className="spinner-border text-primary"
            role="status"
        ></div>

        <p className="text-muted mt-2 mb-0">
            Loading employees...
        </p>
    </div>
)}

                    <div className="table-responsive">  

                        <table className="table table-hover align-middle">  

                            <thead className="table-dark">  
                                <tr>  
                                    <th>Employee ID</th>  
                                    <th>Name</th>  
                                    <th>Email</th>  
                                    <th>Position</th>  
                                    <th>Actions</th>  
                                </tr>  
                            </thead>  

                            <tbody>  

                                {employees.filter((employee) =>  
                                 employee.name.toLowerCase().includes(search.toLowerCase()) ||  
                                 employee.employee_id.toLowerCase().includes(search.toLowerCase()) ||  
                                 employee.email.toLowerCase().includes(search.toLowerCase()) ||  
                                 employee.position.toLowerCase().includes(search.toLowerCase())  
                                ).length > 0 ? (  

                                    employees.filter((employee) =>  
                                    employee.name.toLowerCase().includes(search.toLowerCase()) ||  
                                    employee.employee_id.toLowerCase().includes(search.toLowerCase()) ||  
                                    employee.email.toLowerCase().includes(search.toLowerCase()) ||  
                                    employee.position.toLowerCase().includes(search.toLowerCase())  
                                    )  
                                      .map((employee) => (  

                                        <tr key={employee.id}>  

                                            <td>  
                                                {employee.employee_id}  
                                            </td>  

                                            <td>  
                                                {employee.name}  
                                            </td>  

                                            <td>  
                                                {employee.email}  
                                            </td>  

                                            <td>  
                                                {employee.position}  
                                            </td>  

                                            <td>  

                                                <button
    className="btn btn-sm btn-warning me-2"
    onClick={() => editEmployee(employee)}
>
    <i className="bi bi-pencil-square me-1"></i>
    Edit
</button>  

                                               <button
    className="btn btn-sm btn-danger"
    onClick={() => {
        if (window.confirm(`Delete ${employee.name}?`)) {
            deleteEmployee(employee.id);
        }
    }}
    disabled={deleteLoading === employee.id}
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
                                            colSpan="5"  
                                            className="text-center py-4"  
                                        >  
                                          <div className="text-center py-5">
    <i className="bi bi-people fs-1 text-muted"></i>

    <h5 className="mt-3">
        No employees found
    </h5>

    <p className="text-muted">
        Try changing your search or add a new employee.
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

export default Employees;