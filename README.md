# ResolveIT – Smart Grievance Management System

ResolveIT is a full-stack web application designed to streamline complaint handling within organizations. It enables users to submit issues, staff to resolve them efficiently, and administrators to monitor, assign, and escalate complaints through a structured workflow.

The system emphasizes transparency, real-time tracking, and efficient resolution with role-based dashboards and analytics.

---

## 🌐 Overview

ResolveIT replaces manual complaint handling with a centralized digital system. It ensures that every complaint is tracked, assigned, and resolved systematically while maintaining complete visibility and accountability.

Key benefits:

* Clear ownership of complaints
* Real-time status tracking
* Priority-based handling using urgency levels
* Manual escalation for critical issues
* Data-driven insights through analytics

---

## ✨ Core Features

### 👤 User Features

* Submit complaints with category and detailed description
* Set urgency level (Low, Medium, High)
* Option to submit complaints anonymously
* Upload supporting files (images/documents)
* Track complaint status in real-time
* View complete activity timeline

---

### 👨‍💼 Staff Features

* View and manage assigned complaints
* Update complaint status (In Progress, Resolved, Escalated)
* Add updates/comments to complaint timeline
* Filter complaints by date, urgency, and status
* Monitor escalated complaints

---

### 🛠️ Admin Features

* Assign complaints to staff members
* Manually escalate complaints when required
* View all complaints with advanced filtering
* Monitor system-wide complaint statistics
* Download reports in CSV format
* Receive alerts for high-priority and escalated complaints

---

## 🏗️ Technology Stack

* **Backend:** Java, Spring Boot
* **Security:** Spring Security
* **Database:** MySQL
* **ORM:** Hibernate (JPA)
* **Frontend:** React.js, HTML, CSS
* **Build Tool:** Maven
* **Version Control:** Git & GitHub

---

## 🔐 Role-Based Access

* **User:** Submit and track complaints
* **Staff:** Manage assigned complaints
* **Admin:** Control, assign, and monitor entire system

Each role has a dedicated dashboard with specific functionalities.

---

## 🔄 Complaint Workflow

* **OPEN** → Complaint submitted
* **ASSIGNED** → Assigned to staff
* **IN_PROGRESS** → Under processing
* **RESOLVED** → Completed
* **ESCALATED** → Marked for urgent attention

---

## 🚨 Escalation System

* Admin can manually escalate complaints
* Escalated complaints are highlighted with priority
* Special tracking and alerts for escalated cases

---

## 📊 Key Modules

### 📌 Complaint Management

Handles complaint submission, assignment, and status updates

### 📌 Status Tracker

Visual progress indicator for complaint lifecycle

### 📌 Timeline System

Tracks all updates and actions on a complaint

### 📌 Analytics Dashboard

Displays statistics and charts for complaint data

### 📌 Report Generation

Export complaint data as CSV files

---

## 🗄️ Database Design

Includes core tables:

* Users
* Complaints
* Complaint History / Comments
* Feedback

---

## 🚀 Getting Started

### Prerequisites

* Java 17+
* Maven
* MySQL
* Node.js (for frontend)

### Steps

1. Clone the repository
2. Configure database in application.properties
3. Run backend (Spring Boot)
4. Run frontend (React)
5. Access at:
   👉 http://localhost:8080

---

## 🔒 Security Features

* Secure authentication using Spring Security
* Password encryption with BCrypt
* Role-based authorization
* Protected API endpoints

---

## ⚠️ Notes

* Escalation is manually triggered by admin
* Separate sessions recommended for testing roles

---

## 🚀 Future Enhancements

* Automatic SLA-based escalation
* Real-time updates using WebSockets
* Mobile-friendly UI
* AI-based complaint categorization

---

## 👨‍💻 Author

**Sathish Yadav**

---

## 📜 License

This project is licensed under the MIT License.
