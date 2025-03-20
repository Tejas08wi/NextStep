import React, { useState, useEffect } from 'react';
import { usePoints } from '../context/PointsContext';
// import Navbar from './Navbar';

const WeeklyAssessment = () => {
  const { addPoints } = usePoints();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [assessmentStatus, setAssessmentStatus] = useState({
    completed: false,
    nextAvailable: null,
    streak: 0
  });

  useEffect(() => {
    // Load assessment status from localStorage
    const savedStatus = localStorage.getItem('weeklyAssessmentStatus');
    if (savedStatus) {
      setAssessmentStatus(JSON.parse(savedStatus));
    }
  }, []);

  const skillCategories = [
    {
      name: 'Technical Skills',
      topics: ['Web Development', 'Data Structures', 'Algorithms', 'System Design']
    },
    {
      name: 'Soft Skills',
      topics: ['Communication', 'Leadership', 'Problem Solving', 'Time Management']
    },
    {
      name: 'Industry Knowledge',
      topics: ['Current Trends', 'Best Practices', 'Tools & Technologies', 'Career Paths']
    }
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const startAssessment = () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill to assess');
      return;
    }
    // Generate assessment questions based on selected skills
    const results = {
      score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
      skillScores: selectedSkills.map(skill => ({
        skill,
        score: Math.floor(Math.random() * 41) + 60,
        improvement: ['Practice more real-world projects', 'Take advanced courses', 'Join community discussions'][Math.floor(Math.random() * 3)]
      })),
      pointsEarned: 50,
      timestamp: new Date().toISOString()
    };

    setAssessmentResults(results);
    addPoints(results.pointsEarned);

    // Update assessment status
    const newStatus = {
      completed: true,
      nextAvailable: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      streak: assessmentStatus.streak + 1
    };
    setAssessmentStatus(newStatus);
    localStorage.setItem('weeklyAssessmentStatus', JSON.stringify(newStatus));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Weekly Skill Assessment</h1>
          <p className="text-xl text-gray-600">Track your progress and earn rewards</p>
        </div>

        {/* Assessment Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">Week</h3>
              <p className="text-3xl font-bold text-blue-600">{currentWeek}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">Streak</h3>
              <p className="text-3xl font-bold text-orange-500">{assessmentStatus.streak} weeks</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">Status</h3>
              <p className={`text-xl font-semibold ${assessmentStatus.completed ? 'text-green-500' : 'text-blue-500'}`}>
                {assessmentStatus.completed ? 'Completed' : 'Available'}
              </p>
            </div>
          </div>
        </div>

        {!assessmentResults && (
          <>
            {/* Skill Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Select Skills to Assess</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillCategories.map((category, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                    {category.topics.map((topic, topicIdx) => (
                      <div key={topicIdx} className="mb-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={selectedSkills.includes(topic)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSkills([...selectedSkills, topic]);
                              } else {
                                setSelectedSkills(selectedSkills.filter(s => s !== topic));
                              }
                            }}
                          />
                          <span>{topic}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={startAssessment}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={selectedSkills.length === 0}
                >
                  Start Assessment
                </button>
              </div>
            </div>
          </>
        )}

        {/* Assessment Results */}
        {assessmentResults && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Assessment Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Overall Performance</h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl font-bold text-blue-600">
                      {assessmentResults.score}%
                    </div>
                    <div className="text-gray-600">
                      <p>Points Earned: {assessmentResults.pointsEarned}</p>
                      <p>Date: {new Date(assessmentResults.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Skill Breakdown</h3>
                  <div className="space-y-4">
                    {assessmentResults.skillScores.map((skill, idx) => (
                      <div key={idx} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{skill.skill}</span>
                          <span className="text-blue-600 font-bold">{skill.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${skill.score}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Suggestion: {skill.improvement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Rewards Earned</h3>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold mb-2">🏆</div>
                    <div className="text-2xl font-bold mb-1">Congratulations!</div>
                    <p>You've earned rewards for completing this week's assessment</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/10 rounded p-3">
                      <span>Points Bonus</span>
                      <span className="font-bold">+{assessmentResults.pointsEarned}</span>
                    </div>
                    {assessmentResults.score >= 80 && (
                      <div className="flex items-center justify-between bg-white/10 rounded p-3">
                        <span>Excellence Badge</span>
                        <span className="font-bold">🌟</span>
                      </div>
                    )}
                    {assessmentStatus.streak >= 4 && (
                      <div className="flex items-center justify-between bg-white/10 rounded p-3">
                        <span>Monthly Streak Bonus</span>
                        <span className="font-bold">+100</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyAssessment;
