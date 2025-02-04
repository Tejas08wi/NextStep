import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import Navbar from './Navbar';

const CareerCounselingProfile = () => {
  const skillsChartRef = useRef(null);
  const progressChartRef = useRef(null);
  const streakChartRef = useRef(null);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    // Destroy existing charts if they exist
    if (skillsChartRef.current) {
      skillsChartRef.current.destroy();
    }
    if (progressChartRef.current) {
      progressChartRef.current.destroy(); 
    }
    if (streakChartRef.current) {
      streakChartRef.current.destroy();
    }

    // Skills Pie Chart
    const skillsCtx = document.getElementById('skillsChart').getContext('2d');
    skillsChartRef.current = new Chart(skillsCtx, {
      type: 'pie',
      data: {
        labels: ['Technical Skills', 'Soft Skills', 'Leadership', 'Communication'],
        datasets: [{
          data: [30, 25, 20, 25],
          backgroundColor: [
            'rgba(66, 135, 245, 0.8)',
            'rgba(52, 211, 153, 0.8)', 
            'rgba(251, 146, 60, 0.8)',
            'rgba(167, 139, 250, 0.8)'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

    // Progress Line Chart
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    progressChartRef.current = new Chart(progressCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Learning Progress',
          data: [65, 72, 78, 85, 82, 90],
          borderColor: 'rgba(52, 211, 153, 1)',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(52, 211, 153, 0.1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });

    // Daily Streak Chart
    const streakCtx = document.getElementById('streakChart').getContext('2d');
    streakChartRef.current = new Chart(streakCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Daily Goals Completed',
          data: [4, 5, 3, 5, 4, 3, 4],
          backgroundColor: 'rgba(251, 146, 60, 0.8)',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (skillsChartRef.current) {
        skillsChartRef.current.destroy();
      }
      if (progressChartRef.current) {
        progressChartRef.current.destroy();
      }
      if (streakChartRef.current) {
        streakChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-gray-800">
      <Navbar/>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-16"> {/* Added mt-16 for top margin */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-[1.02] duration-300">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-center p-8 relative">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white object-cover shadow-lg transform transition hover:rotate-6 duration-300 cursor-pointer"
                    src="/img/suddha.jpg"
                    alt="student dp"
                    onMouseEnter={() => setShowFullImage(true)}
                    onMouseLeave={() => setShowFullImage(false)}
                  />
                  {showFullImage && (
                    <div className="absolute z-50 left-1/2 transform -translate-x-1/2 top-full mt-4">
                      <img 
                        src="/img/suddha.jpg" 
                        alt="Full size profile"
                        className="w-64 h-64 object-cover rounded-lg shadow-2xl border-4 border-white"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-white text-2xl font-bold mt-4">Suddhasatwa Das</h3>
                <p className="text-blue-100 mt-2">Aspiring Software Engineer</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-graduation-cap text-indigo-600"></i>
                  <p><span className="font-medium">Class:</span> 12 (Science)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-calendar text-indigo-600"></i>
                  <p><span className="font-medium">Pass Year:</span> 2024</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-award text-indigo-600"></i>
                  <p><span className="font-medium">Scores:</span> 10th - 93% | 12th - 92%</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-indigo-600"></i>
                  <p><span className="font-medium">Location:</span> Kolkata</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-phone text-indigo-600"></i>
                  <p><span className="font-medium">Contact:</span> 8617077929</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-envelope text-indigo-600"></i>
                  <a href="mailto:suddhasattwadas2016@gmail.com" className="text-blue-600 hover:underline">
                    suddhasattwadas2016@gmail.com
                  </a>
                </div>

                {/* Daily Streak Section */}
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-fire text-orange-500 text-xl animate-pulse"></i>
                      <span className="font-medium">Daily Streak</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-500">15 Days</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-coins text-yellow-500 text-xl animate-bounce"></i>
                      <span className="font-medium">Coins Earned</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-500">750</span>
                  </div>

                  {/* Daily Goals Progress */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Today's Goals</h4>
                    <canvas id="streakChart" className="w-full h-32"></canvas>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6 pt-4 border-t">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-gray-900 transform hover:scale-110 transition">
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transform hover:scale-110 transition">
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 transform hover:scale-110 transition">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
                <div className="text-indigo-600 text-3xl mb-2">
                  <i className="fas fa-briefcase"></i>
                </div>
                <p className="text-gray-600">Internships</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
                <div className="text-green-500 text-3xl mb-2">
                  <i className="fas fa-certificate"></i>
                </div>
                <p className="text-gray-600">Certifications</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
                <div className="text-orange-500 text-3xl mb-2">
                  <i className="fas fa-tasks"></i>
                </div>
                <p className="text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
                <div className="text-purple-500 text-3xl mb-2">
                  <i className="fas fa-trophy"></i>
                </div>
                <p className="text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Skills Distribution</h4>
                <canvas id="skillsChart"></canvas>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Learning Progress</h4>
                <canvas id="progressChart"></canvas>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg transform transition hover:scale-[1.01]">
                  <i className="fas fa-calendar-check text-indigo-600 text-xl"></i>
                  <div className="ml-4 flex-grow">
                    <p className="text-gray-800">Career Counseling Session</p>
                    <p className="text-sm text-gray-500">1 hour ago</p>
                  </div>
                  <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full">Completed</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg transform transition hover:scale-[1.01]">
                  <i className="fas fa-laptop-code text-indigo-600 text-xl"></i>
                  <div className="ml-4 flex-grow">
                    <p className="text-gray-800">Technical Workshop</p>
                    <p className="text-sm text-gray-500">3 hours ago</p>
                  </div>
                  <span className="px-3 py-1 text-sm text-yellow-600 bg-yellow-100 rounded-full">In Progress</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg transform transition hover:scale-[1.01]">
                  <i className="fas fa-project-diagram text-indigo-600 text-xl"></i>
                  <div className="ml-4 flex-grow">
                    <p className="text-gray-800">Project Submission</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                  <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCounselingProfile;
