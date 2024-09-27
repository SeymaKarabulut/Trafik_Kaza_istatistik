import React, { useState } from 'react';

const Chatcpt = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        timestamp: new Date().toLocaleString(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.timestamp}</strong>: {message.text}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatcpt;
