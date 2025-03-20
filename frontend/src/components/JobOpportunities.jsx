import React, { useEffect, useState } from 'react';
import { usePoints } from '../context/PointsContext';

function JobOpportunities() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set(JSON.parse(localStorage.getItem('appliedJobs')) || []));
  const { points, addPoints } = usePoints();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobs');
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(Array.from(appliedJobs)));
  }, [appliedJobs]);

  const handleApply = async (jobId) => {
    if (!appliedJobs.has(jobId)) {
      const updatedJobs = new Set(appliedJobs);
      updatedJobs.add(jobId);
      setAppliedJobs(updatedJobs);
      addPoints(10);

      // Send request to update job application status on the server
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/apply/${jobId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          console.error('Failed to update job application status');
        }
      } catch (error) {
        console.error('Error applying for job:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Job <span className="text-blue-500">Opportunities</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job._id} className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition duration-300 border border-gray-700 hover:border-blue-500">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-400 mb-4">{job.company}</p>
              <div className="mb-4">
                <span className="inline-block bg-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2">{job.type}</span>
                <span className="inline-block bg-green-500 px-3 py-1 rounded-full text-sm">{job.location}</span>
              </div>
              <p className="text-gray-300 mb-4">{job.description}</p>
              <button 
                onClick={() => handleApply(job._id)}
                className={`text-white px-4 py-2 rounded-lg w-full transition duration-300 ${appliedJobs.has(job._id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={appliedJobs.has(job._id)}
              >
                {appliedJobs.has(job._id) ? 'Applied' : 'Apply Now'}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition duration-300 text-lg">
            View More Opportunities
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobOpportunities;
