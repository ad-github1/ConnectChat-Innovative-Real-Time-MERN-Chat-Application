import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import useChatStore from "../store/chatStore";
import useAuthStore from "../store/authStore";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, addMessage, users, setUsers } = useChatStore();
  const { user } = useAuthStore();

  // Keep socket reference stable
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BACKEND_URL, {
      query: { userId: user._id }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user._id]); // only reconnect when logged-in user changes

  useEffect(() => {
    const socket = socketRef.current;

    const handleMessage = (msg) => {
      addMessage(msg);
    };

    const handleUsers = (onlineUsers) => {
      setUsers(onlineUsers);
    };

    socket.on("receiveMessage", handleMessage);
    socket.on("usersOnline", handleUsers);

    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.off("usersOnline", handleUsers);
    };
  }, [addMessage, setUsers]); // safe because handlers are stable references

  const sendMessage = () => {
    const msg = { sender: user._id, content: input };
    socketRef.current.emit("sendMessage", msg);
    addMessage(msg);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Online users */}
      <div className="w-96 p-2 mb-3 border rounded bg-gray-50">
        <strong>Online Users:</strong>
        <ul>
          {users.map((u) => (
            <li key={u._id} className="text-sm text-gray-700">{u.username}</li>
          ))}
        </ul>
      </div>

      {/* Messages */}
      <div className="border w-96 h-96 overflow-y-scroll mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 ${
              m.sender === user._id ? "text-right" : "text-left"
            }`}
          >
            <strong>{m.sender === user._id ? "You" : m.senderName}</strong>:{" "}
            {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        className="input input-bordered w-80"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
