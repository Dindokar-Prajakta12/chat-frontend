import axios from "axios";
import { useEffect, useState } from "react";

const InvitesPage = () => {
  const [invites, setInvites] = useState([]);
  const token = localStorage.getItem("token");

  const acceptInvite = async () => {
    await axios.post(
      "http://localhost:5000/api/org/accept-invite",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Invite accepted!");
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Pending Invitations</h2>
      <button
        onClick={acceptInvite}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Accept Invite
      </button>
    </div>
  );
};

export default InvitesPage;
