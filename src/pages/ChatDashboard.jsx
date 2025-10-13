
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import ChatMessage from "../components/ChatMessage";
// import { useState } from "react";
// import { Sparkles, PanelLeft } from "lucide-react"; // 👈 added PanelLeft icon (you can change it)

// const ChatDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true); // 👈 sidebar toggle state

//   const [conversations] = useState([
//     { title: "React Hooks Guide" },
//     { title: "Python Chatbot" },
//     { title: "Travel Recommendation" },
//   ]);

//   const suggestions = [
//     "Explain quantum computing in simple terms",
//     "Write a Python function to sort a list",
//     "What are the benefits of meditation?",
//     "Help me plan a weekend trip to Paris",
//   ];

//   const handleSend = (text = input) => {
//     if (text.trim()) {
//       setMessages([...messages, { sender: "user", text }]);
//       setInput("");
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "assistant", text: "I'm here to help with that!" },
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col">
//       <Navbar credits={42} />
//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Sidebar */}
//         {sidebarOpen && (
//           <Sidebar conversations={conversations} onClose={() => setSidebarOpen(false)} />
//         )}

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col bg-gray-50 relative">
//           {/* 🧭 Toggle Sidebar Button */}
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="absolute top-4 left-4 z-20 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
//             >
//               <PanelLeft className="w-5 h-5 text-gray-600" />
//             </button>
//           )}

//           {/* Scrollable Chat Messages */}
//           <div className="flex-1 overflow-y-auto p-6 pb-32">
//             {messages.length === 0 ? (
//               <div className="h-full flex flex-col items-center justify-center text-center text-gray-700">
//                <div className="flex flex-col items-center justify-center mb-4">
//   <Sparkles className="w-8 h-8 text-blue-600 mb-2" />
//   <h1 className="text-2xl font-semibold">Welcome to AI Chat</h1>
// </div>
//                 <p className="text-gray-500 max-w-md mb-6">
//                   Start a conversation with our AI assistant. Ask questions, get
//                   help with tasks, or explore ideas together.
//                 </p>
//                 <div className="flex flex-col gap-3 w-full max-w-lg">
//                   {suggestions.map((s, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSend(s)}
//                       className="border border-gray-200 bg-white hover:bg-gray-100 transition px-4 py-3 rounded-md text-left shadow-sm"
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <ChatMessage key={index} sender={msg.sender} text={msg.text} />
//               ))
//             )}
//           </div>

//           {/* 🧊 Fixed Input */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSend();
//                 }
//               }}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={() => handleSend()}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatDashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import ChatMessage from "../components/ChatMessage";
// import { Sparkles, PanelLeft } from "lucide-react";

// const ChatDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [credits, setCredits] = useState(0);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const token = localStorage.getItem("token");

//   const [conversations] = useState([
//     { title: "React Hooks Guide" },
//     { title: "Python Chatbot" },
//     { title: "Travel Recommendation" },
//   ]);

//   const suggestions = [
//     "Explain quantum computing in simple terms",
//     "Write a Python function to sort a list",
//     "What are the benefits of meditation?",
//     "Help me plan a weekend trip to Paris",
//   ];

//   // 🟢 Fetch chat history + credits when page loads
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/chat/history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching history:", err);
//       }

//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (user && user.id) {
//           // const res = await axios.get(`http://localhost:5000/api/user/${user.id}`, {
//           const res = await axios.get(`http://localhost:5000/api/user/profile`, {

//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setCredits(res.data.credits);
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch credits");
//       }
//     };

//     fetchHistory();
//   }, [token]);

//   // 🟣 Send message to Groq API via backend
//   const handleSend = async (text = input) => {
//     if (!text.trim()) return;

