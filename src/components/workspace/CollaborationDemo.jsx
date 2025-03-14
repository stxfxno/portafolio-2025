// src/components/workspace/CollaborationDemo.jsx
import React, { useState, useEffect } from 'react';

const CollaborationDemo = () => {
  const [activeTab, setActiveTab] = useState('conversation');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Ana (Diseñadora UI)', avatar: '👩‍🎨', status: 'online' },
    { id: 2, name: 'Carlos (Backend Dev)', avatar: '👨‍💻', status: 'away' },
    { id: 3, name: 'Sophia (PM)', avatar: '👩‍💼', status: 'online' },
    { id: 4, name: 'Tú', avatar: '😎', status: 'online' }
  ]);
  
  // Mensajes predefinidos para simular una conversación
  const predefinedMessages = [
    { id: 1, sender: 'Ana (Diseñadora UI)', avatar: '👩‍🎨', content: 'Hola equipo, he terminado los mockups para la página de checkout. ¿Pueden revisarlos?', time: '10:03 AM' },
    { id: 2, sender: 'Carlos (Backend Dev)', avatar: '👨‍💻', content: 'Claro, los revisaré esta tarde. Por cierto, la API de pagos ya está lista para integración.', time: '10:05 AM' },
    { id: 3, sender: 'Sophia (PM)', avatar: '👩‍💼', content: 'Genial equipo. @Frontend Dev, ¿crees que podrías empezar la implementación mañana?', time: '10:07 AM' }
  ];
  
  // Simular carga de mensajes inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(predefinedMessages);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simular respuesta automática cuando el usuario envía un mensaje
  const simulateResponse = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        { id: messages.length + 2, sender: 'Ana (Diseñadora UI)', avatar: '👩‍🎨', content: 'Me parece un gran enfoque. Podemos usar componentes reutilizables para mantener la consistencia.', time: getCurrentTime() },
        { id: messages.length + 2, sender: 'Carlos (Backend Dev)', avatar: '👨‍💻', content: 'Si necesitas ayuda con la integración de la API, avísame. Documenté todo el proceso.', time: getCurrentTime() },
        { id: messages.length + 2, sender: 'Sophia (PM)', avatar: '👩‍💼', content: 'Excelente plan. Agendemos una reunión para revisar el progreso a finales de semana.', time: getCurrentTime() }
      ];
      
      // Elegir una respuesta aleatoria
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prevMessages => [...prevMessages, randomResponse]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);
  };
  
  // Enviar un nuevo mensaje
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: 'Tú',
      avatar: '😎',
      content: newMessage,
      time: getCurrentTime()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    
    // Simular respuesta
    simulateResponse();
  };
  
  // Obtener hora actual formateada
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Barra superior */}
      <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Colaborador Virtual</h2>
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'conversation' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('conversation')}
          >
            Conversación
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'codeReview' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('codeReview')}
          >
            Code Review
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'pairProgramming' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('pairProgramming')}
          >
            Pair Programming
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-grow flex">
        {/* Lista de miembros del equipo */}
        <div className="w-64 bg-gray-850 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Miembros del Equipo</h3>
          </div>
          <div className="flex-grow overflow-auto">
            <ul>
              {teamMembers.map(member => (
                <li 
                  key={member.id}
                  className="flex items-center p-3 hover:bg-gray-800 cursor-pointer"
                >
                  <div className="relative">
                    <span className="text-2xl mr-3">{member.avatar}</span>
                    <span className={`absolute bottom-0 right-3 w-3 h-3 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' : 
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{member.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Área de contenido principal */}
        <div className="flex-grow flex flex-col">
          {/* Vista de Conversación */}
          {activeTab === 'conversation' && (
            <>
              {/* Mensajes */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'Tú' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                      message.sender === 'Tú' 
                        ? 'bg-blue-600 rounded-br-none' 
                        : 'bg-gray-700 rounded-bl-none'
                    }`}>
                      <div className="flex items-center mb-1">
                        <span className="mr-2">{message.avatar}</span>
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-xs text-gray-400 ml-2">{message.time}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {/* Indicador de escritura */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-lg rounded-bl-none p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Formulario de mensaje */}
              <div className="p-3 border-t border-gray-700">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </>
          )}
          
          {/* Vista de Code Review */}
          {activeTab === 'codeReview' && (
            <div className="flex-grow p-4">
              <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-750 px-4 py-2 text-sm font-medium border-b border-gray-700 flex justify-between items-center">
                  <span>components/checkout/PaymentForm.jsx</span>
                  <span className="text-xs bg-yellow-600 text-yellow-100 px-2 py-0.5 rounded-md">Pull Request #42</span>
                </div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                  <code>{`import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js no se ha cargado aún
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      
      if (error) {
        throw error;
      }
      
      // Aquí llamaríamos a nuestro backend para procesar el pago
      // const response = await api.processPayment({ paymentMethodId: paymentMethod.id, amount });
      
      // Simulamos una respuesta exitosa
      onPaymentSuccess({ id: paymentMethod.id });
    } catch (err) {
      console.error(err);
      setError(err.message);
      onPaymentError(err);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <label htmlFor="card-element">Tarjeta de Crédito o Débito</label>
        <div className="card-element-container">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="pay-button"
      >
        {processing ? 'Procesando...' : \`Pagar $\${amount}\`}
      </button>
    </form>
  );
};

export default PaymentForm;`}</code>
                </pre>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">👩‍🎨</span>
                    <div>
                      <p className="font-medium">Ana (Diseñadora UI)</p>
                      <p className="text-xs text-gray-400">Hace 2 horas</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">El formulario se ve bien, pero deberíamos añadir un indicador de nivel de seguridad para la contraseña y mejorar el feedback visual durante el procesamiento del pago.</p>
                  <div className="bg-gray-700 p-2 rounded-md text-xs">
                    <p>Sugerencia: Añadir un spinner o animación durante el procesamiento.</p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">👨‍💻</span>
                    <div>
                      <p className="font-medium">Carlos (Backend Dev)</p>
                      <p className="text-xs text-gray-400">Hace 1 hora</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">Hay un posible problema de seguridad aquí. No deberíamos mostrar el mensaje de error completo que viene de Stripe, mejor usar mensajes genéricos para el usuario.</p>
                  <div className="bg-gray-700 p-2 rounded-md text-xs">
                    <p>Línea 35: Cambiar para usar mensajes de error personalizados en lugar de <code>err.message</code> directamente.</p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">👩‍💼</span>
                    <div>
                      <p className="font-medium">Sophia (PM)</p>
                      <p className="text-xs text-gray-400">Hace 30 minutos</p>
                    </div>
                  </div>
                  <p className="text-sm">Estoy de acuerdo con los comentarios anteriores. Además, necesitamos añadir algún tipo de seguimiento para analíticas en cada paso del proceso de pago.</p>
                </div>
                
                <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4 border border-blue-700">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">😎</span>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <p className="font-medium">Tú</p>
                        <button className="text-xs text-blue-400 hover:text-blue-300">Editar</button>
                      </div>
                      <p className="text-xs text-gray-400">Justo ahora</p>
                    </div>
                  </div>
                  <p className="text-sm">Gracias por los comentarios. Implementaré los cambios sugeridos: añadiré un spinner durante el procesamiento, mejoraré el manejo de errores con mensajes personalizados, y agregaré eventos para analíticas.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Vista de Pair Programming */}
          {activeTab === 'pairProgramming' && (
            <div className="flex-grow flex flex-col">
              <div className="p-4 bg-gray-850 border-b border-gray-700">
                <h3 className="text-sm font-medium">Sesión de Pair Programming: Implementación de Autenticación con JWT</h3>
                <p className="text-xs text-gray-400 mt-1">Colaborando con: Carlos (Backend Dev)</p>
              </div>
              
              <div className="flex-grow flex">
                {/* Editor de código */}
                <div className="w-1/2 border-r border-gray-700">
                  <div className="bg-gray-750 px-4 py-2 text-sm font-medium border-b border-gray-700">
                    authService.js
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-auto h-full">
                    <code>{`import axios from 'axios';
import jwt_decode from 'jwt-decode';

// API URL
const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Almacenamiento de token
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Servicio de autenticación
const authService = {
  // Iniciar sesión
  login: async (credentials) => {
    try {
      const response = await axios.post(\`\${API_URL}/auth/login\`, credentials);
      const { token, refreshToken } = response.data;
      
      // Guardar tokens en localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      
      return {
        user: jwt_decode(token),
        token,
        refreshToken
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },
  
  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await axios.post(\`\${API_URL}/auth/register\`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      return false;
    }
    
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      
      // Verificar si el token no ha expirado
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  },
  
  // Obtener token
  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  // Obtener usuario actual
  getCurrentUser: () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      return token ? jwt_decode(token) : null;
    } catch (error) {
      return null;
    }
  },
  
  // TODO: Implementar refreshToken para renovar el token automáticamente
}`}</code>
                  </pre>
                </div>
                
                {/* Chat de pair programming */}
                <div className="w-1/2 flex flex-col">
                  <div className="flex-grow overflow-auto p-4 space-y-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">👨‍💻</span>
                        <span className="font-medium">Carlos (Backend Dev)</span>
                        <span className="text-xs text-gray-400 ml-2">10:15 AM</span>
                      </div>
                      <p className="text-sm">Vamos a trabajar en la implementación del refresh token. Necesitamos una función que detecte cuando un token está a punto de expirar y lo renueve automáticamente.</p>
                    </div>
                    
                    <div className="bg-blue-800 bg-opacity-40 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">😎</span>
                        <span className="font-medium">Tú</span>
                        <span className="text-xs text-gray-400 ml-2">10:17 AM</span>
                      </div>
                      <p className="text-sm">Estoy de acuerdo. Podría añadir una función refreshToken que verifique la expiración y haga la petición si es necesario. ¿Qué te parece usar un interceptor de Axios para manejar esto automáticamente?</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">👨‍💻</span>
                        <span className="font-medium">Carlos (Backend Dev)</span>
                        <span className="text-xs text-gray-400 ml-2">10:20 AM</span>
                      </div>
                      <p className="text-sm">Buena idea. Un interceptor sería ideal, así podemos manejar la renovación de tokens de forma transparente. Aquí hay un ejemplo de cómo podríamos implementarlo:</p>
                      <pre className="mt-2 bg-gray-750 p-2 rounded text-xs overflow-x-auto">
                        <code>{`// Crear un interceptor para renovar tokens
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (Unauthorized) y no estamos ya intentando renovar
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar renovar el token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const response = await axios.post(\`\${API_URL}/auth/refresh\`, {
          refreshToken
        });
        
        const { token } = response.data;
        localStorage.setItem(TOKEN_KEY, token);
        
        // Actualizar el header y reintentar la petición original
        axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
        originalRequest.headers['Authorization'] = \`Bearer \${token}\`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        // Si no se puede renovar, desloguear al usuario
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);`}</code>
                      </pre>
                    </div>
                    
                    <div className="bg-blue-800 bg-opacity-40 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">😎</span>
                        <span className="font-medium">Tú</span>
                        <span className="text-xs text-gray-400 ml-2">10:25 AM</span>
                      </div>
                      <p className="text-sm">Excelente sugerencia. Creo que deberíamos también implementar una verificación proactiva para tokens que están a punto de expirar, no solo esperar a que fallen. Así evitamos interrupciones en la experiencia del usuario.</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">👨‍💻</span>
                        <span className="font-medium">Carlos (Backend Dev)</span>
                        <span className="text-xs text-gray-400 ml-2">10:28 AM</span>
                      </div>
                      <p className="text-sm">Totalmente de acuerdo. Podríamos añadir una función que verifique la expiración antes de cada petición. Si el token expira en menos de X minutos, lo renovamos preventivamente.</p>
                      <p className="text-sm mt-2">¿Quieres implementar esa parte? Yo mientras prepararé los endpoints necesarios en el backend.</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-gray-700">
                    <form className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationDemo;