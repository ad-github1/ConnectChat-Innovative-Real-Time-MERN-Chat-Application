import React from "react";
import useChatStore from "../store/chatStore";
import useAuthStore from "../store/authStore";

export default function ChatWindow() {
  const { messages } = useChatStore();
  const { user } = useAuthStore();

  return (
    <div className="flex-1 p-4 h-full overflow-y-scroll">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`mb-2 ${
            m.sender === user._id ? "text-right" : "text-left"
          }`}
        >
          <strong>{m.senderName}: </strong>
          {m.content}
        </div>
      ))}
    </div>
  );
}
