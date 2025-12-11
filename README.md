
# TrackScholar — Role-Based School Management System

TrackScholar is a lightweight system for managing schools with **Admin, Teacher, and Student roles**. Admin can manage classrooms, students, teachers, subjects, and relationships. Teachers can take attendance and add marks. Students can view their attendance and marks.

---

## Features

* **Admin**

  * Manage classrooms, students, teachers, and subjects
  * Assign teachers to classrooms and subjects
  * Enroll students in classrooms
  * Full CRUD access to all entities

* **Teacher**

  * View assigned classroom roster
  * Take attendance for students
  * Add and manage student marks

* **Student**

  * View own attendance
  * View own marks

* **Role-Based Access Control**

  * Admin, Teacher, and Student have different permissions

---

## Technologies

* Java 17+, Spring Boot
* Spring Security with JWT authentication
* Spring Data JPA for database operations
* H2 database (for development) or PostgreSQL
* Lombok for boilerplate code reduction
* Maven for dependency management

---

## Project Structure

```
src/main/java/com/trackscholar
├── config         // Security and application configuration
├── controller     // Handles HTTP requests per role
├── model          // Entity definitions for User, Classroom, Subject, etc.
├── repository     // JPA repositories for database access
├── service        // Business logic for Admin, Teacher, and Student
└── util           // Utility classes (e.g., JWT handling)
```

---

## Roles & Permissions

| Role    | Permissions                                                                              |
| ------- | ---------------------------------------------------------------------------------------- |
| ADMIN   | Full access to all data and management of users, classrooms, subjects, and relationships |
| TEACHER | Access only to assigned classrooms; can take attendance and add student marks            |
| STUDENT | Read-only access to own attendance and marks                                             |

---

## User Stories

* As an **Admin**, I can create classrooms, add students and teachers, assign subjects, and manage relationships.
* As a **Teacher**, I can view my class roster, take attendance, and add or update marks for students.
* As a **Student**, I can view my marks and attendance records.

---

## Setup Instructions

1. Clone the repository.
2. Configure the database in `application.properties`.
3. Run the application using Maven or your IDE.
4. Seed an initial admin user for login.
5. Use the application according to roles.

---

## Next Steps

* Build a frontend dashboard for Admin, Teacher, and Student.
* Add reporting features like attendance and marks summary.
* Implement notifications for student performance or absence.
* Add pagination and filters for large data sets.

---
