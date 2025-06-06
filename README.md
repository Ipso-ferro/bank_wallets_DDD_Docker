## Running the Project with Docker

This project is containerized using Docker and Docker Compose for easy setup and consistent environments.

### Requirements
- **Docker** and **Docker Compose** installed on your system.
- The project uses **Node.js v22.13.1** (as specified in the Dockerfile).
- MySQL database is included as a service in the Docker Compose setup.

### Environment Variables
- The MySQL service uses the following environment variables (set in `docker-compose.yml`):
  - `MYSQL_ROOT_PASSWORD`: Root password for MySQL (default: `example_root_password` — change for production!)
  - `MYSQL_DATABASE`: Database name (default: `app_db`)
  - `MYSQL_USER`: Database user (default: `app_user`)
  - `MYSQL_PASSWORD`: Database user password (default: `app_password`)
- The application can use a `.env` file for additional configuration. Uncomment the `env_file` line in `docker-compose.yml` if you have a `.env` file.

### Build and Run Instructions
1. **Clone the repository** and navigate to the project root.
2. **(Optional)**: Create a `.env` file in the project root if your application requires custom environment variables.
3. **Build and start the services:**
   ```sh
   docker-compose up --build
   ```
   This will build the Node.js application and start both the app and MySQL containers.

### Ports
- **Node.js app**: Exposed on port **8084** (host: 8084 → container: 8084)
- **MySQL**: Exposed on port **3306** (host: 3306 → container: 3306)

### Special Configuration
- The application is built and run as a non-root user for security.
- MySQL data is persisted using a Docker volume (`mysql-data`).
- The Node.js app is built from TypeScript sources and runs in production mode.
- The `depends_on` directive ensures the app waits for MySQL to be available.

---

**Note:** For production deployments, make sure to change all default passwords and review your `.env` and Docker Compose configuration for security best practices.
