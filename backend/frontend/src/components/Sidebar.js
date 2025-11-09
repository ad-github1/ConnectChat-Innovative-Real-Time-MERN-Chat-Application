import React from "react";
import useUserStore from "../store/userStore";

export default function Sidebar({ onSelectUser }) {
  const { users } = useUserStore();

  return (
    <div className="w-64 border-r h-screen p-4 overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      {users.map((u) => (
        <div
          key={u._id}
          className="p-2 border-b cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectUser(u)}
        >
          {u.username} <span className="text-sm text-green-500">●</span>
        </div>
      ))}
    </div>
  );
}
