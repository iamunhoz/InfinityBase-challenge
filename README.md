Here's a structured README draft based on the details you provided:

---

# **Disclonecord**

A real-time web chat application with authentication, using modern web technologies. This monorepo contains both the backend (Node API) and the frontend (Vite React app), as well as infrastructure setup for Docker, Apache2, and PostgreSQL.

## **Overview**

This project is a real-time chat platform that includes features such as user authentication, chatrooms, and direct messaging. It is built with the following stack:

- **API (Backend)**:

  - Node.js, Express, TypeScript, TypeORM, Socket.IO, PostgreSQL
  - Located in the `/api` folder

- **Frontend**:

  - Vite, React 18, TypeScript, react-router-dom, Axios, React Query, Socket.IO-client, Tailwind CSS, Chakra UI
  - Located in the `/front` folder

- **Infrastructure**:
  - PostgreSQL runs in Docker
  - Web server managed by Apache2
  - Infrastructure setup scripts and configurations are located in the `/infra` folder

### **Live Demo**

[Live demo of the chat application](https://enso.online/disclonecord)

---

## **Monorepo Structure**

```
.
├── api                # Backend (Node API)
│   ├── dist           # Compiled backend code
│   ├── src            # Source code for the API
│   ├── package.json   # Backend dependencies and scripts
│   └── tsconfig.json  # TypeScript config for API
├── front              # Frontend (Vite + React)
│   ├── dist           # Compiled frontend code
│   ├── src            # Source code for the frontend
│   ├── package.json   # Frontend dependencies and scripts
│   └── tsconfig.json  # TypeScript config for Frontend
├── infra              # Infrastructure configurations
│   ├── apache2configs # Apache2 server config files for deployment
│   ├── Dockerfile.postgres # PostgreSQL Dockerfile
│   ├── buildPostgresDB.sh  # Script to set up PostgreSQL
│   └── startPostgresDB.sh  # Script to start PostgreSQL
```

---

## **Installation**

### **Prerequisites**

- Node.js ^18
- Docker for running PostgreSQL.

### **Environment Variables**

- The API can run without an `.env` file, but it expects the following:
  - `JWT_SECRET`: The secret key for JWT token encryption.
  - `NODE_ENV`: Environment setting (development, production, etc.).

### **Apache2 Configuration**

There are example configuration files in the `/infra/apache2config` folder for setting up the Apache2 web server, including SSL and proxy setup.

### **Docker Setup**

- A basic PostgreSQL Dockerfile is provided in `Dockerfile.postgres` with development values for admin and password.
- You can initialize the PostgreSQL database using the provided scripts in `/infra`.

---

## **Running Locally**

### **Step 1: Start the Database**

Use the provided script in `/infra` to start the PostgreSQL database (after building it):

```bash
bash infra/startPostgresDB.sh
```

To avoid possible clashes, it uses port `54321` to connect to the database.

### **Step 2: Start the API**

From the root of the project, navigate to the `/api` folder and run:

```bash
pnpm run dev-api
```

### **Step 3: Start the Frontend**

Navigate to the `/front` folder and run:

```bash
pnpm run dev-front
```

Once everything is up and running, open your browser at [http://localhost:5173](http://localhost:5173).

---

## **Ports in staging and production**

- **API (REST Calls)**: Accessible on port `3000`
- **Socket.IO (WebSocket)**: Accessible on port `3001`
- **Apache2 Proxy**: Handles these ports and applies SSL:
  - Redirects `3000` to `4000`
  - Redirects `3001` to `4001`

---

## **API Endpoints**

### **Authentication**

- **POST** `/auth/login`: Logs in the user with email and password.
- **POST** `/auth/signup`: Registers a new user.

### **Chatroom Management**

- **POST** `/chatroom/create`: Creates a new chatroom.
- **POST** `/chatroom/enter`: Joins an existing chatroom.
- **POST** `/chatroom/leave`: Leaves a chatroom.

### **Messaging**

- **POST** `/chatroom/message`: Sends a message to a chatroom.
- **GET** `/chatroom/:chatroomId/messages`: Retrieves all messages from a specific chatroom.
- **DELETE** `/chatroom/:chatroomId/message/:messageId`: Deletes a specific message.

---

## **Database Configuration**

- The database settings (e.g., name, server, ports) are defined in the `api/ormconfig.ts` and `api/config.ts` files.
- PostgreSQL credentials and setup are handled via Docker.

---

## **TypeScript Configuration**

- The project uses **absolute imports** for cleaner code organization.
- Both the API and frontend are compiled into their respective `/dist` folders for production builds.

---

## **Contribution Guidelines**

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## **License**

[MIT License](LICENSE)
