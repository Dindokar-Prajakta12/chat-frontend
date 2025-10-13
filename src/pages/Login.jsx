


// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form, {
//         headers: { "Content-Type": "application/json" },
//       });

//       // ✅ Save tokens & user info
//       localStorage.setItem("token", res.data.accessToken); // 👈 Important for route protection
//       localStorage.setItem("refreshToken", res.data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       toast.success("🔓 Login Successful!", {
//         position: "top-right",
//         autoClose: 2000,
//       });

//       // ✅ Redirect to ChatDashboard
//       setTimeout(() => navigate("/"), 1000);
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       const msg =
//         err.response?.data?.message || "Invalid email or password. Please try again.";
//       toast.error(`⚠️ ${msg}`, {
//         position: "top-right",
//         autoClose: 2500,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-400">
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-white border-opacity-40 mx-4 sm:mx-0">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 hover:text-purple-600 transition duration-300">
//           🔐 Login to Your Account
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-400"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-purple-400"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:scale-105"
//             } text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300`}
//           >
//             {loading ? "Logging in..." : "🔓 Login"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-700">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-pink-600 hover:underline font-medium"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 👈 use login function from context
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      // 👇 Update context (and localStorage automatically)
      login(res.data.token, res.data.user);

      toast.success("🔓 Login Successful!", {
        position: "top-right",
        autoClose: 2000,
      });
console.log("Saved token:", res.data.token);

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("❌ Login Error:", err);
      const msg =
        err.response?.data?.message || "Invalid email or password. Please try again.";
      toast.error(`⚠️ ${msg}`, {
        position: "top-right",
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-400">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-white border-opacity-40 mx-4 sm:mx-0">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 hover:text-purple-600 transition duration-300">
          🔐 Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:scale-105"
            } text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300`}
          >
            {loading ? "Logging in..." : "🔓 Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
