import React, { useEffect, useState } from 'react'
import session1 from './sessions/session1.png'
import session2 from './sessions/session2.jpg'
import session3 from './sessions/session3.jpg'
import session4 from './sessions/session4.jpg'
import session5 from './sessions/session5.png'
import session6 from './sessions/session6.jpg'
import { usePoints } from '../context/PointsContext'

function LiveSession() {
  const [liveSessions, setLiveSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState(new Set(JSON.parse(localStorage.getItem('joinedSessions')) || []));
  const { points, addPoints } = usePoints();

  useEffect(() => {
    fetchLiveSessions();
  }, []);

  useEffect(() => {
    localStorage.setItem('joinedSessions', JSON.stringify(Array.from(joinedSessions)));
  }, [joinedSessions]);

  const fetchLiveSessions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/livesession');
      const data = await response.json();
      setLiveSessions(data.liveSessions || []);
    } catch (error) {
      console.error('Error fetching live sessions:', error);
    }
  };

  const handleJoin = (sessionId) => {
    if (!joinedSessions.has(sessionId)) {
      const updatedSessions = new Set(joinedSessions);
      updatedSessions.add(sessionId);
      setJoinedSessions(updatedSessions);
      addPoints(10);

      const joinedSessionDetails = liveSessions.find(session => session._id === sessionId);
      const existingJoinedSessions = JSON.parse(localStorage.getItem('joinedLiveSessions')) || [];
      existingJoinedSessions.push(joinedSessionDetails);
      localStorage.setItem('joinedLiveSessions', JSON.stringify(existingJoinedSessions));
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {liveSessions.map((session, index) => (
        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="h-52 sm:h-48 overflow-hidden relative group">
            <img 
              src={session.photo || 'default-image-url.jpg'}
              alt={`Session ${index + 1}`} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6 space-y-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : session.status === 'Scheduled' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'}`}>
              {session.status}
            </span>
            <h3 className="font-bold text-xl text-gray-800">{session.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{session.description}</p>
            <p className="text-gray-500 text-sm">Start Date: {new Date(session.startTime).toLocaleString()}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/32?img=1" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                  <img src="https://i.pravatar.cc/32?img=2" className="w-8 h-8 rounded-full border-2 border-white" alt="participant" />
                </div>
                <span className="text-sm text-gray-500">+{Math.floor(Math.random() * 100)} joined</span>
              </div>
              <button 
                onClick={() => handleJoin(session._id)}
                className={`text-white px-3 py-1 rounded-lg transition duration-300 ${joinedSessions.has(session._id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                disabled={joinedSessions.has(session._id)}
              >
                {joinedSessions.has(session._id) ? 'Joined' : 'Join Now'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LiveSession