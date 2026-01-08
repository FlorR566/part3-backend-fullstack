# Phonebook / Notes Backend – Full Stack Open (Part 3)

Live demo (notes backend):
[View project on Render](https://part3-backend-fullstack.onrender.com/)

Live demo (phonebook backend):
[View project on Render](https://part3-phonebook-backend-hle2.onrender.com/)

##

The `main` branch contains the backend exercises for [Notes](https://part3-backend-fullstack.onrender.com/) from **Part 3** of the **Full Stack Open** course by the University of Helsinki.  
The `3.9` branch contains the backend for the [Phonebook](https://part3-phonebook-backend-hle2.onrender.com/) exercise.  
Each exercise and development step is stored in a **separate Git branch**, allowing the evolution of the application to be followed incrementally.

The backend implements a **RESTful HTTP API** using **Node.js** and **Express**, and is designed to work together with the frontend developed in Part 2 of the course.

Depending on the branch, the application manages either notes or phonebook entries, gradually introducing concepts such as routing, middleware, error handling, environment variables, and database integration.

---

## Technologies

- Node.js
- Express
- JavaScript
- RESTful APIs

Later branches may also include:

- MongoDB
- Mongoose
- dotenv

---

## Running the application locally

You can run any version of the application locally by following these steps.

### Prerequisites

- Node.js (recommended major version: **22** or compatible)

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/FlorR566/part3-backend-fullstack
   ```

2. Navigate into the project directory:

   ```bash
   cd part3-backend-fullstack

   ```

3. Switch to the branch corresponding to the exercise you want to run:

   ```bash
   git switch part-3.1
   ```

Example:

```bash
git switch part3-1
```

4. Install dependencies:

   ```bash
   npm install
   ```

5. If the selected branch requires environment variables (for example, MongoDB integration), create a .env file in the project root:

   ```bash
   MONGODB_URI=your_database_connection_string
   PORT=3001
   ```

6. Start the application:

   ```bash
   npm run dev
   ```

### By default, the server runs on:

http://localhost:3001

### Branch-based workflow

Each branch represents a specific stage or exercise of the course.
Switching branches updates your working directory to reflect the code state of that exercise.

Because new dependencies are added as the course progresses, it is recommended to run:

```bash
npm install
```

after switching branches to ensure all required packages are installed.
