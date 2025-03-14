// src/components/projects/ProjectViewer.jsx
import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import ProjectTimeline from './ProjectTimeline';
import projectsData from '../../data/projectsData';

const ProjectViewer = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery', 'detail', 'timeline'
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Obtener todas las tecnologías únicas para los filtros
  const allTechnologies = [...new Set(
    projectsData.flatMap(project => project.technologies)
  )].sort();
  
  // Filtrar proyectos según tecnología y término de búsqueda
  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = filter === 'all' || project.technologies.includes(filter);
    const matchesSearch = searchTerm === '' || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Cuando se selecciona un proyecto, cambiar a la vista de detalle
  useEffect(() => {
    if (selectedProject) {
      setViewMode('detail');
    }
  }, [selectedProject]);
  
  // Función para volver a la galería
  const handleBackToGallery = () => {
    setViewMode('gallery');
    setSelectedProject(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Barra de herramientas */}
      <div className="bg-gray-800 p-3 border-b border-gray-700 flex flex-wrap items-center gap-3">
        {/* Modos de visualización */}
        <div className="flex space-x-1 bg-gray-700 rounded-md p-1">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'gallery' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('gallery')}
          >
            Galería
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'timeline' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('timeline')}
          >
            Línea de Tiempo
          </button>
        </div>
        
        {/* Filtro por tecnología */}
        <div className="flex items-center space-x-2">
          <label htmlFor="tech-filter" className="text-sm text-gray-400">
            Tecnología:
          </label>
          <select
            id="tech-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas</option>
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
        
        {/* Búsqueda */}
        <div className="flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar proyectos..."
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-grow overflow-auto p-4">
        {viewMode === 'gallery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex items-center justify-center h-32 text-gray-400">
                No se encontraron proyectos con los filtros actuales.
              </div>
            )}
          </div>
        )}
        
        {viewMode === 'detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onBack={handleBackToGallery}
          />
        )}
        
        {viewMode === 'timeline' && (
          <ProjectTimeline 
            projects={filteredProjects} 
            onSelectProject={setSelectedProject}
          />
        )}
      </div>
    </div>
  );
};
a
export default ProjectViewer;