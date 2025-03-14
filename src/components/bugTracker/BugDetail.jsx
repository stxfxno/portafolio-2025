// src/components/bugTracker/BugDetail.jsx
import React, { useState } from 'react';

const BugDetail = ({ bug, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'solution', 'thinking'
  
  // Formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Obtener el color de la etiqueta de prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900 text-red-200';
      case 'medium':
        return 'bg-yellow-900 text-yellow-200';
      case 'low':
        return 'bg-green-900 text-green-200';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };
  
  // Obtener etiqueta según el estado
  const getStatusBadge = (status) => {
    switch (status) {
      case 'solved':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-900 text-green-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Resuelto
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-900 text-blue-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            En Progreso
          </span>
        );
      case 'open':
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-900 text-yellow-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Abierto
          </span>
        );
    }
  };

  if (!bug) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p>Selecciona un bug para ver sus detalles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Barra superior y navegación */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-400 hover:text-blue-300 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          
          <div className="md:hidden">
            {getStatusBadge(bug.status)}
          </div>
        </div>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">{bug.title}</h2>
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-sm px-2 py-1 rounded-full ${getPriorityColor(bug.priority)}`}>
              Prioridad: {bug.priority === 'high' ? 'Alta' : 
                         bug.priority === 'medium' ? 'Media' : 'Baja'}
            </span>
            
            <span className="hidden md:flex">
              {getStatusBadge(bug.status)}
            </span>
            
            <span className="text-sm text-gray-400">
              #{bug.id} | Creado: {formatDate(bug.createdAt)}
            </span>
          </div>
        </div>
        
        {/* Pestañas */}
        <div className="flex mt-6 border-b border-gray-700">
          <button 
            className={`pb-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'overview' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Descripción
          </button>
          <button 
            className={`pb-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'solution' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('solution')}
          >
            Solución
          </button>
          <button 
            className={`pb-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'thinking' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('thinking')}
          >
            Proceso Mental
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-grow overflow-auto p-4">
        {/* Vista de Descripción */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Descripción */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3">Descripción del Problema</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300 whitespace-pre-line">{bug.description}</p>
                
                {/* Etiquetas */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {bug.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Código con problemas */}
            {bug.problematicCode && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Código Problemático</h3>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-2 text-gray-300 text-sm font-medium border-b border-gray-700">
                    {bug.problematicFileName || 'script.js'}
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                    <code>{bug.problematicCode}</code>
                  </pre>
                </div>
              </section>
            )}
            
            {/* Pasos para reproducir */}
            {bug.stepsToReproduce && bug.stepsToReproduce.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Pasos para Reproducir</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2">
                    {bug.stepsToReproduce.map((step, index) => (
                      <li key={index} className="text-gray-300">{step}</li>
                    ))}
                  </ol>
                </div>
              </section>
            )}
            
            {/* Comportamiento esperado vs actual */}
            {(bug.expectedBehavior || bug.actualBehavior) && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Comportamiento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-300 mb-2">Comportamiento Esperado</h4>
                    <p className="text-gray-400">{bug.expectedBehavior || "No especificado"}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-300 mb-2">Comportamiento Actual</h4>
                    <p className="text-gray-400">{bug.actualBehavior || "No especificado"}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
        
        {/* Vista de Solución */}
        {activeTab === 'solution' && (
          <div className="space-y-6">
            {/* Estado de la solución */}
            <div className={`p-4 rounded-lg ${
              bug.status === 'solved' ? 'bg-green-900 bg-opacity-20 border border-green-800' :
              bug.status === 'in-progress' ? 'bg-blue-900 bg-opacity-20 border border-blue-800' :
              'bg-yellow-900 bg-opacity-20 border border-yellow-800'
            }`}>
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${
                  bug.status === 'solved' ? 'bg-green-900 text-green-200' :
                  bug.status === 'in-progress' ? 'bg-blue-900 text-blue-200' :
                  'bg-yellow-900 text-yellow-200'
                }`}>
                  {bug.status === 'solved' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : bug.status === 'in-progress' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    {bug.status === 'solved' ? '¡Bug Resuelto!' :
                     bug.status === 'in-progress' ? 'Solución en Progreso' :
                     'Pendiente de Solución'}
                  </h3>
                  <p className="text-gray-300 mt-1">
                    {bug.status === 'solved' ? 
                      `Este bug fue resuelto el ${formatDate(bug.solvedAt || bug.updatedAt)}` :
                     bug.status === 'in-progress' ? 
                      `Trabajando en la solución (${bug.progress || 0}% completado)` :
                      'Este bug aún no ha sido abordado'}
                  </p>
                </div>
              </div>
              
              {/* Barra de progreso para bugs en progreso */}
              {bug.status === 'in-progress' && (
                <div className="mt-3">
                  <div className="w-full bg-blue-900 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${bug.progress || 0}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Solución o planteamiento */}
            {bug.solution ? (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Solución Implementada</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-line mb-4">{bug.solution.description}</p>
                  
                  {/* Código de la solución */}
                  {bug.solution.code && (
                    <div className="bg-gray-750 rounded-lg overflow-hidden mt-3">
                      <div className="px-4 py-2 text-gray-300 text-sm font-medium border-b border-gray-700 flex justify-between">
                        <span>{bug.solution.fileName || 'fixed-script.js'}</span>
                        {bug.solution.lineNumbers && (
                          <span className="text-gray-500">Líneas modificadas: {bug.solution.lineNumbers}</span>
                        )}
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{bug.solution.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {/* Estrategias de prevención */}
                  {bug.solution.preventionStrategies && bug.solution.preventionStrategies.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-white mb-2">Estrategias de Prevención</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {bug.solution.preventionStrategies.map((strategy, index) => (
                          <li key={index} className="text-gray-300">{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            ) : (
              bug.status !== 'open' && (
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <p className="text-gray-400">La solución está en desarrollo y se documentará pronto.</p>
                </div>
              )
            )}
            
            {/* Referencias y recursos */}
            {bug.references && bug.references.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Referencias y Recursos</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {bug.references.map((ref, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-gray-300">
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {ref.title}
                          </a>
                          {ref.description && ` - ${ref.description}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>
        )}
        
        {/* Vista de Proceso Mental */}
        {activeTab === 'thinking' && (
          <div className="space-y-6">
            {/* Enfoque del debugging */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3">Mi Enfoque de Debugging</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300 whitespace-pre-line">
                  {bug.thinkingProcess?.approach || 
                   "Mi enfoque para resolver este bug comienza con la reproducción del problema, " +
                   "seguido de un análisis sistemático para identificar la causa raíz. " +
                   "Utilizando técnicas de depuración, examino el flujo de datos y el estado de la aplicación " +
                   "en varios puntos para localizar el origen del problema."}
                </p>
              </div>
            </section>
            
            {/* Pasos del proceso mental */}
            {bug.thinkingProcess?.steps && bug.thinkingProcess.steps.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Proceso Paso a Paso</h3>
                <div className="space-y-3">
                  {bug.thinkingProcess.steps.map((step, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="bg-blue-900 text-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{step.title}</h4>
                          <p className="text-gray-300">{step.description}</p>
                          
                          {/* Resultado del paso */}
                          {step.result && (
                            <div className="mt-2 p-3 bg-gray-750 rounded border border-gray-700">
                              <span className="text-gray-400 text-sm font-medium">Resultado:</span>
                              <p className="text-gray-300 mt-1">{step.result}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Lecciones aprendidas */}
            {bug.thinkingProcess?.lessonsLearned && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-3">Lecciones Aprendidas</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {bug.thinkingProcess.lessonsLearned.map((lesson, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </span>
                        <span className="text-gray-300">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};a

export default BugDetail;