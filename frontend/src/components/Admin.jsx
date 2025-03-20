import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    category: 'Aptitude Test',
    description: '',
    timeLimit: 30,
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });
  
  // New state for job posting
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    type: '',
    location: '',
    description: ''
  });

  // New state for project collaboration
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Ongoing',
    collaborationDetails: ''
  });

  const [projects, setProjects] = useState([]);

  // New state for live session
  const [newLiveSession, setNewLiveSession] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    status: 'Scheduled',
    hostDetails: '',
    photo: ''
  });

  const [liveSessions, setLiveSessions] = useState([]);

  // New state for course creation
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: 0,
    level: 'Beginner',
    instructor: '',
    status: 'Active',
    photo: '',
    price: 0
  });

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = () => {
      const user = localStorage.getItem('loggedInUser');
      if (!user) {
        navigate('/login');
      }
      // You can add more admin validation here
    };

    checkAdmin();
    fetchUsers();
    fetchStats();
    fetchQuizzes();
    fetchProjects();
    fetchLiveSessions();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/api/user/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/quiz/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchLiveSessions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/livesession');
      const data = await response.json();
      setLiveSessions(data.liveSessions || []);
    } catch (error) {
      console.error('Error fetching live sessions:', error);
    }
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.every(opt => opt)) {
      setNewQuiz(prev => ({
        ...prev,
        questions: [...prev.questions, currentQuestion]
      }));
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newQuiz)
      });
      
      if (response.ok) {
        fetchQuizzes();
        setNewQuiz({
          title: '',
          category: 'Aptitude Test',
          description: '',
          timeLimit: 30,
          questions: []
        });
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  // Updated function to handle job posting
  const handlePostJob = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      console.log('Token:', token); // Log the token for debugging

      const response = await fetch('http://localhost:8080/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token in the Authorization header
        },
        body: JSON.stringify(newJob)
      });
      
      if (response.ok) {
        setNewJob({ title: '', company: '', type: '', location: '', description: '' });
      } else {
        const errorData = await response.json(); // Get error details
        console.error('Error posting job:', errorData); // Log error details
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  // Handle project submission
  const handlePostProject = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newProject)
      });

      if (response.ok) {
        fetchProjects();
        setNewProject({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          status: 'Ongoing',
          collaborationDetails: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error posting project:', errorData);
      }
    } catch (error) {
      console.error('Error posting project:', error);
    }
  };

  // Handle live session submission
  const handlePostLiveSession = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/livesession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newLiveSession)
      });

      if (response.ok) {
        fetchLiveSessions();
        setNewLiveSession({
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          status: 'Scheduled',
          hostDetails: '',
          photo: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error posting live session:', errorData);
      }
    } catch (error) {
      console.error('Error posting live session:', error);
    }
  };

  // Handle course submission
  const handlePostCourse = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure the token is sent
        },
        body: JSON.stringify(newCourse)
      });

      if (response.ok) {
        setNewCourse({
          title: '',
          description: '',
          duration: 0,
          level: 'Beginner',
          instructor: '',
          status: 'Active',
          photo: '',
          price: 0
        });
        // Optionally, fetch courses again or update the UI
      } else {
        const errorData = await response.json();
        console.error('Error posting course:', errorData);
      }
    } catch (error) {
      console.error('Error posting course:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Admin Dashboard
            </h1>
            <button
              onClick={() => navigate('/body/quiz/create')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Create New Quiz
            </button>
          </div>

          {/* Job Posting Form */}
          <h2 className="text-2xl font-bold text-white mb-4">Post a New Job</h2>
          <input type="text" placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="text" placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="text" placeholder="Job Type" value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="text" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="mb-2 p-2 rounded" />
          <textarea placeholder="Job Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="mb-2 p-2 rounded" />
          <button onClick={handlePostJob} className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</button>

          {/* Project Collaboration Form */}
          <h2 className="text-2xl font-bold text-white mb-4">Post a New Project Collaboration</h2>
          <input type="text" placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="mb-2 p-2 rounded" />
          <textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="date" placeholder="Start Date" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="date" placeholder="End Date" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} className="mb-2 p-2 rounded" />
          <select value={newProject.status} onChange={(e) => setNewProject({ ...newProject, status: e.target.value })} className="mb-2 p-2 rounded">
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <textarea placeholder="Collaboration Details" value={newProject.collaborationDetails} onChange={(e) => setNewProject({ ...newProject, collaborationDetails: e.target.value })} className="mb-2 p-2 rounded" />
          <button onClick={handlePostProject} className="bg-blue-600 text-white px-4 py-2 rounded">Post Project</button>

          {/* Live Session Form */}
          <h2 className="text-2xl font-bold text-white mb-4">Post a New Live Session</h2>
          <input type="text" placeholder="Session Title" value={newLiveSession.title} onChange={(e) => setNewLiveSession({ ...newLiveSession, title: e.target.value })} className="mb-2 p-2 rounded" />
          <textarea placeholder="Description" value={newLiveSession.description} onChange={(e) => setNewLiveSession({ ...newLiveSession, description: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="datetime-local" placeholder="Start Time" value={newLiveSession.startTime} onChange={(e) => setNewLiveSession({ ...newLiveSession, startTime: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="datetime-local" placeholder="End Time" value={newLiveSession.endTime} onChange={(e) => setNewLiveSession({ ...newLiveSession, endTime: e.target.value })} className="mb-2 p-2 rounded" />
          <select value={newLiveSession.status} onChange={(e) => setNewLiveSession({ ...newLiveSession, status: e.target.value })} className="mb-2 p-2 rounded">
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="text" placeholder="Host Details" value={newLiveSession.hostDetails} onChange={(e) => setNewLiveSession({ ...newLiveSession, hostDetails: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="text" placeholder="Photo URL" value={newLiveSession.photo} onChange={(e) => setNewLiveSession({ ...newLiveSession, photo: e.target.value })} className="mb-2 p-2 rounded" />
          <button onClick={handlePostLiveSession} className="bg-blue-600 text-white px-4 py-2 rounded">Post Live Session</button>

          {/* Course Creation Form */}
          <h2 className="text-2xl font-bold text-white mb-4">Post a New Course</h2>
          <input type="text" placeholder="Course Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} className="mb-2 p-2 rounded" />
          <textarea placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="number" placeholder="Duration (hours)" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: parseInt(e.target.value) })} className="mb-2 p-2 rounded" />
          <select value={newCourse.level} onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })} className="mb-2 p-2 rounded">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input type="text" placeholder="Instructor" value={newCourse.instructor} onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="text" placeholder="Photo URL" value={newCourse.photo} onChange={(e) => setNewCourse({ ...newCourse, photo: e.target.value })} className="mb-2 p-2 rounded" />
          <input type="number" placeholder="Price" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })} className="mb-2 p-2 rounded" />
          <button onClick={handlePostCourse} className="bg-blue-600 text-white px-4 py-2 rounded">Post Course</button>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab('createQuiz')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'createQuiz'
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Create Quiz
            </button>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/30 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-cyan-400">{stats.totalUsers}</p>
              </div>
              <div className="bg-slate-700/30 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">Active Users</h3>
                <p className="text-3xl font-bold text-emerald-400">{stats.activeUsers}</p>
              </div>
              <div className="bg-slate-700/30 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">Total Quizzes</h3>
                <p className="text-3xl font-bold text-purple-400">{quizzes.length}</p>
              </div>
            </div>
          )}

          {/* Users Content */}
          {activeTab === 'users' && (
            <div className="bg-slate-700/30 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-600">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <p className="text-slate-300">View and manage all registered users</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {users.map((user, index) => (
                      <tr key={user._id || index} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                  {user.name ? user.name[0].toUpperCase() : '?'}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-300">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isAdmin 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleString() : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status || 'active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-cyan-400 hover:text-cyan-300 mr-3">View Details</button>
                          <button className="text-red-400 hover:text-red-300">Deactivate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {users.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-300">No users found</p>
                </div>
              )}
            </div>
          )}

          {/* Quizzes List */}
          {activeTab === 'quizzes' && (
            <div className="space-y-4">
              {quizzes.map((quiz, index) => (
                <div key={index} className="bg-slate-700/30 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
                    <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400">
                      {quiz.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{quiz.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Time Limit: {quiz.timeLimit} minutes</span>
                    <span>Questions: {quiz.questions.length}</span>
                    <span className={quiz.isActive ? 'text-emerald-400' : 'text-red-400'}>
                      {quiz.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create Quiz */}
          {activeTab === 'createQuiz' && (
            <div className="bg-slate-700/30 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Create New Quiz</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newQuiz.category}
                    onChange={(e) => setNewQuiz(prev => ({ ...prev, category: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option>Aptitude Test</option>
                    <option>Mathematical Reasoning</option>
                    <option>Technical Knowledge</option>
                    <option>Verbal Communication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
                  <input
                    type="number"
                    value={newQuiz.timeLimit}
                    onChange={(e) => setNewQuiz(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add Question</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Question</label>
                      <input
                        type="text"
                        value={currentQuestion.question}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    {currentQuestion.options.map((option, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700">Option {index + 1}</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...currentQuestion.options];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Correct Answer (1-4)</label>
                      <input
                        type="number"
                        min="1"
                        max="4"
                        value={currentQuestion.correctAnswer + 1}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: parseInt(e.target.value) - 1 }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Explanation</label>
                      <textarea
                        value={currentQuestion.explanation}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      onClick={handleAddQuestion}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Add Question
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Questions ({newQuiz.questions.length})</h3>
                  {newQuiz.questions.map((q, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{index + 1}. {q.question}</p>
                      <ul className="ml-4 mt-2">
                        {q.options.map((opt, i) => (
                          <li key={i} className={`${i === q.correctAnswer ? 'text-green-600 font-medium' : ''}`}>
                            {i + 1}. {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCreateQuiz}
                  disabled={newQuiz.questions.length === 0}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  Create Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
