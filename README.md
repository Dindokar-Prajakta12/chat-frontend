Full-Stack LLM Chat Platform

A complete LLM-powered chat application with authentication, organization management, credit-based usage, and real-time notifications — built using MERN + Socket.IO stack.

🚀 Tech Stack

Frontend:

React.js (Vite)

Tailwind CSS / Material-UI

Axios

Socket.IO Client

Backend:

Node.js + Express.js

MongoDB

Socket.IO

GROQAI API (LLM integration)

Deployment:

Frontend → Vercel

Backend → Render

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/Dindokar-Prajakta12/chat-frontend.git
cd frontend

2. Backend Setup
 git clone  https://github.com/Dindokar-Prajakta12/chat-backend.git
cd backend
npm install


Create a .env file inside /backend:


PORT=5000
MONGO_URI=mongodb+srv://dindokarprajakta28_db_user:XSq2VUkuJ5KXGQee@chatbotdb.fwsbysr.mongodb.net/chatbotdb?retryWrites=true&w=majority&appName=chatbotdb
# JWT secret key
JWT_SECRET=eda5baa39303ec86101763583307cc1812db348ec291b5f9d1003c16b8cc2d3e5a55a6755bb50c0c786f7b5b96ef8313cd7adc3e357e5618fe6ce075c155c57a
GROQ_API_KEY=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


Run the backend:

npm run dev

3. Frontend Setup
cd ../frontend
npm install


Create a .env file inside /frontend:

VITE_API_URL=http://localhost:5000


Run the frontend:

npm run dev

💡 Features
🔐 Authentication & Onboarding

Username/password and Google OAuth sign-in.

Auto-creates default organization on registration.

JWT-based authentication.

💬 Chat Interface

ChatGPT-style UI (Sidebar + Chat area + Top bar).

Persistent chat history stored in database.

Dynamic credit deduction per LLM usage.

🏢 Organization Management

Create and rename organizations.

Invite members by email (record only).

Switch between multiple organizations.

⚡ Real-Time Notifications

Socket.IO-based notification system.

Supports global and user-specific alerts.

Persistent notification history.

🧩 Deployment
Service	Link
🌐 Frontend	Live Demo   https://chat-frontend-zmu9.vercel.app/  

⚙️ Backend API	Render API   https://chat-backend-1-twvb.onrender.com/ 
