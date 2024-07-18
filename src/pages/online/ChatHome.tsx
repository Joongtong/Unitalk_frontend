import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';
import { IFrame } from '@stomp/stompjs';

interface Chat {
  id: number;
  message: string;
  sender: string;
  timestamp: string;
}

const ChatHome: React.FC = () => {
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS('http://localhost:3791/ws');
      const client = Stomp.over(socket);

      client.connect({}, () => {
        setStompClient(client);
        setConnected(true);
        console.log('Connected to WebSocket');

        client.subscribe('/topic/public', (message: IFrame) => {
          console.log('Received raw message:', message);
          try {
            const newMessage: Chat = JSON.parse(message.body);
            console.log('Parsed message:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });

        // Test message
        client.send("/app/chat.sendMessage", {}, JSON.stringify({
          sender: "System",
          message: "WebSocket connection test",
          timestamp: new Date().toISOString()
        }));
      }, (error: string | IFrame) => {
        console.error('STOMP error:', error);
        setConnected(false);
        // Attempt to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>채팅방</h1>
      <p>연결 상태: {connected ? '연결됨' : '연결 중...'}</p>
      <div>
        <h2>메시지:</h2>
        {messages.length === 0 ? (
          <p>아직 메시지가 없습니다.</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}</strong>: {msg.message}
              <small> ({new Date(msg.timestamp).toLocaleString()})</small>
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHome;