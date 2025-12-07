// src/components/ChatSupport.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ChatSupport.css';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! 👋 Welcome to BRP Technology. I'm here to help you with any questions about our digital marketing services.", 
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "SEO Services",
    "Web Design",
    "SMO Services",
    "PPC Management",
    "Pricing",
    "Contact Sales"
  ];

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          "Thanks for your message! Our team will get back to you soon with more information.",
          "I understand you're interested in our services. Let me connect you with a specialist.",
          "That's a great question! One of our experts will contact you shortly.",
          "We'd love to help you with that. Please share your email so we can follow up.",
          "I've noted your inquiry. Our team will reach out to discuss your requirements."
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        setMessages(prev => [...prev, {
          text: randomResponse,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  };

  const handleQuickReply = (reply) => {
    const newMessage = {
      text: `I'm interested in ${reply}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: `Great choice! Our ${reply} can help boost your online presence. Let me connect you with a specialist.`,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>
            <span className="status-indicator"></span>
            BRP Support
          </h3>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            ×
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
              <div className="message-time">{message.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage} aria-label="Send message">
            Send
            <span>↑</span>
          </button>
        </div>
      </div>
      
      <button 
        className="chat-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat support"
      >
        💬
      </button>
    </>
  );
};

export default ChatSupport;