// src/components/projects/ProcessStageView.jsx
import React, { useState } from 'react';

const ProcessStageView = ({ stage, projectId }) => {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  
  // Determinar qué iconos mostrar según el tipo de artefacto
  const getArtifactIcon = (type) => {
    switch (type) {
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'diagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Cabecera de la etapa */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
        <p className="text-gray-400 text-sm mt-1">{stage.description}</p>
      </div>
      
      <div className="p-5">
        {/* Descripción del proceso */}
        <div className="mb-5">
          <h4 className="font-medium text-gray-300 mb-2">Proceso de Trabajo:</h4>
          <p className="text-gray-400">
            {stage.processDescription || 
             `En esta etapa de ${stage.name.toLowerCase()}, me enfoco en comprender los requisitos, investigar soluciones y establecer la estructura básica de implementación.`}
          </p>
          
          {/* Lista de actividades realizadas */}
          {stage.activities && stage.activities.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-gray-300 mb-2">Actividades Realizadas:</h4>
              <ul className="space-y-2">
                {stage.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Artefactos producidos en esta etapa */}
        <div>
          <h4 className="font-medium text-gray-300 mb-3">Artefactos Producidos:</h4>
          
          {stage.artifacts && stage.artifacts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {stage.artifacts.map((artifact, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-md cursor-pointer transition-all ${
                    selectedArtifact === index 
                      ? 'border-blue-500 bg-gray-750' 
                      : 'border-gray-700 bg-gray-850 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedArtifact(index)}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-blue-400 mr-2">
                      {getArtifactIcon(artifact.type)}
                    </div>
                    <h5 className="font-medium text-gray-300 truncate">{artifact.name}</h5>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {artifact.description.length > 70 
                      ? artifact.description.substring(0, 70) + '...' 
                      : artifact.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-750 p-4 rounded-md text-center text-gray-400">
              No hay artefactos disponibles para esta etapa.
            </div>
          )}
        </div>
        
        {/* Vista detallada del artefacto seleccionado */}
        {selectedArtifact !== null && stage.artifacts && stage.artifacts[selectedArtifact] && (
          <div className="mt-6 bg-gray-850 border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">{stage.artifacts[selectedArtifact].name}</h4>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedArtifact(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-300 mb-4">{stage.artifacts[selectedArtifact].description}</p>
            
            {/* Render del contenido según el tipo */}
            <div className="mt-2">
              {stage.artifacts[selectedArtifact].type === 'image' && (
                <div className="bg-gray-900 p-2 rounded-md">
                  <img 
                    src={`/assets/projects/${projectId}/${stage.artifacts[selectedArtifact].url}`} 
                    alt={stage.artifacts[selectedArtifact].name} 
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
              
              {stage.artifacts[selectedArtifact].type === 'code' && (
                <div className="bg-gray-900 p-3 rounded-md overflow-x-auto">
                  <pre className="text-sm text-gray-300">{stage.artifacts[selectedArtifact].content}</pre>
                </div>
              )}
              
              {stage.artifacts[selectedArtifact].type === 'document' && (
                <div className="bg-gray-900 p-4 rounded-md">
                  <div className="prose prose-sm max-w-none text-gray-300">
                    {stage.artifacts[selectedArtifact].content}
                  </div>
                </div>
              )}
              
              {stage.artifacts[selectedArtifact].type === 'diagram' && (
                <div className="bg-gray-900 p-2 rounded-md">
                  <img 
                    src={`/assets/projects/${projectId}/${stage.artifacts[selectedArtifact].url}`} 
                    alt={stage.artifacts[selectedArtifact].name} 
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
              
              {/* Metadatos del artefacto */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Creado: {stage.artifacts[selectedArtifact].created || 'N/A'}</span>
                <span>Tipo: {stage.artifacts[selectedArtifact].type}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Decisiones clave tomadas en esta etapa */}
        {stage.decisions && stage.decisions.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-300 mb-3">Decisiones Clave:</h4>
            <div className="space-y-3">
              {stage.decisions.map((decision, index) => (
                <div key={index} className="bg-gray-750 p-3 rounded-md">
                  <h5 className="font-medium text-white mb-1">{decision.title}</h5>
                  <p className="text-gray-400 text-sm mb-2">{decision.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full">Impacto: {decision.impact}</span>
                    {decision.alternatives && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full">Alternativas: {decision.alternatives}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessStageView;