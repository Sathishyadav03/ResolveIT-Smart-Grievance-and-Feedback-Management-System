# ResolveIT – Intelligent Grievance Handling Platform

ResolveIT is a full-stack web application designed to simplify how organizations manage complaints. It provides a structured system where users can raise issues, staff can process them efficiently, and administrators can monitor overall performance — all in one place.

The platform focuses on transparency, accountability, and faster resolution through role-based access, real-time updates, and performance tracking.

---

## 🌐 Overview

Managing complaints manually can lead to delays, confusion, and lack of accountability. ResolveIT solves this by offering a centralized system that tracks every complaint from submission to closure.

It ensures:

* Clear ownership of tasks
* Transparent status tracking
* Timely resolution through SLA monitoring
* Insightful analytics for better decision-making

---

## ✨ Core Features

### 👤 User Side

* Submit complaints with detailed descriptions
* Track progress of requests in real-time
* Receive notifications for every update
* Filter and search past complaints
* Provide ratings and feedback after resolution

### 👨‍💼 Staff Side

* View assigned complaints in a dedicated dashboard
* Update complaint status and progress
* Monitor deadlines and overdue tasks
* Access complete history of each complaint
* Review feedback given by users

### 🛠️ Admin Side

* Manage users and staff accounts
* Assign complaints to staff members
* Monitor all complaints across the system
* View analytics and performance reports
* Track resolution rates and workload distribution

---

## 🏗️ Technology Stack

* **Backend:** Java, Spring Boot
* **Security:** Spring Security
* **Database:** MySQL
* **ORM:** Hibernate (JPA)
* **Frontend:** HTML, CSS, JavaScript, Thymeleaf
* **Build Tool:** Maven
* **Version Control:** Git & GitHub

---

## 🔐 Access Control

The system follows role-based authentication:

* **User:** Can create and track complaints
* **Staff:** Handles and resolves assigned issues
* **Admin:** Full system control and monitoring

Each role is redirected to a dedicated dashboard after login.

---

## 🔄 Complaint Lifecycle

Every complaint passes through multiple stages:

* **New** → Initial submission
* **Under Review** → Being processed by staff
* **Resolved** → Successfully completed
* **Denied** → Rejected with reason

All updates are recorded with timestamps to maintain a complete audit trail.

---

## 📊 Key Functional Modules

### 📌 Complaint Management

Handles creation, assignment, and tracking of complaints.

### 📌 Dashboard System

Displays real-time statistics based on user roles.

### 📌 Notification System

Sends updates via email and in-app alerts.

### 📌 Feedback Module

Allows users to rate services and provide comments.

### 📌 SLA Monitoring

Tracks resolution time and highlights delays.

---

## 🗄️ Database Design

The system uses relational tables such as:

* Users (stores account details and roles)
* Complaints (stores issue details and status)
* Complaint History (tracks status changes over time)
* Feedback (stores ratings and comments)

---

## 🚀 Getting Started

### Prerequisites

* Java 17+
* Maven
* MySQL
* Git

### Steps to Run

1. Clone the repository
2. Create a MySQL database
3. Update database credentials in application properties
4. Build the project using Maven
5. Run the application

Access the system at:
👉 http://localhost:8080

---

## ⚙️ Configuration

Make sure to configure:

* Database connection
* Server port
* Email settings (optional for notifications)

---

## 🔒 Security Features

* Password encryption using BCrypt
* Role-based authorization
* CSRF protection enabled
* Secure session-based authentication

---

## ⚠️ Known Issues & Tips

* Always use separate sessions for testing different roles
* Ensure database is properly connected before running
* Verify role-based redirects after login

---

## 🚀 Future Improvements

* Real-time updates using WebSockets
* Mobile-friendly responsive design
* AI-based complaint categorization
* Chat system between users and staff
* REST API for mobile integration
* Multi-language support

---

## 👨‍💻 Author

**Sathish Yadav**
