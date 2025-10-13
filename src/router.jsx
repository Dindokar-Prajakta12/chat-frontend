// // src/router.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ChatDashboard from './pages/ChatDashboard';

// const AppRouter = () => {
//   const isAuthenticated = !!localStorage.getItem('token'); // Replace with real auth check

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <ChatDashboard /> : <Navigate to="/login" />} />
//                 {/* <Route path="/" element={<ChatDashboard /> } /> */}

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;


// src/router.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // 👈 import the context
import Login from "./pages/Login";
import Register from "./pages/Register";
// import ChatPage from "./components/ChatPage";  
import ChatPage from "./pages/ChatPage";  // 👈 updated import

import ChatDashboard from "./pages/ChatDashboard";

const AppRouter = () => {
  const { token } = useContext(AuthContext); // 👈 use token from context
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <ChatDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    <Route path="/chat" element={<ChatPage />} />  {/* 👈 use it here */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;