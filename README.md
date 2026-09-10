# Employee360 – Employee Management System

Employee360 is a full-stack Employee Management System designed to simplify employee, department, and task management through a modern and responsive web application.

The application provides a centralized platform where users can manage employee information, organize departments, assign tasks, and perform CRUD operations through an easy-to-use dashboard.

## Project Overview

Employee360 is developed using a modern full-stack architecture with:

- React.js for the frontend
- Python and Django for the backend
- Django REST Framework for REST APIs
- MySQL for database management
- Bootstrap for responsive UI design
- JavaScript, HTML5, and CSS3

The project demonstrates practical full-stack development, REST API integration, database management, CRUD operations, form validation, searching, filtering, and responsive web design.


## Key Features

- User Login and Authentication
- Professional Dashboard
- Employee Management
- Department Management
- Task Management
- Add, Edit, View, and Delete operations
- Employee Search and Filtering
- Department Assignment
- Task Assignment
- Form Validation
- REST API Integration
- MySQL Database Integration
- Responsive Design
- Bootstrap UI Components
- Modern and User-Friendly Interface


- ## Technology Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Vite

### Backend

- Python
- Django
- Django REST Framework

### Database

- MySQL

### Tools & Technologies

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench
- Linux
- AWS

- ## Application Modules

Employee360 consists of the following major modules:

1. **Login** – User authentication and secure access
2. **Dashboard** – Overview of employees, departments, and tasks
3. **Employees** – Manage employee records
4. **Departments** – Manage organizational departments
5. **Tasks** – Create and manage employee tasks

## 1. Login Module

The Login module provides users with access to the Employee360 application.

### Features

- User login
- Authentication
- Login form validation
- Secure access to the application
- Navigation to the Dashboard after successful login

## 2. Dashboard Module

The Dashboard provides a central overview of the Employee360 application.

### Features

- Employee overview
- Department overview
- Task overview
- Summary cards
- Quick navigation to application modules
- Responsive dashboard layout
- User-friendly interface

The Dashboard acts as the central point for accessing the Employees, Departments, and Tasks modules.

## 3. Employees Module

The Employees module allows users to manage employee information efficiently.

### Employee Information

The system manages the following employee details:

- Employee ID
- Employee Name
- Email
- Phone Number
- Position
- Department
- Joining Date
- Salary

### Features

- View employee records
- Add new employees
- Edit employee information
- Delete employees
- Search employees
- Filter employee records
- Assign employees to departments
- Form validation
- REST API integration
- MySQL database integration

## 4. Departments Module

The Departments module allows users to organize and manage company departments.

### Features

- View department records
- Add new departments
- Edit department information
- Delete departments
- Assign employees to departments
- Manage department information
- Database relationship with employees
- REST API integration
- MySQL database integration

### Example Departments

- Development
- HR
- Finance

## 5. Tasks Module

The Tasks module allows users to create, assign, and manage tasks for employees.

### Features

- View task records
- Add new tasks
- Edit existing tasks
- Delete tasks
- Assign tasks to employees
- Set task dates
- Manage task status
- Track assigned tasks
- Form validation
- REST API integration
- MySQL database integration

### Task Information

The system manages task details such as:

- Task title
- Task description
- Assigned employee
- Task date
- Task status
- Additional task details

## CRUD Operations

Employee360 implements CRUD (Create, Read, Update, Delete) operations for managing application data.

| Operation | Description |
|---|---|
| Create | Add new employees, departments, and tasks |
| Read | View employee, department, and task records |
| Update | Edit existing records |
| Delete | Remove records when required |

These operations are connected to the Django REST APIs and MySQL database.

## Application Architecture

Employee360 follows a full-stack application architecture where the React.js frontend communicates with the Django backend through REST APIs.

 ``text
React.js Frontend
       ↓
Django REST API
       ↓
Django Backend
       ↓
MySQL Database

## Database

Employee360 uses **MySQL** as its relational database.

### Database Management

The application uses the database to store and manage:

- Employee information
- Department information
- Task information
- User authentication data

### Database Relationships

The system uses relationships between different entities to maintain organized and consistent data.

For example:

- Employees are associated with Departments.
- Tasks can be assigned to Employees.
- Related records are managed through database relationships and foreign keys.

Django models and the Django ORM are used to interact with the MySQL database.

## Project Structure

```text
Employee360/
│
├── backend/
│   ├── manage.py
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── requirements.txt
└── .gitignore
```

> **Note:** The structure above represents the general organization of the Employee360 full-stack application. The exact files and folders may vary depending on the final project implementation.
>
> ## Screenshots

### Login Page

The Login page provides users with authentication access to the Employee360 application.

### Dashboard

The Dashboard provides an overview of employees, departments, and tasks.

### Employees

The Employees module allows users to view, search, add, edit, and delete employee records.

### Add Employee

The Add Employee page allows users to enter and save employee information.

### Departments

The Departments module allows users to manage company departments.

### Tasks

The Tasks module allows users to create, assign, edit, and manage employee tasks.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Employee360
```

### 2. Backend Setup

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 3. Database Setup

Create a MySQL database and configure the database credentials in the Django backend settings.

Run Django migrations:

```bash
python manage.py migrate
```

### 4. Start the Backend Server

```bash
python manage.py runserver
```

The Django backend will start locally.

### 5. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the required Node.js packages:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The Employee360 frontend will then be available through the local Vite development URL.

## Future Improvements

The following features can be added to further improve Employee360:

- Role-based access control
- Advanced employee filtering
- Employee profile pages
- Task priority management
- Advanced task status tracking
- Email notifications
- Attendance management
- Employee performance tracking
- Cloud deployment
- CI/CD pipeline using Jenkins
- AWS infrastructure integration

## Developer

**Chethan G N**

BSc Graduate | Python Full Stack Developer

### Technical Skills

- Python
- Django
- Django REST Framework
- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- MySQL
- Linux
- AWS
- Git & GitHub


