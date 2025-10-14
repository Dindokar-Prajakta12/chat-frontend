

// const Sidebar = ({ onSelectConversation, onClose }) => {
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("https://chat-backend-1-twvb.onrender.com/api/chat/conversations", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setConversations(res.data);
//       } catch (err) {
//         console.error("Error fetching conversations:", err);
//       }
//     };

//     fetchConversations();
//   }, []);

//   return (
//     <div className="bg-gray-100 w-64 h-full p-4 overflow-y-auto border-r relative">
//       <h1 className="text-lg font-semibold mb-4">Conversations</h1>

//       <button
//         onClick={() => onSelectConversation(null)}
//         className="w-full mt-8 mb-4 py-2 bg-blue-600 text-white rounded-md font-medium"
//       >
//         + New Chat
//       </button>

//       <div className="space-y-2">
//         {conversations.map((conv) => (
//           <div
//             key={conv.id}
//             onClick={() => onSelectConversation(conv.id)} // ✅ this should trigger fetch
//             className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
//           >
//             {conv.title.length > 30 ? conv.title.slice(0, 30) + "..." : conv.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default Sidebar;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = ({ onSelectConversation, onClose }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await axios.get(
          "https://chat-backend-1-twvb.onrender.com/api/chat/conversations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err.response?.data || err.message);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="bg-gray-100 w-64 h-full p-4 overflow-y-auto border-r relative">
      <h1 className="text-lg font-semibold mb-4">Conversations</h1>

      <button
        onClick={() => onSelectConversation(null)}
        className="w-full mt-8 mb-4 py-2 bg-blue-600 text-white rounded-md font-medium"
      >
        + New Chat
      </button>

      <div className="space-y-2">
        {conversations.length === 0 ? (
          <p className="text-gray-500 text-sm">No conversations yet</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv._id || conv.id}
              onClick={() => onSelectConversation(conv._id || conv.id)}
              className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
            >
              {conv.title?.length > 30 ? conv.title.slice(0, 30) + "..." : conv.title || "Untitled"}
            </div>
          ))
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Sidebar;