//     // Add user message to chat
//     setMessages((prev) => [...prev, { role: "user", content: text }]);
//     setInput("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/chat/send",
//         { message: text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Add AI response to chat
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: res.data.reply },
//       ]);
//       setCredits(res.data.credits); // update credits dynamically
//     } catch (err) {
//       const msg = err.response?.data?.message || "Chat failed. Please try again.";
//       toast.error(`⚠️ ${msg}`);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col">
//       {/* 🔹 Navbar showing credits */}
//       <Navbar credits={credits} />

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Sidebar */}
//         {sidebarOpen && (
//           <Sidebar
//             conversations={conversations}
//             onClose={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col bg-gray-50 relative">
//           {/* 🧭 Toggle Sidebar Button */}
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="absolute top-4 left-4 z-20 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
//             >
//               <PanelLeft className="w-5 h-5 text-gray-600" />
//             </button>
//           )}

//           {/* Scrollable Chat Messages */}
//           <div className="flex-1 overflow-y-auto p-6 pb-32">
//             {messages.length === 0 ? (
//               <div className="h-full flex flex-col items-center justify-center text-center text-gray-700">
//                 <div className="flex flex-col items-center justify-center mb-4">
//                   <Sparkles className="w-8 h-8 text-blue-600 mb-2" />
//                   <h1 className="text-2xl font-semibold">Welcome to AI Chat</h1>
//                 </div>
//                 <p className="text-gray-500 max-w-md mb-6">
//                   Start a conversation with our AI assistant. Ask questions, get
//                   help with tasks, or explore ideas together.
//                 </p>
//                 <div className="flex flex-col gap-3 w-full max-w-lg">
//                   {suggestions.map((s, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSend(s)}
//                       className="border border-gray-200 bg-white hover:bg-gray-100 transition px-4 py-3 rounded-md text-left shadow-sm"
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <ChatMessage
//                   key={index}
//                   sender={msg.role === "user" ? "user" : "assistant"}
//                   text={msg.content}
//                 />
//               ))
//             )}
//           </div>

//           {/* 🧊 Fixed Input */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSend();
//                 }
//               }}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={() => handleSend()}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatDashboard;



import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import { Sparkles, PanelLeft } from "lucide-react";

const ChatDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [credits, setCredits] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const token = localStorage.getItem("token");

  const [conversations] = useState([
    { title: "React Hooks Guide" },
    { title: "Python Chatbot" },
    { title: "Travel Recommendation" },
  ]);

  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort a list",
    "What are the benefits of meditation?",
    "Help me plan a weekend trip to Paris",
  ];

  // 🟢 Fetch chat history + credits when page loads
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
      }

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
          const res = await axios.get(`http://localhost:5000/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCredits(res.data.credits);
        }
      } catch (err) {
        console.error("❌ Failed to fetch credits");
      }
    };

    fetchHistory();
  }, [token]);

  // 🟣 Send message to Groq API via backend
  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/send",
        { message: text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
      setCredits(res.data.credits); // update credits dynamically
    } catch (err) {
      const msg = err.response?.data?.message || "Chat failed. Please try again.";
      toast.error(`⚠️ ${msg}`);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* 🔹 Navbar showing credits */}
      <Navbar credits={credits} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar
            conversations={conversations}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 relative">
          {/* 🧭 Toggle Sidebar Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-20 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
            >
              <PanelLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Scrollable Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 pb-32">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-700">
                <div className="flex flex-col items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600 mb-2" />
                  <h1 className="text-2xl font-semibold">Welcome to AI Chat</h1>
                </div>
                <p className="text-gray-500 max-w-md mb-6">
                  Start a conversation with our AI assistant. Ask questions, get
                  help with tasks, or explore ideas together.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-lg">
                  {suggestions.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(s)}
                      className="border border-gray-200 bg-white hover:bg-gray-100 transition px-4 py-3 rounded-md text-left shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  sender={msg.role === "user" ? "user" : "assistant"}
                  text={msg.content}
                />
              ))
            )}
          </div>

          {/* 🧊 Fixed Input Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex flex-col gap-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                maxLength={2000}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => handleSend()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>

            {/* 🟢 Instruction + Character Counter */}
            <div className="flex justify-between text-sm text-gray-500 mt-1 px-1">
              <span>Press <b>Enter</b> to send, <b>Shift + Enter</b> for new line</span>
              <span>{input.length}/2000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
