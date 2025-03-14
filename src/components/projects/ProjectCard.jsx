// src/components/projects/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer flex flex-col"
      onClick={() => onClick(project)}
    >
      {/* Imagen de portada */}
      <div className="h-40 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-blue-300 opacity-30">
              {/* Icono basado en el tipo de proyecto */}
              {project.type === 'web' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ) : project.type === 'mobile' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              )}
            </div>
          </div>
        )}
        
        {/* Badge de estado del proyecto */}
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            project.status === 'completed' ? 'bg-green-900 text-green-200' :
            project.status === 'in-progress' ? 'bg-yellow-900 text-yellow-200' :
            'bg-blue-900 text-blue-200'
          }`}>
            {project.status === 'completed' ? 'Completado' :
             project.status === 'in-progress' ? 'En Progreso' :
             'Concepto'}
          </span>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
        <p className="text-gray-400 text-sm mb-3 flex-grow">{project.shortDescription}</p>
        
        {/* Tecnologías */}
        <div className="flex flex-wrap gap-1 mt-2">
          {project.technologies.slice(0, 3).map(tech => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-850 border-t border-gray-700 px-4 py-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {project.year}
        </span>
        <div className="flex space-x-2">
          {project.repo && (
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;