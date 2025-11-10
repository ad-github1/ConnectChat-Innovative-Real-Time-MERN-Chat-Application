

# ConnectChat | Real-Time MERN Chat Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/) [![React](https://img.shields.io/badge/React-v18+-blue)](https://reactjs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-v6+-brightgreen)](https://www.mongodb.com/)

**ConnectChat** is a modern, real-time chat application built with the **MERN stack**, designed for **fast, secure messaging**. It uses **Socket.IO** for instant communication, **JWT** for authentication, and **Zustand** for global state management. Built with **TailwindCSS** & **DaisyUI**, ConnectChat delivers a sleek, responsive UI on all devices.

[GitHub Repository](https://github.com/ad-github1/ConnectChat-Innovative-Real-Time-MERN-Chat-Application)



##  Features

* **Real-time messaging**: Chat instantly using Socket.IO.
* **JWT authentication**: Secure login and session management.
* **Online status tracking**: See which users are online.
* **Global state management**: Smooth performance with Zustand.
* **Responsive UI**: Modern, scalable design with TailwindCSS & DaisyUI.

---

##  Tech Stack

| Layer      | Technologies                              |
| ---------- | ----------------------------------------- |
| Frontend   | React, TailwindCSS, DaisyUI, Zustand      |
| Backend    | Node.js, Express.js, MongoDB, Mongoose    |
| Real-Time  | Socket.IO                                 |
| Auth       | JWT (JSON Web Tokens)                     |
| Deployment | Production-ready via Express static build |

---

##  Project Structure

```
ConnectChat/
│
├── backend/                 # Express backend with MongoDB
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── server.js            # Express server + Socket.IO
│
├── frontend/                # React frontend
│   ├── src/                 # Components, pages, Zustand store
│   ├── build/               # Production build (after `npm run build`)
│
├── .env.example             # Template for environment variables
└── README.md
```

---

##  Setup Instructions

> ⚠️ App under development; ready for local testing.

### Prerequisites

* Node.js v18+
* npm or yarn
* MongoDB instance (local or cloud)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with MONGO_URI and FRONTEND_URL
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run build
```

### Running Locally

1. Start backend: `node server.js` in `/backend`.
2. Serve React frontend via Express (already configured).
3. Open `http://localhost:5001` to access ConnectChat.

---

## Future Enhancements

* Fully functional JWT refresh & auth flows.
* Multiple chat rooms & private messaging.
* Deployment to Render/Heroku/Vercel.
* UI animations, notifications, and themes.

---

##  Contribution

Contributions are welcome!

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/your-feature`)
5. Open a Pull Request




