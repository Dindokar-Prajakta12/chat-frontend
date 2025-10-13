
// import { PanelLeftClose } from "lucide-react"; // icon for closing sidebar

// const Sidebar = ({ conversations, onClose }) => {
//   return (
//     <div className="bg-gray-100 w-64 h-full p-4 overflow-y-auto border-r relative">
//       {/* Close Button */}
//       <h1>Conversation</h1>
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         title="Hide sidebar"
//       >
//         <PanelLeftClose className="w-5 h-5" />
//       </button>

//       <button className="w-full mt-8 mb-4 py-2 bg-blue-600 text-black rounded-md font-medium">
//         + New Chat
//       </button>

//       <div className="space-y-2">
//         {conversations.map((conv, index) => (
//           <div
//             key={index}
//             className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
//           >
//             {conv.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




// import { useEffect, useState } from "react";
// import { PanelLeftClose } from "lucide-react";
// import axios from "axios";

// const Sidebar = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:5000/api/chat/history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };

//     fetchChatHistory();
//   }, []);

//   // Optionally group messages into chat sessions by date or chunk
//   // For now, we’ll just show the user’s messages as "history list"
//   const userMessages = messages
//     .filter((msg) => msg.role === "user")
//     .slice(-10) // only last 10 messages
//     .reverse(); // show latest first

//   return (
//     <div className="bg-gray-100 w-64 h-full p-4 overflow-y-auto border-r relative">
//       <h1 className="text-lg font-semibold mb-4">Conversation History</h1>

//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         title="Hide sidebar"
//       >
//         <PanelLeftClose className="w-5 h-5" />
//       </button>

//       <button className="w-full mt-8 mb-4 py-2 bg-blue-600 text-white rounded-md font-medium">
//         + New Chat
//       </button>

//       <div className="space-y-2">
//         {userMessages.map((msg) => (
//           <div
//             key={msg.id}
//             className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
//           >
//             {msg.content.length > 40 ? msg.content.slice(0, 40) + "..." : msg.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import { useEffect, useState } from "react";
import { PanelLeftClose } from "lucide-react";
import axios from "axios";

// const Sidebar = ({ onSelectConversation, onClose }) => {
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/chat/conversations", {
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
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//       >
//         <PanelLeftClose className="w-5 h-5" />
//       </button>

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
//             onClick={() => onSelectConversation(conv.id)}
//             className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
//           >
//             {conv.title.length > 30 ? conv.title.slice(0, 30) + "..." : conv.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


const Sidebar = ({ onSelectConversation, onClose }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/chat/conversations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
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
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)} // ✅ this should trigger fetch
            className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
          >
            {conv.title.length > 30 ? conv.title.slice(0, 30) + "..." : conv.title}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Sidebar;
