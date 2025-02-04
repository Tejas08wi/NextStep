import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [startQuiz, setStartQuiz] = useState(false);
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

  const handleStartQuiz = () => {
    console.log('Navigating to quiz section...');
    navigate('/body/quizsection');
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
          <button 
            onClick={handleStartQuiz}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white rounded-full font-bold text-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl shadow-cyan-500/25 animate-bounce-slow">
            Take a Quiz Now ✨
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {quizCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:bg-slate-800/70 border border-white/5"
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
              <button 
                onClick={handleStartQuiz}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-white rounded-lg font-semibold transition-all duration-500 
                group-hover:from-cyan-500/20 group-hover:to-emerald-500/20 hover:shadow-lg border border-white/5"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-12 transform transition-all duration-500 hover:scale-105">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 hover:bg-slate-800/70 border border-white/5">
              <div className="text-3xl mb-4 transform transition-all duration-500 hover:rotate-12">🎯</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Targeted Practice</h3>
              <p className="text-slate-300">Carefully curated questions to enhance specific skills</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 hover:bg-slate-800/70 border border-white/5">
              <div className="text-3xl mb-4 transform transition-all duration-500 hover:rotate-12">📈</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Track Progress</h3>
              <p className="text-slate-300">Monitor your improvement with detailed analytics</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 hover:bg-slate-800/70 border border-white/5">
              <div className="text-3xl mb-4 transform transition-all duration-500 hover:rotate-12">🏆</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Earn Certificates</h3>
              <p className="text-slate-300">Get certified upon completing challenge sets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;