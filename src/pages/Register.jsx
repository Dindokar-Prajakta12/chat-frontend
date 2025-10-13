
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: '', email: '', password: '' });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log('Registering...', form);

//     localStorage.setItem('token', 'dummyToken');
//     navigate('/');
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white border-opacity-30 mx-4 sm:mx-0">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700 hover:text-pink-600 transition duration-300">
//           🚀 Create Your Account
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             placeholder="Username"
//             value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//             className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-purple-400"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-pink-400"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
//           >
//             🎉 Register
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-700">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-700 hover:underline font-medium">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;




import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Save tokens & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("🎉 Registration Successful!", {
        position: "top-right",
        autoClose: 2500,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("❌ Registration Error:", err);
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(`⚠️ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white border-opacity-30 mx-4 sm:mx-0">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700 hover:text-pink-600 transition duration-300">
          🚀 Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-pink-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:scale-105"
            } text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300`}
          >
            {loading ? "Registering..." : "🎉 Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
