
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Departments from "./pages/Departments";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />

                <Route path="/employees" element={ <ProtectedRoute> <Employees /> </ProtectedRoute> } />

                <Route path="/add-employee" element={ <ProtectedRoute> <AddEmployee /> </ProtectedRoute>} />

                <Route path="/departments" element={ <ProtectedRoute> <Departments /> </ProtectedRoute>} />

                <Route path="/tasks" element={ <ProtectedRoute> <Tasks /> </ProtectedRoute>} />

                <Route path="/add-task" element={ <ProtectedRoute> <AddTask /> </ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;