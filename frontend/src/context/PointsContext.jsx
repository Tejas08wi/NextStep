import React, { createContext, useContext, useState, useEffect } from 'react';

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  // Initialize points from localStorage or set to 0 for new users
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('userPoints');
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  // Reset all points and related data
  const resetPoints = () => {
    setPoints(0);
    localStorage.removeItem('userPoints');
    localStorage.removeItem('lastLoginDate');
    localStorage.removeItem('loginStreak');
    localStorage.removeItem('firstVisit');
    // Clear all completed activities
    Object.keys(localStorage)
      .filter(key => key.startsWith('completed_'))
      .forEach(key => localStorage.removeItem(key));
  };

  // Handle page refresh and first visit
  useEffect(() => {
    const handleFirstVisit = () => {
      const isFirstVisit = !localStorage.getItem('firstVisit');
      if (isFirstVisit) {
        localStorage.setItem('firstVisit', 'true');
        addPoints(1); // Award 1 point for first visit
      }
    };

    handleFirstVisit();
  }, []);

  const addPoints = (amount) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      localStorage.setItem('userPoints', newPoints.toString());
      return newPoints;
    });
  };

  // Track daily login streak
  const updateLoginStreak = () => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    const streak = parseInt(localStorage.getItem('loginStreak') || '0');

    if (lastLogin !== today) {
      if (lastLogin === new Date(Date.now() - 86400000).toDateString()) {
        // If last login was yesterday, increment streak
        const newStreak = streak + 1;
        localStorage.setItem('loginStreak', newStreak.toString());
        // Award bonus points for login streaks
        if (newStreak % 7 === 0) { // Weekly streak bonus
          addPoints(50);
        } else {
          addPoints(10); // Daily login bonus
        }
      } else {
        // Reset streak if a day was missed
        localStorage.setItem('loginStreak', '1');
        addPoints(10); // Daily login bonus
      }
      localStorage.setItem('lastLoginDate', today);
    }
  };

  // Track completed activities
  const hasCompletedActivity = (activityType, activityId) => {
    const completedActivities = JSON.parse(localStorage.getItem(`completed_${activityType}`) || '[]');
    return completedActivities.includes(activityId);
  };

  const markActivityCompleted = (activityType, activityId, points) => {
    if (!hasCompletedActivity(activityType, activityId)) {
      const completedActivities = JSON.parse(localStorage.getItem(`completed_${activityType}`) || '[]');
      completedActivities.push(activityId);
      localStorage.setItem(`completed_${activityType}`, JSON.stringify(completedActivities));
      addPoints(points);
      return true;
    }
    return false;
  };

  useEffect(() => {
    updateLoginStreak();
  }, []);

  return (
    <PointsContext.Provider value={{ 
      points, 
      addPoints,
      resetPoints,
      hasCompletedActivity,
      markActivityCompleted
    }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
