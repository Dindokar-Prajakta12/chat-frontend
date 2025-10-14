

const Sidebar = ({ onSelectConversation, onClose }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://chat-backend-1-twvb.onrender.com/api/chat/conversations", {
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
