import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizzes, setQuizzes] = useState([]); // Initialize as empty array
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const quizCategories = [
    {
      title: "Aptitude Test",
      description: "Enhance your logical thinking and problem-solving skills",
      icon: "🧮",
      color: "from-cyan-400 to-emerald-500",
      hoverColor: "hover:from-cyan-500 hover:to-emerald-600"
    },
    {
      title: "Mathematical Reasoning",
      description: "Master mathematical concepts and numerical abilities",
      icon: "📐",
      color: "from-rose-400 to-purple-500",
      hoverColor: "hover:from-rose-500 hover:to-purple-600"
    },
    {
      title: "Technical Knowledge",
      description: "Test your technical and programming expertise",
      icon: "💻",
      color: "from-amber-400 to-pink-500",
      hoverColor: "hover:from-amber-500 hover:to-pink-600"
    },
    {
      title: "Verbal Communication",
      description: "Improve your language and communication skills",
      icon: "📚",
      color: "from-blue-400 to-violet-500",
      hoverColor: "hover:from-blue-500 hover:to-violet-600"
    }
  ];

  useEffect(() => {
    checkAdminStatus();
    // Redirect non-admin users if they try to access admin routes
    if (window.location.pathname.includes('/admin') && !isAdmin) {
      navigate('/body');
    }
    if (selectedCategory) {
      fetchQuizzes(selectedCategory);
    }
  }, [selectedCategory, isAdmin, navigate]);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchQuizzes = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:8080/api/quiz/category/${category}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch quizzes');
      }
      setQuizzes(data.quizzes || []); // Ensure we're setting an array
      setStartQuiz(true);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setError(error.message);
      setQuizzes([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.title);
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/body/quizsection/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-x">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6 animate-fade-in">
            Master Your Skills 🚀
          </h1>
          <p className="text-xl text-cyan-100/90 max-w-2xl mx-auto mb-8 animate-slide-up">
            Challenge yourself with our comprehensive quiz sections designed to enhance your knowledge and abilities.
          </p>
          {isAdmin && (
            <button
              onClick={() => navigate('/body/quiz/create')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all mb-8"
            >
              Create New Quiz
            </button>
          )}
        </div>

        {!startQuiz ? (
          // Categories Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {quizCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:bg-slate-800/70 border border-white/5"
                onClick={() => handleCategoryClick(category)}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} ${category.hoverColor} flex items-center justify-center mb-4 mx-auto transform group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{category.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 transition-all duration-500">
                  {category.title}
                </h3>
                <p className="text-slate-300 text-center group-hover:text-slate-200 transition-all duration-500">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          // Quizzes List
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Available {selectedCategory} Quizzes
            </h2>
            {loading ? (
              <div className="text-center text-white">Loading quizzes...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : quizzes.length === 0 ? (
              <div className="text-center text-white">
                No quizzes available in this category yet.
              </div>
            ) : (
              <div className="space-y-6">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-102 transition-all duration-300 border border-white/5"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                    <p className="text-slate-300 mb-4">{quiz.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-slate-400">
                        <span className="mr-4">⏱️ {quiz.timeLimit} minutes</span>
                        <span>📝 {quiz.questions.length} questions</span>
                      </div>
                      <button
                        onClick={() => handleStartQuiz(quiz._id)}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setStartQuiz(false)}
              className="mt-8 px-6 py-3 bg-slate-700 text-white rounded-lg mx-auto block hover:bg-slate-600 transition-colors duration-300"
            >
              ← Back to Categories
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-12 transform transition-all duration-500 hover:scale-105">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 hover:bg-slate-800/70 border border-white/5">
              <div className="text-3xl mb-4 transform transition-all duration-500 hover:rotate-12">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Targeted Learning</h3>
              <p className="text-slate-300">Personalized quizzes designed to enhance your specific skills and knowledge areas.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 hover:bg-slate-800/70 border border-white/5">
              <div className="text-3xl mb-4 transform transition-all duration-500 hover:rotate-12">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
              <p className="text-slate-300">Monitor your improvement with detailed performance analytics and insights.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 hover:bg-slate-800/70 border border-white/5">
              <div className="text-3xl mb-4 transform transition-all duration-500 hover:rotate-12">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Earn Certificates</h3>
              <p className="text-slate-300">Get recognized for your achievements with shareable certificates upon completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;