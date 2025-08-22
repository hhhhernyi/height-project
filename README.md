# My Family's Height Tracker Dashboard

### 📊 Project Overview

This is a personal, full-stack application designed to track and visualize the height trends of my family members over time. It serves as a dashboard where family members can easily input new height data, and the application will display the results on an interactive chart.

This project is built as a learning exercise to practice full-stack development with a modern tech stack.

### ✨ Features

* **Interactive Dashboard:** View height trends for up to four children with clear, color-coded line charts.
* **Data Visualization:** Switch between "Height vs. Age" and "Height vs. Date" views to analyze trends from different perspectives.
* **Secure Data Entry:** A simple form allows family members to submit new height data, protected by a password to ensure data integrity.
* **Average Calculation:** The application automatically calculates and stores the average height for a child if multiple entries are submitted on the same day.
* **Monorepo Structure:** The project is organized into a single repository for simplified management of both the frontend and backend.

### 🛠️ Technologies Used

This project is a monorepo containing a frontend and a backend application.

#### Frontend

* **React:** A JavaScript library for building the user interface.
* **TypeScript:** A typed superset of JavaScript that improves code quality and maintainability.
* **Recharts:** A charting library for creating the data visualizations.

#### Backend

* **Spring Boot:** A Java framework used to build the RESTful API.
* **Java:** The core programming language for the backend.
* **Spring Data JPA:** For simplified database interactions.
* **Lombok:** To reduce boilerplate Java code.

#### Database & Hosting

* **Supabase:** A hosted, managed PostgreSQL database that provides a powerful SQL backend without the setup headaches.
* **Git:** For version control.
* **GitHub:** For code hosting.

### 🚀 Getting Started

To get a local copy of the project up and running, follow these steps.

#### Prerequisites

* **Java Development Kit (JDK):** Version 17 or higher.
* **Node.js:** Version 18 or higher.
* **Git:** For cloning the repository.
* **An IDE:** (e.g., IntelliJ IDEA for the backend, VS Code for the frontend).
* **Supabase Account:** You will need your own free Supabase account.

#### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name/backend
    ```
2.  **Configure the database:**
    * Create a `.env` file in the `backend` directory (or use `application.properties`).
    * Add your Supabase database connection string and credentials.
    ```properties
    spring.datasource.url=jdbc:postgresql://<your-supabase-host>:<your-supabase-port>/<your-database-name>
    spring.datasource.username=<your-supabase-username>
    spring.datasource.password=<your-supabase-password>
    ```
3.  **Run the application:**
    ```bash
    ./mvnw spring-boot:run
    ```
    (Note: `./mvnw` is the Maven Wrapper, which you should use to ensure consistent builds.)

#### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm start
    ```
    The frontend should now be running at `http://localhost:3000`.

### 📝 Project Status

This project is currently under development. The core features are planned for completion over four weekends.

### 🤝 Contributing

This is a personal project, but feel free to fork the repository to experiment or adapt it for your own needs.

### 📄 License

This project is licensed under the [MIT License](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt).

---