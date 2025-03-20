import React, { useState, useEffect } from 'react';
import { usePoints } from '../context/PointsContext';

const Achievements = () => {
  const { points, addPoints } = usePoints();
  const [achievements, setAchievements] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const allAchievements = [
    {
      id: 1,
      title: 'Early Bird',
      description: 'Complete a quiz before 9 AM',
      points: 50,
      icon: '🌅',
      completed: false
    },
    {
      id: 2,
      title: 'Quiz Master',
      description: 'Score 100% in any quiz',
      points: 100,
      icon: '🎯',
      completed: false
    },
    {
      id: 3,
      title: 'Study Streak',
      description: 'Login for 7 consecutive days',
      points: 150,
      icon: '🔥',
      completed: false
    },
    {
      id: 4,
      title: 'Career Explorer',
      description: 'Visit all career paths',
      points: 75,
      icon: '🗺️',
      completed: false
    },
    {
      id: 5,
      title: 'Networking Pro',
      description: 'Connect with 5 other users',
      points: 100,
      icon: '🤝',
      completed: false
    }
  ];

  const dailyChallenges = [
    {
      id: 1,
      title: 'Quiz Champion',
      description: 'Complete 3 quizzes today',
      points: 30,
      icon: '📝'
    },
    {
      id: 2,
      title: 'Knowledge Seeker',
      description: 'Read 2 career articles',
      points: 25,
      icon: '📚'
    },
    {
      id: 3,
      title: 'Active Learner',
      description: 'Spend 30 minutes on learning',
      points: 35,
      icon: '⏱️'
    }
  ];

  useEffect(() => {
    // Load achievements from localStorage or initialize
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      setAchievements(allAchievements);
    }

    // Set daily challenge
    const today = new Date().toDateString();
    const lastChallenge = localStorage.getItem('lastDailyChallenge');
    if (lastChallenge !== today) {
      const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
      setDailyChallenge(randomChallenge);
      localStorage.setItem('lastDailyChallenge', today);
    }

    // Calculate level based on points
    const newLevel = Math.floor(points / 100) + 1;
    setLevel(newLevel);
    setXp(points % 100);
  }, [points]);

  const completeAchievement = (achievementId) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.id === achievementId && !achievement.completed) {
        addPoints(achievement.points);
        return { ...achievement, completed: true };
      }
      return achievement;
    });
    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
  };

  const completeDailyChallenge = () => {
    if (dailyChallenge) {
      addPoints(dailyChallenge.points);
      setDailyChallenge(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Level Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Level {level}</h2>
          <span className="text-sm text-gray-600">{xp}/100 XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${xp}%` }}
          ></div>
        </div>
      </div>

      {/* Daily Challenge */}
      {dailyChallenge && (
        <div className="mb-8 p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            Daily Challenge {dailyChallenge.icon}
          </h3>
          <p className="text-gray-700 mb-3">{dailyChallenge.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-yellow-600">
              +{dailyChallenge.points} points
            </span>
            <button
              onClick={completeDailyChallenge}
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
            >
              Complete
            </button>
          </div>
        </div>
      )}

      {/* Achievements */}
      <h3 className="text-xl font-bold mb-4">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`p-4 rounded-lg border ${
              achievement.completed 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-200 hover:border-blue-400'
            } transition-all duration-300`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  {achievement.icon} {achievement.title}
                </h4>
                <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-blue-600">
                  +{achievement.points} points
                </span>
                {!achievement.completed && (
                  <button
                    onClick={() => completeAchievement(achievement.id)}
                    className="block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
