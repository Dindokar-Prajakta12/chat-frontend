import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (selectedConversation) {
  //     const fetchMessages = async () => {
  //       const res = await axios.get(
  //         `http://localhost:5000/api/chat/conversations/${selectedConversation}`,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //       setMessages(res.data);
  //     };
  //     fetchMessages();
  //   } else {
  //     setMessages([]);
  //   }
  // }, [selectedConversation]);


  useEffect(() => {
  const fetchMessages = async () => {
    if (!selectedConversation) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/conversations/${selectedConversation}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  fetchMessages();
  console.log("Selected conversation:", selectedConversation);

}, [selectedConversation]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await axios.post(
      "http://localhost:5000/api/chat/send",
      { message: input, conversationId: selectedConversation },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: res.data.reply },
    ]);

    if (!selectedConversation) {
      setSelectedConversation(res.data.conversationId);
    }

    setInput("");
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelectConversation={setSelectedConversation} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`my-2 p-2 rounded-md max-w-lg ${
                m.role === "user"
                  ? "bg-blue-200 self-end text-right"
                  : "bg-gray-200 self-start text-left"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
        <div className="p-4 flex gap-2 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
