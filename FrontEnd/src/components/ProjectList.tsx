import React, { useState, useEffect, useRef } from 'react';
import * as FiIcons from 'react-icons/fi';
import IconWrapper from './IconWrapper';
import { fetchProjects, Project } from '../api/projects';
import { logoutAuth } from '../api/auth';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isScrollingLoading, setIsScrollingLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const LIMIT = 10;

  // Retrieve user details from localStorage
  const storedAuth = localStorage.getItem('auth');
  const user = storedAuth ? JSON.parse(storedAuth).user : null;

  const handleLogout = () => {
    logoutAuth();
    window.location.reload();
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadProjects = async (page: number) => {
    try {
      if (isLoading || isScrollingLoading || !hasMore) return;
      setIsScrollingLoading(true);
      
      const [newProjects] = await Promise.all([
        fetchProjects(page * LIMIT, LIMIT),
        sleep(1000), // wait at least 1 second
      ]);
  
      if (newProjects.length < LIMIT) {
        setHasMore(false);
      }
      setProjects((prev) => [...prev, ...newProjects]);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsScrollingLoading(false);
    }
  };
  
  useEffect(() => {
    setIsLoading(true);
    loadProjects(0).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isScrollingLoading) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          loadProjects(nextPage);
          return nextPage;
        });
      }
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [hasMore, isScrollingLoading]);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin mr-2 text-2xl">
          <IconWrapper>
            <FiIcons.FiLoader />
          </IconWrapper>
        </div>
        <span>Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-red-600">
        <div className="mr-2 text-2xl">
          <IconWrapper>
            <FiIcons.FiAlertCircle />
          </IconWrapper>
        </div>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 relative">
      {/* Header with Welcome message and Logout button */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">
          {user ? `Welcome, ${user.name || user.email}` : 'Welcome'}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </header>

      <h1 className="text-2xl font-bold text-center mb-8">Project List</h1>
      <div className="relative mb-6">
        <div className="absolute top-2 left-3 text-gray-400">
          <IconWrapper>
            <FiIcons.FiSearch />
          </IconWrapper>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search projects..."
          className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <li
            key={project.id}
            className="bg-white shadow-md rounded p-4 transition transform hover:scale-105 cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div ref={sentinelRef} className="mt-6">
          {isScrollingLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2 text-2xl">
                <IconWrapper>
                  <FiIcons.FiLoader />
                </IconWrapper>
              </div>
              <span>Loading more projects...</span>
            </div>
          ) : (
            <div className="h-12 flex items-center justify-center text-gray-600">
              Scroll down to load more...
            </div>
          )}
        </div>
      )}
      {selectedProject && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{selectedProject.name}</h2>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
