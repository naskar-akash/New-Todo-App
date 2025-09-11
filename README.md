# TodoAppNew

A full-stack Todo application built with React (frontend) and Node.js/Express/MongoDB (backend).  
Users can register, log in, manage todos, and update their profile including profile pictures.

---

## Features

- User registration and login (with secure authentication)
- Add, edit, delete, and filter todos
- Responsive and modern UI with Tailwind CSS
- Profile page with profile picture upload (using Multer)
- Persistent authentication using HTTP-only cookies
- RESTful API backend with MongoDB
- Error and status message handling across pages

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in the `server` folder:
     ```
     NODE_ENV=development
     MONGO_URI=your_mongodb_connection_string
     FRONTEND_URI=your_frontend_url
     JWT_SECRET=your_jwt_secret
     PORT=3000
     ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend runs on `http://localhost:3000` by default.

---

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Configure environment variables:**
   - Edit `.env` in the `client` folder:
     ```
     VITE_SERVER_URI=http://localhost:3000
     ```

3. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

---

## Usage

- Register a new user and log in.
- Add, edit, and delete todos.
- Click your profile to view and update your profile picture.
- All actions show status messages for feedback.

---

## Folder Structure

```
TodoAppNew/
├── client/         # React frontend
│   ├── src/
│   │   ├── Components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
├── server/         # Node.js/Express backend
│   ├── models/
│   ├── routes/
│   ├── config/
│   │   └── multer-config.js
│   ├── utils/
│   ├── server.js
│   └── .env
└── README.md
```

---

## API Endpoints

- `POST /user/register` — Register new user
- `POST /user/login` — Login user
- `POST /user/logout` — Logout user
- `GET /user/me` — Get current user profile
- `POST /user/profile-picture` — Upload profile picture
- `DELETE /user/profile-picture` — Remove profile picture
- `GET /todos/` — Get all todos
- `POST /todos/` — Add todo
- `PUT /todos/:id` — Update todo
- `DELETE /todos/:id` — Delete todo

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer, JWT

---

## Author

Made by Akash Naskar
