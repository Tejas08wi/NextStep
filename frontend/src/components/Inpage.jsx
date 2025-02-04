import React from 'react';
import inpageimg from './allimages/sfhewjgf.jpg';

function OnlineDegree() {
  return (
    <div className="font-sans m-0 p-0 mr-20 mt-20 ml-20 relative overflow-hidden min-h-screen">
      {/* Enhanced background with default animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-pink-50 opacity-90 rounded-lg">
        {/* Animated dots using default pulse */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-pink-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-purple-300 rounded-full animate-pulse delay-150"></div>
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-300 rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Enhanced blur effects */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-3xl opacity-60 animate-pulse"></div>

      <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="w-full md:w-3/5 md:pr-12">
          <div className="inline-block transform hover:scale-105 transition-transform duration-300">
            <p className="text-base text-gray-600 mb-3 tracking-wider font-medium bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
              ✨ CAREER GUIDANCE
            </p>
          </div>
          
          <h1 className="text-6xl font-bold leading-tight mb-8 text-gray-800">
            Where 
            <span className="relative mx-2 text-pink-600 inline-block hover:scale-105 transition-transform duration-300">
              Guidance
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-200 transform origin-left hover:scale-x-100 transition-transform duration-300"></span>
            </span> 
            Meets Your Career Aspirations
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            NEXT STEP empowers your career journey with expert guidance, personalized advice, and strategic planning to help you achieve your professional goals and take the next step in your career.
          </p>

          <div className="space-x-6">
            <button className="px-8 py-4 text-white bg-pink-500 rounded-xl shadow-lg hover:shadow-pink-200/50 
              hover:bg-pink-600 hover:-translate-y-1 transition-all duration-300">
              Explore Courses
              <span className="ml-2 inline-block hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="px-8 py-4 text-pink-500 bg-white/90 backdrop-blur-sm border-2 border-pink-500 
              rounded-xl shadow-lg hover:shadow-pink-200/50 hover:bg-pink-50 hover:-translate-y-1 transition-all duration-300">
              Talk to counsellor
              <span className="ml-2">📞</span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/5 mt-12 md:mt-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 to-purple-200/30 rounded-3xl 
            group-hover:from-pink-200/50 group-hover:to-purple-200/50 transition-all duration-300"></div>
          <img 
            src={inpageimg} 
            alt="Career Guidance" 
            className="w-full h-auto object-cover rounded-3xl shadow-2xl 
              group-hover:scale-[1.02] group-hover:shadow-xl transition-all duration-300 relative z-10"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-pink-200/20 to-purple-200/20 
            rounded-3xl -z-10 group-hover:scale-105 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
}

export default OnlineDegree;
