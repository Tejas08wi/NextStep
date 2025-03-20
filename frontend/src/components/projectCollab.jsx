import '../global.css';
import React, { useState, useEffect } from 'react';
import { usePoints } from '../context/PointsContext';

const ProjectCollab = () => {
  const { markActivityCompleted } = usePoints();
  const [projects, setProjects] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState(() => {
    return JSON.parse(localStorage.getItem('appliedProjects')) || {};
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects');
        const data = await response.json();
        console.log('Fetched projects:', data);
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const handleApplyProject = (projectId) => {
    const updatedAppliedProjects = { ...appliedProjects, [projectId]: true };
    setAppliedProjects(updatedAppliedProjects);
    localStorage.setItem('appliedProjects', JSON.stringify(updatedAppliedProjects));
    setProjects((prev) =>
      prev.map((project) =>
        project._id === projectId ? { ...project, status: 'Applied' } : project
      )
    );

    // Call markActivityCompleted to update points
    markActivityCompleted('project_application', projectId, 15);
  };

  return (
    <div className="p-6 h-[36rem] overflow-y-auto scrollbar-hide space-y-6 bg-white border border-blue-500/50 rounded-b-2xl">
      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map((project) => (
          <div
            key={project._id}
            className="bg-purple-100 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {project.name}
              </h2>
              <span className="text-sm text-gray-500">Status: {project.status}</span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
            <p className="text-gray-500 mb-4">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-4">End Date: {new Date(project.endDate).toLocaleDateString()}</p>
            <p className="text-gray-600">{project.collaborationDetails || 'No collaboration details available.'}</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {(project.skills || []).map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      {
                        React: 'bg-blue-100 text-blue-600',
                        Redux: 'bg-purple-100 text-purple-600',
                        Remote: 'bg-teal-100 text-teal-600',
                        'Node.js': 'bg-green-100 text-green-600',
                        MongoDB: 'bg-yellow-100 text-yellow-600',
                        Hybrid: 'bg-teal-100 text-teal-600',
                        'UI/UX': 'bg-pink-100 text-pink-600',
                        Figma: 'bg-purple-100 text-purple-600',
                        'On-site': 'bg-teal-100 text-teal-600',
                        'Full Stack': 'bg-red-100 text-red-600',
                        MERN: 'bg-blue-100 text-blue-600',
                      }[skill]
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleApplyProject(project._id)}
                disabled={appliedProjects[project._id] || project.status === 'Applied'}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group ${
                  appliedProjects[project._id] || project.status === 'Applied'
                    ? 'bg-gray-400 text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <span>{appliedProjects[project._id] || project.status === 'Applied' ? 'Applied' : 'Apply Now'}</span>
                {!appliedProjects[project._id] && project.status !== 'Applied' && (
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects available.</p>
      )}
    </div>
  );
};

export default ProjectCollab;
