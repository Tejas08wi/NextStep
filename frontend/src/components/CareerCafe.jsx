import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import ProjectCollab from './projectCollab';
import LiveSession from './LiveSession';

function CareerCafe() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('loggedInUser');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userName) {
      setUsername(userName);
    }

    const newSocket = io('http://localhost:8080', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, { 
        text: data.message, 
        type: 'received',
        sender: data.sender 
      }]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && socket) {
      const messageData = {
        message: messageInput,
        sender: username 
      };
      
      socket.emit('message', messageData);
      
      setMessages(prevMessages => [...prevMessages, { 
        text: messageInput, 
        type: 'sent',
        sender: username
      }]);
      
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-indigo-200 to-purple-200 p-8 bg-opacity-90 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.2] -z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 backdrop-blur-[2px] -z-[1]"></div>
      <div className="max-w-7xl mx-auto space-y-6 relative">
        <div className="flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="w-[200px]">
            {/* Empty div for spacing */}
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Career Kafe
            </h1>
            <svg 
              className="w-8 h-8 text-indigo-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M18 8h1a4 4 0 110 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full shadow-sm border border-blue-100">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Online | Logged in as <span className="font-bold">{username}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-500/50">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  BAATCHIT
                </h2>
              </div>
            </div>
            <div className="chat-messages p-6 h-[32rem] overflow-y-auto custom-scrollbar">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-6 flex flex-col ${msg.type === 'sent' ? 'items-end' : 'items-start'} hover:transform hover:scale-[1.02] transition-transform duration-200`}
                >
                  {msg.type === 'status' ? (
                    <div className="text-gray-500 italic text-sm px-4 py-2">
                      {msg.text}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-1 px-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm
                          ${msg.type === 'sent' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'}`}>
                          {(msg.type === 'sent' ? 'You' : msg.sender?.[0])?.toUpperCase()}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {msg.type === 'sent' ? 'You' : msg.sender}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm relative
                        ${msg.type === 'sent' 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        } break-words animate-fadeIn`}>
                        {msg.text}
                        <div className={`absolute top-0 ${msg.type === 'sent' ? '-right-2' : '-left-2'} 
                          w-2 h-2 transform rotate-45
                          ${msg.type === 'sent' 
                            ? 'bg-blue-500' 
                            : 'bg-gray-100'}`} 
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <form onSubmit={sendMessage} className="flex gap-3">
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-3.5 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all placeholder:text-gray-400 shadow-sm"
                  placeholder="Type your message..."
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-8 py-3.5 
                    rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all 
                    duration-200 font-medium flex items-center gap-2 hover:scale-105"
                >
                  <span>Send</span>
                  <svg className="w-4 h-4 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-500/50">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  Project Collaborations
                </h2>
              </div>
            </div>
            <ProjectCollab />
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-500/50">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Live Sessions
              </h2>
            </div>
          </div>
          <LiveSession />
        </div>
      </div>
    </div>
  );
}

export default CareerCafe;