import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatMessage {
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:3791/ws'),
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/topic/messages', (message) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected');
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && clientRef.current) {
      clientRef.current.publish({
        destination: '/app/chat',
        body: JSON.stringify({ message: input }),
      });
      setInput('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;