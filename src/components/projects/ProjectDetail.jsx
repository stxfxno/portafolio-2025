// src/components/projects/ProjectDetail.jsx
import React, { useState } from 'react';
import ProcessStageView from './ProcessStageView';

const ProjectDetail = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStage, setActiveStage] = useState(0);
  
  // Definir las etapas del proceso para este proyecto
  const processStages = project.process || [
    { name: 'Ideación', description: 'Fase inicial de conceptualización', artifacts: [] },
    { name: 'Diseño', description: 'Wireframes y prototipos', artifacts: [] },
    { name: 'Desarrollo', description: 'Implementación del código', artifacts: [] },
    { name: 'Pruebas', description: 'Control de calidad', artifacts: [] },
    { name: 'Despliegue', description: 'Publicación y distribución', artifacts: [] }
  ];
  
  // Determinar si hay etapas anteriores o siguientes
  const hasPrevStage = activeStage > 0;
  const hasNextStage = activeStage < processStages.length - 1;
  
  // Navegar entre etapas
  const goToPrevStage = () => {
    if (hasPrevStage) {
      setActiveStage(activeStage - 1);
    }
  };
  
  const goToNextStage = () => {
    if (hasNextStage) {
      setActiveStage(activeStage + 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Botón de regreso */}
      <div className="mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la galería
        </button>
      </div>
      
      {/* Cabecera del proyecto */}
      <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
            <p className="text-blue-200 mb-4">{project.description}</p>
            
            {/* Tecnologías */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-blue-900 bg-opacity-50 rounded-full text-sm text-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Enlaces */}
            <div className="flex space-x-3">
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded-md text-sm text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver Demo
                </a>
              )}
              {project.repo && (
                <a 
                  href={project.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Código Fuente
                </a>
              )}
            </div>
          </div>
          
          {/* Estado del proyecto */}
          <div className="flex flex-col items-end">
            <span className={`text-sm px-3 py-1 rounded-full font-medium mb-2 ${
              project.status === 'completed' ? 'bg-green-900 text-green-200' :
              project.status === 'in-progress' ? 'bg-yellow-900 text-yellow-200' :
              'bg-blue-900 text-blue-200'
            }`}>
              {project.status === 'completed' ? 'Completado' :
               project.status === 'in-progress' ? 'En Progreso' :
               'Concepto'}
            </span>
            <span className="text-blue-200 text-sm">{project.year}</span>
          </div>
        </div>
      </div>
      
      {/* Pestañas */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-4">
          <button 
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Resumen
          </button>
          <button 
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'process' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('process')}
          >
            Proceso de Desarrollo
          </button>
          <button 
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'challenges' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('challenges')}
          >
            Desafíos & Soluciones
          </button>
          <button 
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'learnings' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('learnings')}
          >
            Aprendizajes
          </button>
        </nav>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-grow overflow-auto">
        {/* Vista de Resumen */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Objetivos */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3">Objetivos del Proyecto</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <ul className="space-y-2">
                  {project.objectives ? project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>{objective}</span>
                    </li>
                  )) : (
                    <li className="text-gray-400">Información no disponible</li>
                  )}
                </ul>
              </div>
            </section>
            
            {/* Aspectos destacados */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3">Aspectos Destacados</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <ul className="space-y-2">
                  {project.highlights ? project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  )) : (
                    <li className="text-gray-400">Información no disponible</li>
                  )}
                </ul>
              </div>
            </section>
            
            {/* Roles */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3">Mi Rol</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p>{project.role || "Información no disponible"}</p>
                
                {project.responsibilities && (
                  <div className="mt-3">
                    <h4 className="font-medium text-gray-300 mb-2">Responsabilidades:</h4>
                    <ul className="space-y-1">
                      {project.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-purple-400 mr-2">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
        
        {/* Vista de Proceso */}
        {activeTab === 'process' && (
          <div className="space-y-6">
            {/* Indicador de etapas */}
            <div className="relative">
              <div className="flex justify-between mb-2">
                {processStages.map((stage, index) => (
                  <div 
                    key={index}
                    className={`relative flex flex-col items-center cursor-pointer z-10 ${
                      index <= activeStage ? 'text-blue-400' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveStage(index)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      index < activeStage ? 'bg-blue-500 border-blue-500' :
                      index === activeStage ? 'bg-gray-900 border-blue-500' :
                      'bg-gray-900 border-gray-700'
                    }`}>
                      {index < activeStage ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs mt-1 whitespace-nowrap">{stage.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Línea de progreso */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${(activeStage / (processStages.length - 1)) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Vista de la etapa actual */}
            <ProcessStageView 
              stage={processStages[activeStage]} 
              projectId={project.id}
            />
            
            {/* Controles de navegación */}
            <div className="flex justify-between pt-4">
              <button
                className={`px-4 py-2 rounded-md text-sm flex items-center ${
                  hasPrevStage 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
                onClick={goToPrevStage}
                disabled={!hasPrevStage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Etapa Anterior
              </button>
              
              <button
                className={`px-4 py-2 rounded-md text-sm flex items-center ${
                  hasNextStage 
                    ? 'bg-blue-600 text-white hover:bg-blue-500' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
                onClick={goToNextStage}
                disabled={!hasNextStage}
              >
                Siguiente Etapa
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Vista de Desafíos y Soluciones */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {project.challenges ? project.challenges.map((challenge, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-750 p-4 border-l-4 border-red-500">
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{challenge.description}</p>
                </div>
                <div className="p-4 border-l-4 border-green-500">
                  <h4 className="font-medium text-green-400 mb-2">Solución Implementada:</h4>
                  <p className="text-gray-300">{challenge.solution}</p>
                  
                  {challenge.code && (
                    <div className="mt-3 bg-gray-900 p-3 rounded-md">
                      <pre className="text-xs text-gray-300 overflow-x-auto">{challenge.code}</pre>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-400 py-8">
                No hay información disponible sobre los desafíos de este proyecto.
              </div>
            )}
          </div>
        )}
        
        {/* Vista de Aprendizajes */}
        {activeTab === 'learnings' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Principales Aprendizajes</h3>
              
              {project.learnings ? (
                <ul className="space-y-3">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="bg-gray-750 p-3 rounded-md">
                      <div className="flex">
                        <div className="text-yellow-400 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{learning.title}</h4>
                          <p className="text-gray-300 text-sm mt-1">{learning.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No hay información disponible sobre los aprendizajes de este proyecto.
                </div>
              )}
              
              {project.nextSteps && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Próximos Pasos</h3>
                  <ul className="space-y-2">
                    {project.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;