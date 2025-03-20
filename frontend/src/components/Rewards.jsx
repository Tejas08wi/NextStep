import React, { useState } from 'react';
import { usePoints } from '../context/PointsContext';

const Rewards = () => {
  const { points, addPoints } = usePoints();
  const [message, setMessage] = useState('');

  const rewards = [
    { id: 1, name: 'Netflix 1 Month Subscription', points: 500, type: 'ott' },
    { id: 2, name: 'Amazon Prime 1 Month', points: 400, type: 'ott' },
    { id: 3, name: 'Disney+ 1 Month', points: 400, type: 'ott' },
    { id: 4, name: '10% Course Discount', points: 200, type: 'discount' },
    { id: 5, name: '25% Course Discount', points: 400, type: 'discount' },
    { id: 6, name: '50% Course Discount', points: 800, type: 'discount' },
  ];

  const handleRedeem = (reward) => {
    if (points >= reward.points) {
      addPoints(-reward.points); // Deduct points
      setMessage(`Successfully redeemed ${reward.name}! Check your email for the code.`);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(`Not enough points. You need ${reward.points - points} more points.`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Redeem Your Points</h2>
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-100 text-blue-800">
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
            <p className="text-gray-600 mb-3">{reward.points} Points</p>
            <button
              onClick={() => handleRedeem(reward)}
              disabled={points < reward.points}
              className={`w-full py-2 px-4 rounded ${
                points >= reward.points
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center text-gray-600">
        Your current balance: <span className="font-bold text-blue-600">{points} points</span>
      </div>
    </div>
  );
};

export default Rewards;
