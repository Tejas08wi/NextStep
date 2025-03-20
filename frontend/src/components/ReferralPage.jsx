import React from 'react';
import Navbar from './Navbar';
import Achievements from './Achievements';
import Referrals from './Referrals';
import Rewards from './Rewards';

const ReferralPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Refer & Earn Rewards
          </h1>
          <p className="text-xl text-gray-600">
            Invite your friends to join NextStep and unlock amazing rewards together!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Referrals Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Referrals />
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Achievements />
          </div>

          {/* Rewards Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Rewards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
