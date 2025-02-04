import '../global.css'
import React from 'react'

const ProjectCollab = () => {
  return (
    <div className="p-6 h-[36rem] overflow-y-auto scrollbar-hide space-y-6 bg-white border border-blue-500/50 rounded-b-2xl">
      {/* Project Cards - Updated with light purple background */}
      <div className="bg-purple-100 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">Frontend Developer Needed</h3>
          <span className="text-sm text-gray-500">Posted 2 days ago</span>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">Looking for a React expert for a 3-month project. Experience with Tailwind CSS and Redux required.</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">React</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">Redux</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">Remote</span>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group">
            <span>Apply Now</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-purple-100 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">Backend Developer Position</h3>
          <span className="text-sm text-gray-500">Posted 3 days ago</span>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">Seeking Node.js developer for building RESTful APIs. Knowledge of MongoDB and Express.js is a must.</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">Node.js</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">MongoDB</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">Hybrid</span>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group">
            <span>Apply Now</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-purple-100 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">UI/UX Designer Wanted</h3>
          <span className="text-sm text-gray-500">Posted 5 days ago</span>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">Looking for a creative designer to revamp our product interface. Figma proficiency required.</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">UI/UX</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">Figma</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">On-site</span>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group">
            <span>Apply Now</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-purple-100 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">Full Stack Developer</h3>
          <span className="text-sm text-gray-500">Posted 1 week ago</span>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">Seeking experienced full stack developer for an e-commerce project. MERN stack expertise required.</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">Full Stack</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">MERN</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">Remote</span>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group">
            <span>Apply Now</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCollab