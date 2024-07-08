import React, { useState, useEffect } from 'react';
import { getChats, sendMessage } from '../api/chats';
import Chat from '../components/online/Chat';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getChats();
      setChats(data);
    };
    fetchChats();
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      const newChat = await sendMessage(message, 'currentUser');
      if (newChat) {
        setChats([...chats, newChat]);
        setMessage('');
      }
    }
  };

  return (
    <div className="chat-page">
      <h1>Chat</h1>
      <div className="chat-messages">
        {chats.map(chat => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;