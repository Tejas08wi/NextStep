import React, { useState, useEffect } from 'react';
import { usePoints } from '../context/PointsContext';

const Referrals = () => {
  const { addPoints } = usePoints();
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referralHistory, setReferralHistory] = useState([]);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    pointsEarned: 0,
    activeReferrals: 0,
  });

  useEffect(() => {
    // Generate or retrieve referral code
    const userReferralCode = localStorage.getItem('referralCode') || generateReferralCode();
    setReferralCode(userReferralCode);
    if (!localStorage.getItem('referralCode')) {
      localStorage.setItem('referralCode', userReferralCode);
    }

    // Create referral link
    const baseUrl = window.location.origin;
    setReferralLink(`${baseUrl}/signup?ref=${userReferralCode}`);

    // Load referral history from localStorage
    const savedHistory = localStorage.getItem('referralHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setReferralHistory(history);
      
      // Calculate stats from history
      const totalRefs = history.length;
      const activeRefs = history.filter(ref => ref.status === 'Active').length;
      const earnedPoints = history.reduce((total, ref) => total + ref.points, 0);
      
      setReferralStats({
        totalReferrals: totalRefs,
        pointsEarned: earnedPoints,
        activeReferrals: activeRefs
      });
    } else {
      // Initialize with sample data if no history exists
      const sampleHistory = [
        {
          name: 'John Doe',
          date: '2025-02-15',
          status: 'Active',
          points: 100
        },
        {
          name: 'Jane Smith',
          date: '2025-02-16',
          status: 'Active',
          points: 100
        }
      ];
      localStorage.setItem('referralHistory', JSON.stringify(sampleHistory));
      setReferralHistory(sampleHistory);
      setReferralStats({
        totalReferrals: 2,
        pointsEarned: 200,
        activeReferrals: 2
      });
    }
  }, []);

  const generateReferralCode = () => {
    const username = localStorage.getItem('loggedInUser') || '';
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${username.substring(0, 3).toUpperCase()}${randomString}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Function to add new referral
  const addNewReferral = (referredUser) => {
    const newReferral = {
      name: referredUser,
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      points: 100
    };

    const updatedHistory = [...referralHistory, newReferral];
    setReferralHistory(updatedHistory);
    localStorage.setItem('referralHistory', JSON.stringify(updatedHistory));

    // Update stats
    setReferralStats(prev => ({
      totalReferrals: prev.totalReferrals + 1,
      pointsEarned: prev.pointsEarned + newReferral.points,
      activeReferrals: prev.activeReferrals + 1
    }));

    // Add points to user's total
    addPoints(newReferral.points);
  };

  // Function to handle referral status change
  const updateReferralStatus = (index, newStatus) => {
    const updatedHistory = [...referralHistory];
    const oldStatus = updatedHistory[index].status;
    updatedHistory[index].status = newStatus;
    
    setReferralHistory(updatedHistory);
    localStorage.setItem('referralHistory', JSON.stringify(updatedHistory));

    // Update active referrals count
    setReferralStats(prev => ({
      ...prev,
      activeReferrals: newStatus === 'Active' 
        ? prev.activeReferrals + 1 
        : prev.activeReferrals - 1
    }));
  };

  const referralTiers = [
    {
      level: 'Bronze',
      referrals: 3,
      rewards: ['200 bonus points', 'Access to exclusive webinars'],
      icon: '🥉'
    },
    {
      level: 'Silver',
      referrals: 5,
      rewards: ['500 bonus points', '1 free career counseling session'],
      icon: '🥈'
    },
    {
      level: 'Gold',
      referrals: 10,
      rewards: ['1000 bonus points', 'Premium course access for 1 month'],
      icon: '🥇'
    },
    {
      level: 'Diamond',
      referrals: 20,
      rewards: ['2000 bonus points', 'Lifetime premium features'],
      icon: '💎'
    }
  ];

  const getCurrentTier = () => {
    const totalRefs = referralStats.totalReferrals;
    return referralTiers.reduce((acc, tier) => {
      if (totalRefs >= tier.referrals) {
        return tier;
      }
      return acc;
    }, referralTiers[0]);
  };

  const getNextTier = () => {
    const currentTierIndex = referralTiers.findIndex(tier => 
      tier.referrals > referralStats.totalReferrals
    );
    return referralTiers[currentTierIndex];
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Invite Friends & Earn Rewards</h2>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Referrals</h3>
          <p className="text-3xl font-bold text-blue-600">{referralStats.totalReferrals}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Points Earned</h3>
          <p className="text-3xl font-bold text-green-600">{referralStats.pointsEarned}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Active Friends</h3>
          <p className="text-3xl font-bold text-purple-600">{referralStats.activeReferrals}</p>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Your Referral Code</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="w-full p-3 border rounded bg-white"
              />
              <button
                onClick={() => copyToClipboard(referralCode)}
                className="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full p-3 border rounded bg-white"
              />
              <button
                onClick={() => copyToClipboard(referralLink)}
                className="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Tiers */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Referral Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {referralTiers.map((tier, index) => (
            <div 
              key={tier.level}
              className={`p-4 rounded-lg border ${
                referralStats.totalReferrals >= tier.referrals
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-3xl mb-2">{tier.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{tier.level}</h4>
              <p className="text-sm text-gray-600 mb-2">{tier.referrals} referrals</p>
              <ul className="text-sm text-gray-700">
                {tier.rewards.map((reward, i) => (
                  <li key={i} className="mb-1">• {reward}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Progress to Next Tier */}
      {getNextTier() && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Progress to {getNextTier().level}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${(referralStats.totalReferrals / getNextTier().referrals) * 100}%`
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {referralStats.totalReferrals} / {getNextTier().referrals} referrals
          </p>
        </div>
      )}

      {/* Referral History */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Referrals</h3>
        
        {/* Add New Referral Form */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter friend's name"
              className="flex-1 p-2 border rounded"
              id="newReferralInput"
            />
            <button
              onClick={() => {
                const input = document.getElementById('newReferralInput');
                if (input.value.trim()) {
                  addNewReferral(input.value.trim());
                  input.value = '';
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Referral
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referralHistory.map((referral, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{referral.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{referral.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      referral.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{referral.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => updateReferralStatus(index, referral.status === 'Active' ? 'Inactive' : 'Active')}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        referral.status === 'Active'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {referral.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
