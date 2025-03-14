// src/components/workspace/Welcome.jsx
import React from 'react';

const Welcome = ({ openApp }) => {
  return (
    <div className="h-full flex flex-col p-6 text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-400">Bienvenido a Un Día Trabajando Conmigo</h1>
        <p className="text-lg text-gray-300">
          Experimenta de primera mano mi metodología de trabajo, explora mis proyectos y descubre mi proceso creativo.
        </p>
      </div>
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Sobre Este Portafolio</h2>
          <p className="text-gray-300 mb-4">
            A diferencia de un portafolio tradicional, he creado este espacio virtual interactivo para que puedas experimentar cómo trabajo y resuelvo problemas.
          </p>
          <p className="text-gray-300">
            Navega libremente por las diferentes herramientas y descubre mi enfoque, habilidades técnicas y proceso de desarrollo.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Para Empezar</h2>
          <p className="text-gray-300 mb-4">
            Puedes abrir cualquiera de las aplicaciones haciendo clic en los iconos del escritorio o usando los siguientes atajos:
          </p>
          <ul className="space-y-2">
            <li 
              className="flex items-center p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => openApp('terminal')}
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Terminal</h3>
                <p className="text-sm text-gray-400">Explora mi información y proyectos mediante comandos</p>
              </div>
            </li>
            <li 
              className="flex items-center p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => openApp('projects')}
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Proyectos</h3>
                <p className="text-sm text-gray-400">Visualiza mi portafolio y proceso de desarrollo</p>
              </div>
            </li>
            <li 
              className="flex items-center p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => openApp('code')}
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Code Playground</h3>
                <p className="text-sm text-gray-400">Experimenta con fragmentos de mi código</p>
              </div>
            </li>
            <li 
              className="flex items-center p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => openApp('bugtracker')}
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Bug Tracker</h3>
                <p className="text-sm text-gray-400">Observa cómo identifico y resuelvo problemas</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Mi Proceso de Trabajo</h2>
          <p className="text-gray-300 mb-4">
            Mi enfoque combina metodologías ágiles, calidad de código y atención al detalle:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Análisis profundo de requisitos y planificación cuidadosa</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Diseño de arquitecturas modulares y escalables</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Desarrollo iterativo con enfoque en código limpio y mantenible</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Testing riguroso y depuración sistemática</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Optimización continua de rendimiento y experiencia de usuario</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Contáctame</h2>
          <p className="text-gray-300 mb-4">
            Si te interesa mi perfil y quieres conocer más sobre mí o discutir oportunidades, estaré encantado de conversar:
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300">email@ejemplo.com</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-gray-300">linkedin.com/in/tuusuario</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-gray-300">github.com/tuusuario</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Este portafolio interactivo fue creado con React y Tailwind CSS. 
          Puedes explorar el código fuente en mi repositorio de GitHub.
        </p>
      </div>
    </div>
  );
};
a
export default Welcome;