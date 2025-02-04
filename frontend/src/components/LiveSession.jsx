import React from 'react'
import session1 from './sessions/session1.png'
import session2 from './sessions/session2.jpg'
import session3 from './sessions/session3.jpg'
import session4 from './sessions/session4.jpg'
import session5 from './sessions/session5.png'
import session6 from './sessions/session6.jpg'

function LiveSession() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Session Card 1 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-52 sm:h-48 overflow-hidden relative group">
          <img 
            src={session1}
            alt="Session 1" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Live Now</span>
          <h3 className="font-bold text-xl text-gray-800">Web Development Basics</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Learn HTML, CSS, and JavaScript fundamentals with hands-on projects and expert guidance.</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=1" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                <img src="https://i.pravatar.cc/32?img=2" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
              </div>
              <span className="text-sm text-gray-500">+28 joined</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <span>Join Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Session Card 2 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-52 sm:h-48 overflow-hidden relative group">
          <img 
            src={session2}
            alt="Session 2" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Starting Soon</span>
          <h3 className="font-bold text-xl text-gray-800">React Masterclass</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Advanced React patterns and best practices for modern web applications.</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=3" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                <img src="https://i.pravatar.cc/32?img=4" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
              </div>
              <span className="text-sm text-gray-500">+42 joined</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <span>Join Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Session Card 3 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-52 sm:h-48 overflow-hidden relative group">
          <img 
            src={session3}
            alt="Session 3" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Upcoming</span>
          <h3 className="font-bold text-xl text-gray-800">Node.js Backend</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Building scalable backend services with Node.js and Express.</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=5" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                <img src="https://i.pravatar.cc/32?img=6" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
              </div>
              <span className="text-sm text-gray-500">+35 joined</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <span>Join Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Session Card 4 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-52 sm:h-48 overflow-hidden relative group">
          <img 
            src={session4}
            alt="Session 4" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Featured</span>
          <h3 className="font-bold text-xl text-gray-800">UI/UX Design</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Master design principles and create stunning user experiences.</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=7" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                <img src="https://i.pravatar.cc/32?img=8" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
              </div>
              <span className="text-sm text-gray-500">+50 joined</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <span>Join Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Session Card 5 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-52 sm:h-48 overflow-hidden relative group">
          <img 
            src={session5}
            alt="Session 5" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Hot</span>
          <h3 className="font-bold text-xl text-gray-800">DevOps Essentials</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Learn CI/CD, Docker, and cloud deployment strategies.</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=9" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                <img src="https://i.pravatar.cc/32?img=10" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
              </div>
              <span className="text-sm text-gray-500">+45 joined</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <span>Join Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Session Card 6 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-52 sm:h-48 overflow-hidden relative group">
          <img 
            src={session6}
            alt="Session 6" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Popular</span>
          <h3 className="font-bold text-xl text-gray-800">Data Structures</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Master algorithms and problem-solving techniques.</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=11" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                <img src="https://i.pravatar.cc/32?img=12" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
              </div>
              <span className="text-sm text-gray-500">+38 joined</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <span>Join Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveSession