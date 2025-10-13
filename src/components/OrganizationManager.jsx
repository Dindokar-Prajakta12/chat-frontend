import { useState, useEffect } from "react";
import axios from "axios";

const OrganizationManager = () => {
  const [orgs, setOrgs] = useState([]);
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const token = localStorage.getItem("token");

  // 🔹 Fetch organizations on load
  useEffect(() => {
    fetchOrgs();
  }, []);

  // ✅ Fetch all organizations for the logged-in user
  const fetchOrgs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/org/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrgs(res.data);
    } catch (err) {
      console.error("❌ Error fetching organizations:", err);
    }
  };

  // ✅ Create new organization
  const createOrg = async () => {
    if (!name.trim()) return alert("Enter organization name!");
    await axios.post(
      "http://localhost:5000/api/org/create",
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setName("");
    fetchOrgs();
  };

  // ✅ Rename organization
  const renameOrg = async (id) => {
    if (!newName.trim()) return alert("Enter a new name!");
    await axios.put(
      `http://localhost:5000/api/org/${id}/rename`,
      { name: newName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("✅ Organization renamed!");
    setNewName("");
    fetchOrgs();
  };

  // ✅ Switch active organization
  const switchOrg = async (id) => {
    await axios.post(
      "http://localhost:5000/api/org/active",
      { organizationId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("✅ Switched active organization!");
  };

  // ✅ Fetch organization members
  const fetchMembers = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/org/${id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data);
    } catch (err) {
      console.error("❌ Error fetching members:", err);
    }
  };

  // ✅ Invite new member (record only)
  const inviteMember = async () => {
    if (!email.trim()) return alert("Enter email!");
    await axios.post(
      "http://localhost:5000/api/org/invite",
      { organizationId: selectedOrg, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEmail("");
    fetchMembers(selectedOrg);
  };

  // ✅ Remove member
  const removeMember = async (memberId) => {
    await axios.post(
      "http://localhost:5000/api/org/remove-member",
      { organizationId: selectedOrg, memberId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMembers(selectedOrg);
  };

  // ✅ Change member role
  const changeRole = async (memberId, newRole) => {
    await axios.post(
      "http://localhost:5000/api/org/change-role",
      { organizationId: selectedOrg, memberId, newRole },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMembers(selectedOrg);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        🏢 Organization Management
      </h2>

      {/* 🔹 Create Organization */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New organization name"
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={createOrg}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Create
        </button>
      </div>

      {/* 🔹 Organization List */}
      <ul className="space-y-3">
        {orgs.map((o) => (
          <li
            key={o.id}
            className="p-3 border rounded flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{o.name}</h3>
              <p className="text-sm text-gray-500">Org ID: {o.id}</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Rename org"
                className="border p-1 rounded text-sm"
              />
              <button
                onClick={() => renameOrg(o.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Rename
              </button>

              <button
                onClick={() => switchOrg(o.id)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Switch
              </button>

              <button
                onClick={() => {
                  setSelectedOrg(o.id);
                  fetchMembers(o.id);
                }}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
              >
                Members
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 🔹 Member Management */}
      {selectedOrg && (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="font-bold text-lg mb-3 text-blue-700">👥 Members</h3>

          {/* Invite Member */}
          <div className="flex gap-2 mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Invite by email"
              className="border p-2 rounded w-1/2"
            />
            <button
              onClick={inviteMember}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Invite
            </button>
          </div>

          {/* Members List */}
          <ul>
            {members.length === 0 ? (
              <p className="text-gray-500 italic">No members yet.</p>
            ) : (
              members.map((m) => (
                <li
                  key={m.id || m.email}
                  className="border-b p-3 flex justify-between items-center"
                >
                  <div>
                    <span className="font-semibold">{m.username || m.email}</span>
                    <span className="text-gray-600 ml-2 text-sm">
                      ({m.role} - {m.status})
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={m.role}
                      onChange={(e) => changeRole(m.id, e.target.value)}
                      className="border p-1 rounded text-sm"
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>

                    <button
                      onClick={() => removeMember(m.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrganizationManager;
