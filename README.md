# SvaraAI Backend

This is the backend for the SvaraAI Task & Project Management System.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Features

1. User authentication (signup/login/logout) using JWT
2. Project management (create, list, delete)
3. Task management (create, edit, delete, fetch by project)
4. Filtering by status, priority, deadline range
5. Pagination for tasks

## Project Structure

```
src/
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── task.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── User.model.js
│   ├── Project.model.js
│   └── Task.model.js
├── routes/
│   ├── auth.routes.js
│   ├── project.routes.js
│   └── task.routes.js
├── utils/
│   ├── asyncHandler.js
│   └── seeder.js
├── config/
│   └── db.js
└── index.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Projects
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get tasks with filters and pagination
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file based on `.env.example`
4. Run `npm run dev` to start the development server

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - JWT expiration time

## Data Seeding

To seed the database with initial data:
```
npm run seed
```

To destroy all data:
```
npm run destroy
```

## Testing with Postman

This repository includes Postman collection and environment files for testing the API:

1. Import `SvaraAI_API.postman_collection.json` into Postman
2. Import `SvaraAI_API.postman_environment.json` into Postman
3. Update the environment variables as needed:
   - `base_url`: Your API base URL (default: http://localhost:3000)
   - `token`: JWT token obtained after login
   - `project_id`: ID of a project (obtained from project creation)
   - `task_id`: ID of a task (obtained from task creation)

### Testing Steps

1. Register a new user or login with existing credentials
2. Copy the JWT token from the response
3. Set the `token` variable in the Postman environment
4. Create a new project
5. Copy the project ID from the response
6. Set the `project_id` variable in the Postman environment
7. Create tasks for the project
8. Test filtering and pagination features

### Enhanced Postman Collection

The Postman collection includes automated tests and scripts that:
- Validate response status codes
- Check for required response fields
- Automatically save tokens and IDs to environment variables
- Make API testing more efficient and less error-prone

Each request in the collection has test scripts that verify:
- Correct status codes
- Presence of required fields in responses
- Automatic environment variable updates for tokens and IDs