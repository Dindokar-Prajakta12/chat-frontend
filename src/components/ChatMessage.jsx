// src/components/ChatMessage.jsx
const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`max-w-lg p-3 rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
