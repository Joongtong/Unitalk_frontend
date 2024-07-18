import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';
import { IFrame } from '@stomp/stompjs';
import 'assets/styles/ChatHome.css';


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
  const [inputValue, setInputValue] = useState<string>('');

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
          message: "새 친구가 들어왔어요 !",
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
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() && stompClient) {
      const newMessage: Chat = {
        id: Date.now(),
        message: inputValue,
        sender: "익명",
        timestamp: new Date().toISOString()
      };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(newMessage));
      setInputValue('');
    }
  };

  return (
    <div className="chatContainer">
      <h1>채팅방</h1>
      <p>연결 상태: {connected ? '연결됨' : '연결 중...'}</p>
      <div className="chatBox">
        {messages.length === 0 ? (
          <p>아직 메시지가 없습니다.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <img src="student.png" alt="User Avatar" />
              <p>
                <strong>{msg.sender}</strong>: {msg.message}
                <small> ({new Date(msg.timestamp).toLocaleString()})</small>
              </p>
            </div>
          ))
        )}
      </div>
      <div className="messageInput">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatHome;