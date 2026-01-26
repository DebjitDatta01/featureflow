# FeatureFlow 🚀

**FeatureFlow** is a robust, distributed **Feature Flag Management System** designed to decouple feature deployment from code releases. It empowers developers to toggle features on/off in real-time, perform canary releases, and manage technical debt without redeploying applications.

Built with a **Microservices Architecture** using **Java 21** and **Spring Boot 3**, FeatureFlow prioritizes security, scalability, and developer experience. It features a secure, stateless authentication system using **JWT**, ensuring strict data isolation where users can only manage their own feature flags.

### 🌟 Key Features
*   **Real-time Toggling**: Switch features on/off instantly across your entire stack.
*   **Microservices Design**: Modular architecture separating Identity Management (User Service) from Core Logic (Feature Service).
*   **Secure by Design**: Implements **Role-Based Access Control (RBAC)** and **JWT Authentication** to secure API endpoints.
*   **Data Isolation**: Multi-tenant style architecture ensuring users only access their own data.
*   **Modern Dashboard**: A responsive React + Vite frontend with Dark/Light mode support for easy management.
*   **RESTful API**: Fully documented APIs allowing easy integration into other applications or SDKs.

---

## 💻 Tech Stack

This project leverages the latest industry-standard technologies to ensure performance, security, and maintainability:

### Backend
*   **Language**: Java 21 (LTS)
*   **Framework**: Spring Boot 3.2.x
*   **Security**: Spring Security 6 (Stateless JWT Authentication)
*   **Database**: PostgreSQL 16
*   **ORM**: Hibernate / Spring Data JPA
*   **Build Tool**: Maven (Multi-Module Monorepo)
*   **Validation**: Jakarta Validation (Hibernate Validator)

### Frontend
*   **Framework**: React 18
*   **Build Tool**: Vite
*   **Styling**: CSS Modules with Dark/Light Theme support
*   **HTTP Client**: Axios
*   **Development**: Leveraged AI-assisted development tools to accelerate UI prototyping and implementation, demonstrating proficiency in integrating modern workflows.

---

## 🏗️ Architecture

FeatureFlow is built as a **Microservices Monorepo** consisting of three main components:

1.  **User Service (Port 8081)**:
    *   Handles User Registration and Login.
    *   Issues **JWT Tokens** containing user identity (`userId`, `firstName`).
    *   Tech Stack: Spring Boot, Spring Security, PostgreSQL, JJWT.

2.  **Feature Flag Service (Port 8080)**:
    *   The core engine that manages feature flags.
    *   **Secured**: Validates JWT tokens to ensure users can only modify their *own* flags.
    *   Tech Stack: Spring Boot, Spring Data JPA, PostgreSQL.

3.  **Frontend (Port 3000)**:
    *   A modern React + Vite dashboard.
    *   Allows users to Sign Up, Login, Create, Edit, and Delete flags.
    *   Supports **Dark/Light Mode**.

---

## 🎯 Where to use this?

*   **Canary Releases**: Roll out a new feature to a small percentage of users (or just yourself) before a full launch.
*   **Kill Switch**: Instantly disable a buggy feature in production without rolling back code.
*   **A/B Testing**: Enable different features for different user segments (future roadmap).
*   **Trunk-Based Development**: Merge code to `main` daily but keep unfinished features hidden behind a flag.

---

## 🛠️ How to Setup Locally

### Prerequisites
*   **Java 21** (JDK)
*   **Maven**
*   **Node.js** (v18+) & **npm**
*   **PostgreSQL**

### Step 1: Database Setup
1.  Open **pgAdmin** or your terminal.
2.  Create two databases:
    ```sql
    CREATE DATABASE featureflow_users;
    CREATE DATABASE feature_flag;
    ```
3.  Update the `application.properties` files if your Postgres password is not `password`:
    *   `user-service/src/main/resources/application.properties`
    *   `feature-flag-service/src/main/resources/application.properties`

### Step 2: Build the Backend
Open a terminal in the project root (`featureflow/`) and run:
```bash
mvn clean install
```
This will build both microservices.

### Step 3: Run the Services
You need to run these in separate terminals (or use your IDE's Run Dashboard):

1.  **Start User Service**:
    ```bash
    cd user-service
    mvn spring-boot:run
    ```
    *Runs on: http://localhost:8081*

2.  **Start Feature Flag Service**:
    ```bash
    cd feature-flag-service
    mvn spring-boot:run
    ```
    *Runs on: http://localhost:8080*

### Step 4: Run the Frontend
1.  Open a new terminal.
2.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the dev server:
    ```bash
    npm run dev
    ```
    *Runs on: http://localhost:3000*

---

## 🚀 How to Use

1.  Open **http://localhost:3000** in your browser.
2.  Click **Sign Up** to create a new account.
3.  **Login** with your credentials.
4.  **Dashboard**:
    *   **Create**: Enter a flag name (e.g., `dark_mode`) and click Create.
    *   **Toggle**: Switch the flag ON/OFF directly from the list.
    *   **Edit**: Click "Edit" to rename a flag or change its value.
    *   **Delete**: Go to the Edit page, type "delete" in the Danger Zone to remove a flag.

---

## 🔌 API Reference (For Developers)

If you want to use FeatureFlow in your own applications (e.g., an SDK), use these endpoints:

### 1. Authentication
*   **POST** `http://localhost:8081/api/v1/auth/register`
    *   Body: `{ "firstname": "John", "lastname": "Doe", "email": "john@example.com", "password": "123" }`
*   **POST** `http://localhost:8081/api/v1/auth/authenticate`
    *   Body: `{ "email": "john@example.com", "password": "123" }`
    *   **Returns**: `{ "token": "eyJhbGci..." }`

### 2. Feature Flags
**Headers Required**: `Authorization: Bearer <YOUR_JWT_TOKEN>`

*   **GET** `http://localhost:8080/api/feature-flags`
    *   Returns all flags for the logged-in user.
*   **GET** `http://localhost:8080/api/feature-flags/{id}/value`
    *   Returns `true` or `false`.
*   **POST** `http://localhost:8080/api/feature-flags`
    *   Body: `{ "name": "new-feature", "value": false }`

---

## 🔮 Areas to Improve / Roadmap

We are constantly working to make FeatureFlow better. Here are some key areas we plan to tackle next:

1.  **📦 Client SDKs**:
    *   Create a **Java SDK** (Maven library) so developers can simply add `featureflow-client` to their `pom.xml` and use annotations like `@FeatureFlag("dark_mode")`.
    *   Create a **JavaScript/React SDK** for easier frontend integration.

2.  **⚡ Caching & Performance**:
    *   Implement **Redis** caching to reduce database hits when checking flag values frequently.
    *   Add **Server-Sent Events (SSE)** to push flag updates to clients instantly without polling.

3.  **👥 Team Management**:
    *   Allow multiple users to belong to an "Organization" or "Project" so they can share flags.
    *   Add "Admin" and "Viewer" roles.

4.  **📊 Analytics**:
    *   Track how many times a flag is evaluated.
    *   Show usage graphs in the dashboard.

5.  **🧪 A/B Testing**:
    *   Allow percentage-based rollouts (e.g., "Enable for 20% of users").

---

## 🤝 Contributing
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.
