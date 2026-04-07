import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMessageSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, sender: 'user' }]);
    setMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, text: 'Our team will reply soon!', sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="chat-component">
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Customer Support</h3>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}><FiX size={20} /></button>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-container">
            <input 
              className="chat-input" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
              placeholder="Type..."
            />
            <button className="chat-send-btn" onClick={handleMessageSend}><FiSend size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
}