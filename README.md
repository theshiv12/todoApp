# TaskMaster - Task Management and Reminder Application

TaskMaster is a robust Node.js application designed for efficient task management, reminders for upcoming tasks, and streamlined task processing for a large number of users.

## Overview

TaskMaster simplifies task organization by allowing users to manage their tasks efficiently. It offers authentication for users, task addition, updating, and deletion functionalities, along with reminders for impending tasks using a job scheduler. The application employs a queue system to handle high-volume task completions and implements caching to enhance performance.

## Features

1. **Task Management**

2. **Job Scheduler**

3. **Queue**
 
4. **Caching**

## Technologies Used

- **Node.js**: Backend server environment.
-

## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for API endpoints.
- **MongoDB**: Database for task storage.
- **Bull**: For job scheduling and queue management.
- **Redis**: Caching implementation for performance enhancement.
- **JWT**: JSON Web Tokens for user authentication.
- **Joi**: Input validation library for request validation.
- **dotenv**: Environment variable management.

## Setup Instructions

Follow these steps to set up and run the TaskMaster application:
1. install Node js (v18)
2. install redis 
3. **Clone the repository:**
   ```bash
   git clone https://github.com/theshiv12/todoApp.git
4. Install dependencies using `npm install`.
5. Set up environment variables (Refer to `.env.example`).
6. Run the application using `npm start`.

## Postman Collection

You can find the Postman collection for this project [here](https://api.postman.com/collections/26905660-64ae95b9-eb10-4148-902e-cc2ff3c95ed0?access_key=PMAT-01HJC04WDNFZN49P6MY53T9SQH).

To import the collection into your Postman app:
1. Download the collection file from the provided link.
2. Open Postman.
3. Click on the "Import" button in the upper-left corner.
4. Choose the downloaded collection file to import it into Postman.

Refer to the documentation and videos provided in the `docs` directory for detailed setup instructions, API endpoints, and usage guidelines.
