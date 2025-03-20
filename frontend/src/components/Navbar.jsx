import React, { useState, useRef, useEffect } from 'react';
import pic from './allimages/pic.jpg';
import mainlogo from './allimages/logo2.png';
import aiimg from './allimages/Artificial Intelligence design.gif';
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { usePoints } from '../context/PointsContext';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponses, setChatResponses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPointsInfo, setShowPointsInfo] = useState(false);
  const { points, resetPoints } = usePoints();

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    // First check if admin status is in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus !== null) {
      // Convert the string "true" or "false" to boolean, or handle direct boolean values
      setIsAdmin(storedAdminStatus === true || storedAdminStatus === "true");
    }
    checkAdminStatus();
  }, []);

  useEffect(() => {
    // Get points from localStorage on component mount
    const savedPoints = localStorage.getItem('userPoints');
    if (!savedPoints) {
      localStorage.setItem('userPoints', '0');
    }
  }, []);

  const checkAdminStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAdmin(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.isAdmin !== undefined) {
        const adminStatus = data.isAdmin === true || data.isAdmin === "true";
        setIsAdmin(adminStatus);
        localStorage.setItem('isAdmin', adminStatus);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

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
    localStorage.removeItem('isAdmin'); // Also remove admin status on logout
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

          <div className="flex items-center space-x-4">
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
                    {isAdmin && (
                      <Link to="/admin">
                        <li className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-xl font-bold transition-colors">Admin Panel</li>
                      </Link>
                    )}
                    <Link to="/body/weekly-assessment">
                      <li className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-xl font-bold transition-colors">
                        <div className="flex items-center justify-between">
                          <span>Weekly Assessment</span>
                          {/* {assessmentStatus?.streak > 0 && (
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                              🔥 {assessmentStatus.streak}
                            </span>
                          )} */}
                        </div>
                      </li>
                    </Link>
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
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 5a1 1 0 011 1v.5a1 1 0 11-2 0V6a1 1 0 011-1zm0 3a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
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
            <div className="relative">
              <div 
                className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-3 py-1 rounded-full shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setShowPointsInfo(true)}
                onMouseLeave={() => setShowPointsInfo(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                <span className="font-bold text-yellow-50">{points}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-yellow-100 opacity-75 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Points Info Popup */}
              {showPointsInfo && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 transform transition-all duration-300 scale-100 origin-top-right border border-gray-100">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800">How to Earn Points</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Current: {points}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="border-b pb-2">
                      <h4 className="font-semibold text-indigo-600 mb-1">Daily Activities</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex justify-between">
                          <span>Daily Login</span>
                          <span className="font-medium">10 points</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Weekly Login Streak</span>
                          <span className="font-medium">50 bonus points</span>
                        </li>
                        <li className="flex justify-between">
                          <span>First-time Website Visit</span>
                          <span className="font-medium">1 point</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-semibold text-indigo-600 mb-1">Learning & Assessment</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex justify-between">
                          <span>Quiz Correct Answer</span>
                          <span className="font-medium">5 points each</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Live Session</span>
                          <span className="font-medium">10 points</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-indigo-600 mb-1">Career Development</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex justify-between">
                          <span>Start Mock Interview</span>
                          <span className="font-medium">20 points</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Apply to Project</span>
                          <span className="font-medium">10 points</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Apply to Jobs</span>
                          <span className="font-medium">10 points</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Referral</span>
                          <span className="font-medium">100 points</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    * Points are awarded only once per unique activity
                  </div>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => resetPoints()}
                  >
                    Reset Points
                  </button>
                </div>
              </div>
              )}
            </div>
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
