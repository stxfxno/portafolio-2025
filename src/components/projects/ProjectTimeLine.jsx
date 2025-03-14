// src/components/projects/ProjectTimeline.jsx
import React from 'react';

const ProjectTimeline = ({ projects, onSelectProject }) => {
  // Ordenar proyectos por año (más reciente primero)
  const sortedProjects = [...projects].sort((a, b) => {
    // Manejar casos donde el año podría ser un string o tener formato de fecha
    const yearA = typeof a.year === 'string' ? parseInt(a.year) : a.year;
    const yearB = typeof b.year === 'string' ? parseInt(b.year) : b.year;
    return yearB - yearA;
  });
  
  // Agrupar proyectos por año
  const projectsByYear = sortedProjects.reduce((acc, project) => {
    const year = typeof project.year === 'string' ? project.year : String(project.year);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});
  
  // Obtener años ordenados
  const years = Object.keys(projectsByYear).sort((a, b) => b - a);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-6">Mi Trayectoria de Proyectos</h2>
      
      <div className="relative pl-8">
        {/* Línea vertical de la cronología */}
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-700 ml-4"></div>
        
        {years.map((year, yearIndex) => (
          <div key={year} className="mb-8">
            {/* Año */}
            <div className="relative flex items-center mb-4">
              <div className="absolute left-0 -ml-4 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center z-10">
                <span className="text-xs font-bold text-white">{year}</span>
              </div>
              <h3 className="text-lg font-medium text-white ml-6">{year}</h3>
            </div>
            
            {/* Proyectos del año */}
            <div className="space-y-4">
              {projectsByYear[year].map((project, projectIndex) => (
                <div 
                  key={project.id} 
                  className="relative pl-6"
                >
                  {/* Punto del proyecto en la línea de tiempo */}
                  <div className="absolute left-0 top-3 -ml-1.5 w-3 h-3 rounded-full bg-gray-400"></div>
                  
                  {/* Tarjeta del proyecto */}
                  <div 
                    className="bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg overflow-hidden transition-all hover:shadow-md cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{project.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'completed' ? 'bg-green-900 text-green-200' :
                          project.status === 'in-progress' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-blue-900 text-blue-200'
                        }`}>
                          {project.status === 'completed' ? 'Completado' :
                           project.status === 'in-progress' ? 'En Progreso' :
                           'Concepto'}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{project.shortDescription}</p>
                      
                      {/* Tecnologías */}
                      <div className="flex flex-wrap gap-1">
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
                      
                      {/* Tiempo de duración */}
                      {project.duration && (
                        <div className="mt-3 text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {project.duration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;