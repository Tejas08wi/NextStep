import React, { useEffect, useState } from 'react';
import { usePoints } from '../context/PointsContext';

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set(JSON.parse(localStorage.getItem('enrolledCourses')) || []));
  const { addPoints } = usePoints();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/courses');
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(Array.from(enrolledCourses)));
  }, [enrolledCourses]);

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.has(courseId)) {
      const updatedEnrollments = new Set(enrolledCourses);
      updatedEnrollments.add(courseId);
      setEnrolledCourses(updatedEnrollments);
      addPoints(15);

      // Save course details to local storage
      const enrolledCourseDetails = courses.find(course => course._id === courseId);
      const existingJoinedCourses = JSON.parse(localStorage.getItem('joinedCourses')) || [];
      existingJoinedCourses.push(enrolledCourseDetails);
      localStorage.setItem('joinedCourses', JSON.stringify(existingJoinedCourses));
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row justify-between items-center px-4 md:px-10 lg:px-20 relative overflow-hidden animate-fadeIn pt-20 lg:pt-24">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Multi-layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-orange-100 opacity-90 animate-pulse"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 via-blue-200/20 to-emerald-100/30 animate-gradient-xy"></div>

        {/* Radial gradient accents */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-200/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Primary texture pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://images.unsplash.com/photo-1531685250784-7569952593d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRleHR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.4
        }}></div>

        {/* Secondary geometric pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='https://images.unsplash.com/photo-1531685250784-7569952593d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRleHR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bbb' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.3
        }}></div>
        
        {/* Decorative elements with varied sizes and opacities */}
        <div className="absolute top-10 -right-20 w-1/3 h-1/3 opacity-80 animate-float">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1995/1995539.png" 
            alt="Code"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 opacity-50 animate-float-delayed">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png"
            alt="Engineering"
            className="w-full h-full object-contain" 
          />
        </div>
        
        {/* topi : ) */}
        <div className="absolute top-5 left-0 w-1/3 h-1/3 opacity-55 animate-float">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1940/1940611.png"
            alt="Education"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Floating gold coins animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-float-coin"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2933/2933116.png"
                alt="Gold Coin"
                className="w-8 h-8 opacity-70"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content section - Enhanced */}
      <div className="w-full max-w-2xl text-left bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-xl shadow-2xl shadow-slate-500/30 z-10 hover:scale-105 transition-all duration-500 hover:shadow-blue-500/20 mt-4 lg:mt-0">
        <h1 className="text-3xl md:text-5xl text-gray-700 font-bold mb-4 md:mb-6">
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
            Level Up Your Skills
          </span>
          <div className="mt-2 md:mt-4 relative">
            <span className="font-serif italic text-blue-600">
              With AI-Powered Learning
              <span className="absolute -top-2 -right-6 text-2xl animate-bounce">✨</span>
            </span>
          </div>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 animate-fadeInUp leading-relaxed">
          Join <span className="font-bold text-blue-600">10,000+</span> developers who've transformed their careers through our intelligent learning platform.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button className="group relative px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl animate-shimmer">
            Start Learning Free
            <span className="absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-2 transition-transform">→</span>
          </button>
          
          <button className="group px-8 py-3 text-lg font-bold border-2 border-gray-700 text-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden relative">
            <span className="relative z-10 group-hover:text-white transition-colors">Watch Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </div>

        {/* Interactive Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "🚀", text: "AI-Powered Path", stat: "5x Faster" },
            { icon: "🎯", text: "Personalized", stat: "100% Custom" },
            { icon: "📈", text: "Success Rate", stat: "94%" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/50 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <div className="text-3xl group-hover:scale-125 transition-transform duration-300 mb-2">{feature.icon}</div>
              <div className="font-semibold text-gray-700">{feature.text}</div>
              <div className="text-blue-600 font-bold group-hover:scale-110 transition-transform">{feature.stat}</div>
            </div>
          ))}
        </div>

        {/* Premium Banner - Enhanced */}
        <div className="relative group overflow-hidden rounded-xl">
          <a 
            href="#pricing" 
            className="block p-6 bg-gradient-to-r from-yellow-100 to-orange-100 text-center relative z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-700"></div>
            <span className="relative inline-flex items-center gap-3 text-lg font-bold text-yellow-700">
              <span className="animate-bounce">💎</span>
              Special Launch Offer - Save 50% Today
              <span className="animate-bounce">💎</span>
            </span>
          </a>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </div>
      </div>

      {/* Right Section - Course Cards */}
      <div className="w-full max-w-2xl z-10 mt-8 lg:mt-0 lg:ml-8 flex flex-col h-[calc(100vh-120px)]">
        {/* Course Cards Grid - Adjusted for better fit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto pr-4 scroll-smooth flex-grow">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="group bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-white hover:to-blue-50 transform perspective-1000"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={course.photo}
                  alt={course.title} 
                  className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {course.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-blue-500 font-bold">₹{course.price}</span>
                <button 
                  onClick={() => handleEnroll(course._id)} 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${enrolledCourses.has(course._id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                  disabled={enrolledCourses.has(course._id)}
                >
                  {enrolledCourses.has(course._id) ? 'Enrolled' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="text-center mt-6 bg-white/80 backdrop-blur-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 sticky bottom-0">
          <button className="group px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden w-full sm:w-auto">
            <span className="relative z-10">Explore More Courses</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
