import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import Navbar from './Navbar';

const Profile = () => {
  const skillsChartRef = useRef(null);
  const progressChartRef = useRef(null);
  const streakChartRef = useRef(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [profileImage, setProfileImage] = useState(''); // Default image
  const [appliedJobs, setAppliedJobs] = useState(new Set(JSON.parse(localStorage.getItem('appliedJobs')) || []));
  const [jobDetails, setJobDetails] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState(JSON.parse(localStorage.getItem('appliedProjects')) || {});
  const [projectDetails, setProjectDetails] = useState([]);
  const [joinedLiveSessions, setJoinedLiveSessions] = useState([]);
  const [userName, setUserName] = useState('');
  const [joinedCourses, setJoinedCourses] = useState([]);

  useEffect(() => {
    let skillsChart = null;
    let progressChart = null;
    let streakChart = null;

    // Initialize charts only if the elements exist
    const skillsCtx = document.getElementById('skillsChart')?.getContext('2d');
    const progressCtx = document.getElementById('progressChart')?.getContext('2d');
    const streakCtx = document.getElementById('streakChart')?.getContext('2d');

    if (skillsCtx) {
      skillsChart = new Chart(skillsCtx, {
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
    }

    if (progressCtx) {
      progressChart = new Chart(progressCtx, {
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
    }

    if (streakCtx) {
      streakChart = new Chart(streakCtx, {
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
    }

    // Cleanup function
    return () => {
      if (skillsChart) {
        skillsChart.destroy();
      }
      if (progressChart) {
        progressChart.destroy();
      }
      if (streakChart) {
        streakChart.destroy();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const fetchAppliedJobDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobs');
        const data = await response.json();
        const appliedJobDetails = data.jobs.filter(job => appliedJobs.has(job._id));
        setJobDetails(appliedJobDetails);
      } catch (error) {
        console.error('Error fetching applied job details:', error);
      }
    };

    fetchAppliedJobDetails();
  }, [appliedJobs]);

  useEffect(() => {
    const fetchAppliedProjectDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects');
        const data = await response.json();
        const appliedProjects = JSON.parse(localStorage.getItem('appliedProjects')) || {};
        const appliedProjectDetails = data.projects.filter(project => appliedProjects[project._id]);
        setProjectDetails(appliedProjectDetails);
      } catch (error) {
        console.error('Error fetching applied project details:', error);
      }
    };

    fetchAppliedProjectDetails();
  }, []);

  useEffect(() => {
    const fetchJoinedLiveSessions = () => {
      const joinedSessions = JSON.parse(localStorage.getItem('joinedLiveSessions')) || [];
      setJoinedLiveSessions(joinedSessions);
    };

    const fetchUserName = () => {
      const user = localStorage.getItem('loggedInUser'); // Get the raw string
      console.log('Stored user data:', user); // Log the raw user data
      if (user) {
        try {
          const parsedUser = JSON.parse(user); // Parse the JSON string
          console.log('Parsed user data:', parsedUser); // Log the parsed user data
          setUserName(parsedUser.name); // Set the user name
          console.log('Username set to:', parsedUser.name); // Log the username being set
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    };

    fetchJoinedLiveSessions();
    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchJoinedCourses = () => {
      const joinedCourses = JSON.parse(localStorage.getItem('joinedCourses')) || [];
      setJoinedCourses(joinedCourses);
    };

    fetchJoinedCourses();
  }, []);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the uploaded image as the profile image
      };
      reader.readAsDataURL(file);
    }
  };

  console.log('Stored user data:', localStorage.getItem('loggedInUser'));
  console.log('Rendering Profile with username:', userName);

  return (
    <div className="bg-slate-50 min-h-screen text-gray-800">
      <Navbar/>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-16"> {/* Added mt-16 for top margin */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Welcome, {userName || 'User'}!
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-[1.02] duration-300">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-center p-8 relative">
                {/* File Upload Button */}
                <div className="flex justify-center mb-4"> {/* Added margin-bottom for spacing */}
                  <label className="flex items-center justify-center cursor-pointer">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                      Choose File
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" // Hide the default file input
                    />
                  </label>
                </div>
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white object-cover shadow-lg transform transition hover:rotate-6 duration-300 cursor-pointer"
                    src={profileImage} // Use the uploaded image
                    alt="student dp"
                    onMouseEnter={() => setShowFullImage(true)}
                    onMouseLeave={() => setShowFullImage(false)}
                  />
                  {showFullImage && (
                    <div className="absolute z-50 left-1/2 transform -translate-x-1/2 top-full mt-4">
                      <img 
                        src={profileImage} // Use the uploaded image
                        alt="Full size profile"
                        className="w-64 h-64 object-cover rounded-lg shadow-2xl border-4 border-white"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-white text-2xl font-bold mt-4">{userName}</h3>
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

        {/* Joined Live Sessions Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Joined Live Sessions</h2>
          <div className="space-y-4">
            {joinedLiveSessions.length > 0 ? (
              joinedLiveSessions.map((session) => (
                <div key={session._id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{session.title}</h3>
                  <p className="text-gray-600">{session.description}</p>
                  <p className="text-gray-500">Start Time: {new Date(session.startTime).toLocaleString()}</p>
                  <p className="text-gray-500">Status: {session.status}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No live sessions joined yet.</p>
            )}
          </div>
        </div>

        {/* Courses Joined Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Courses Joined</h2>
          <div className="space-y-4">
            {joinedCourses.length > 0 ? (
              joinedCourses.map((course) => (
                <div key={course._id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                  <p className="text-gray-500">Price: ₹{course.price}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No courses joined yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
        <div className="space-y-4">
          {jobDetails.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Applied Projects Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Applied Projects</h2>
        <div className="space-y-4">
          {projectDetails.length > 0 ? (
            projectDetails.map((project) => (
              <div key={project._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-gray-500">Skills: {(project.skills || []).join(', ')}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects applied yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
