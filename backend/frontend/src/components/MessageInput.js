import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-3 flex">
      <input
        value={text}
        className="input input-bordered w-full"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary ml-2" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
