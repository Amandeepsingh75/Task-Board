# real-time collaborative kanban board a kanban-style task board

constructed with next.js and socket.io enabling real-time collaboration — create, delete, and drag-and-drop tasks between columns with live synchronizing across users.

---

## Features

- Create tasks with title and optional description
- Delete tasks from any column
- Drag & drop tasks between **Todo**, **In Progress**, and **Done** columns
- Real-time synchronized of board state across multiple clients using Socket.IO
- Optimistic UI updates for seamless user experience

---

## Tech Stack

- **Frontend:** Next.js, React Hooks, TypeScript, Tailwind CSS
- **Backend:** Node.js, Socket.IO (WebSocket-based real-time communication)
- **State Management:** React `useState` + socket events
- **Drag & Drop:** Native HTML5 Drag & Drop API

---

## 🚀 Getting Started

after cloned this repository, followed these steps to run the app locally:

### 1. Start the Frontend (Next.js Kanban Board)

```bash
cd kanban-board
npm install
npm run dev
  #For Starting Backend 
cd kanban-socket-server
npm install
node server.js
