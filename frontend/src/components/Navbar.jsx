import React, { useState, useRef, useEffect } from 'react';
import pic from './allimages/pic.jpg';
import mainlogo from './allimages/logo2.png';
import aiimg from './allimages/Artificial Intelligence design.gif';
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponses, setChatResponses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  
  // Updated dark mode toggle with smooth transition
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  };

  // Handle Chat Submission
  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!chatMessage.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatMessage }),
      });

      const data = await response.json();
      setChatResponses([...chatResponses, { question: chatMessage, answer: data.response }]);
      setChatMessage('');  // Clear the input after submission
    } catch (error) {
      console.error("Error while communicating with the chatbot:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'}`}>
      <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'} shadow-lg fixed top-0 left-0 w-full z-50 transition-colors duration-300`} style={{ height: '85px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-xl font-bold">
              <img className="h-[35px] w-[130px]" src={mainlogo} alt="Logo" />
            </a>
          </div>

          <div className="hidden md:flex space-x-8 mr-auto ml-10">
            <a href="/body" className="text-white hover:bg-indigo-600 px-5 py-3 rounded-md text-base font-extrabold text-lg shadow-lg hover:scale-105 transition-transform">Home</a>
            <a href="#" className="text-white hover:bg-purple-600 px-5 py-3 rounded-md text-base font-extrabold text-lg shadow-lg hover:scale-105 transition-transform">Trending</a>
            <a href="#" className="text-white hover:bg-pink-600 px-5 py-3 rounded-md text-base font-extrabold text-lg shadow-lg hover:scale-105 transition-transform">Services</a>
            <a href="#" className="text-white hover:bg-indigo-600 px-5 py-3 rounded-md text-base font-extrabold text-lg shadow-lg hover:scale-105 transition-transform">Blog</a>
            
          </div>

          <div className="flex items-center space-x-5">
            {/* AI Image Button */}
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 hover:shadow-xl transition-shadow" onClick={toggleSidebar}>
              <img src={aiimg} alt="AI GIF" className="w-full h-full object-cover cursor-pointer" />
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:shadow-xl transition-shadow">
                <img src={pic} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </button>

              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-52 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} border border-gray-200 rounded-md shadow-xl transition-colors duration-300`}>
                  <ul className="py-2 text-base">
                    <Link to="/myprofile">
                      <li className="block px-5 py-3 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white rounded-xl font-bold transition-colors">My Profile</li>
                    </Link>
                    <li><a href="#" className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-xl font-bold transition-colors">Weekly Assessment</a></li>
                    <li><a href="#" className="block px-5 py-3 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 hover:text-white rounded-xl font-bold transition-colors">Customer Care</a></li>
                    <li><a href="#" className="block px-5 py-3 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white rounded-xl font-bold transition-colors">Settings</a></li>
                    <li>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white rounded-xl font-bold transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Enhanced Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`w-14 h-14 rounded-full flex items-center justify-center transform transition-all duration-500 ease-in-out hover:scale-110 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 rotate-180' 
                  : 'bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500'
              }`}
              style={{
                boxShadow: darkMode 
                  ? '0 0 15px rgba(255, 255, 255, 0.3)' 
                  : '0 0 15px rgba(99, 102, 241, 0.5)'
              }}
            >
              <div className="relative w-full h-full">
                {darkMode ? (
                  <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center animate-bounce-slow">
                    <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Chatbot Sidebar */}
        {sidebarOpen && (
          <div className={`fixed right-0 top-0 h-full w-[400px] ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-indigo-50 to-purple-50'} shadow-2xl z-50 flex flex-col transition-colors duration-300`}>
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-indigo-500 to-purple-500'} p-5 flex justify-between items-center`}>
              <h2 className="text-white text-xl font-semibold">Chatbot</h2>
              <button onClick={closeSidebar} className="text-white font-bold text-2xl hover:scale-110 transition-transform">&times;</button>
            </div>
            <div className={`flex-1 p-5 overflow-y-auto ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              {chatResponses.map((res, index) => (
                <div key={index} className={`mb-4 p-3 ${darkMode ? 'bg-gray-600' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} rounded-lg shadow-md`}>
                  <p className="font-semibold">You:</p>
                  <p className={`${darkMode ? 'bg-gray-500' : 'bg-white'} p-3 rounded-md shadow-inner`}>{res.question}</p>
                  <p className="font-semibold mt-3">Bot:</p>
                  <p className={`${darkMode ? 'bg-gray-500' : 'bg-white'} p-3 rounded-md shadow-inner`}>{res.answer}</p>
                </div>
              ))}
            </div>
            <div className={`p-5 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-indigo-100 to-purple-100'}`}>
              <form onSubmit={handleChatSubmit} className="flex space-x-3">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className={`w-full p-3 border border-gray-300 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="Type your message"
                />
                <button type="submit" className={`${darkMode ? 'bg-gray-600' : 'bg-gradient-to-r from-indigo-500 to-purple-500'} text-white p-3 rounded-md hover:shadow-lg transition-shadow`}>Send</button>
              </form>
            </div>
          </div>
        )}
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
