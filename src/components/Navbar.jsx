import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";

const Navbar = () => {
  const [credits, setCredits] = useState(0);
  const [userName, setUserName] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeOrg, setActiveOrg] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🟢 Fetch Notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("https://chat-backend-1-twvb.onrender.com/api/notifications/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    if (token) fetchNotifications();
  }, [token]);

  // 🟢 Fetch Active Organization
  useEffect(() => {
    const fetchActiveOrg = async () => {
      try {
        const res = await axios.get("https://chat-backend-1-twvb.onrender.com/api/org/active", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActiveOrg(res.data);
      } catch (err) {
        console.error("Failed to fetch active org:", err);
      }
    };

    if (token) fetchActiveOrg();
  }, [token]);

  // 🟢 Fetch User Profile (Name + Credits)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("https://chat-backend-1-twvb.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCredits(res.data.credits);
        setUserName(res.data.name);
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
      const interval = setInterval(fetchUserProfile, 10000);
      return () => clearInterval(interval);
    }
  }, [token]);

  // 🟢 Setup Socket.IO for Real-Time Notifications
  useEffect(() => {
    const socket = io("https://chat-backend-1-twvb.onrender.com");

    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      socket.emit("registerUser", user.id);
    }

    socket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setShowNotifications(true);
    });

    return () => socket.disconnect();
  }, []);

  // 🟢 Logout Function
  const handleLogout = () => {
    logout();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md z-50 relative">
      {/* 🔹 Brand / App Name */}
      <div className="text-xl font-bold text-blue-600">🤖 AI Chat</div>

      <div className="flex items-center gap-4 relative">
        {/* 🔔 Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="relative"
          >
            <FiBell size={22} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* 🔽 Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-gray-800">
                Notifications
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-gray-50 border-b cursor-pointer"
                    >
                      <p className="font-semibold text-gray-800">{n.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(n.created_at || n.time).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    No notifications yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 💰 Credits */}
        <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
          💰 {credits} Credits
        </button>

        {/* 👤 Profile Button */}
        <button
          onClick={() => {
            setShowProfileDropdown(!showProfileDropdown);
            setShowNotifications(false);
          }}
          className="h-8 bg-gray-200 rounded-full flex items-center justify-center border border-blue-400 px-3 gap-2"
        >
          <CgProfile size={22} color="#1D4ED8" />
          {userName && (
            <span className="font-medium text-gray-700">{userName}</span>
          )}
        </button>

        {/* ▼ Profile Dropdown */}
        {showProfileDropdown && (
          <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-md border z-50">
            <ul className="flex flex-col py-2">
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <CgProfile size={18} className="text-gray-600" />
                <span>Edit Profile</span>
              </li>

              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <FiSettings size={18} className="text-gray-600" />
                <span>Settings</span>
              </li>

              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                <FiLogOut size={18} />
                <span>Sign Out</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
