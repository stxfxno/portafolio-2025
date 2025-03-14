// src/data/bugsData.js
const bugsData = [
    {
      id: 'bug-001',
      title: 'Rendimiento de Lista en Dispositivos Móviles',
      description: 'La lista de productos se vuelve lenta al cargar más de 50 items en dispositivos móviles de gama media-baja, causando una experiencia de usuario deficiente.',
      status: 'solved',
      priority: 'high',
      createdAt: '2023-03-15T10:30:00Z',
      updatedAt: '2023-03-20T14:45:00Z',
      solvedAt: '2023-03-20T14:45:00Z',
      tags: ['rendimiento', 'mobile', 'UI', 'React'],
      stepsToReproduce: [
        'Navegar a la página de productos',
        'Aplicar filtros para mostrar más de 50 productos',
        'Observar el rendimiento al hacer scroll en un dispositivo móvil',
        'El tiempo de respuesta supera los 200ms y hay pérdida de frames'
      ],
      expectedBehavior: 'La lista debe mantener un scroll fluido (60fps) sin importar el número de productos mostrados.',
      actualBehavior: 'El scroll se vuelve entrecortado y hay un retraso visible al interactuar con la lista.',
      problematicCode: `// ProductList.jsx (versión original)
  import React, { useState, useEffect } from 'react';
  import ProductCard from './ProductCard';
  import { fetchProducts } from '../api/products';
  
  const ProductList = ({ filters }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getProducts = async () => {
        setLoading(true);
        const data = await fetchProducts(filters);
        setProducts(data);
        setLoading(false);
      };
  
      getProducts();
    }, [filters]);
  
    if (loading) return <div className="loading-spinner" />;
  
    return (
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={() => addToCart(product)}
            onAddToWishlist={() => addToWishlist(product)}
            onQuickView={() => openQuickView(product)}
          />
        ))}
      </div>
    );
  };
  
  export default ProductList;`,
      solution: {
        description: 'Se implementó virtualización de lista con react-window para renderizar solo los elementos visibles en pantalla, reduciendo la cantidad de nodos DOM y mejorando significativamente el rendimiento. También se optimizaron los componentes hijos utilizando React.memo y se redujeron las re-renderizaciones innecesarias.',
        fileName: 'ProductList.jsx',
        lineNumbers: '5-7, 12-35',
        code: `// ProductList.jsx (versión optimizada)
  import React, { useState, useEffect, useCallback } from 'react';
  import { FixedSizeGrid } from 'react-window';
  import AutoSizer from 'react-virtualized-auto-sizer';
  import ProductCard from './ProductCard';
  import { fetchProducts } from '../api/products';
  import useWindowSize from '../hooks/useWindowSize';
  
  const ProductList = ({ filters }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const windowSize = useWindowSize();
    
    // Determinar número de columnas basado en el ancho de la pantalla
    const getColumnCount = () => {
      if (windowSize.width < 640) return 1; // Móvil
      if (windowSize.width < 960) return 2; // Tablet
      if (windowSize.width < 1280) return 3; // Desktop pequeño
      return 4; // Desktop grande
    };
    
    const columnCount = getColumnCount();
    const rowCount = Math.ceil(products.length / columnCount);
    
    // Memoizar función para evitar re-renderizaciones
    const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
      const index = rowIndex * columnCount + columnIndex;
      
      if (index >= products.length) return null;
      
      const product = products[index];
      
      return (
        <div style={style}>
          <ProductCard 
            product={product}
            onAddToCart={() => addToCart(product)}
            onAddToWishlist={() => addToWishlist(product)}
            onQuickView={() => openQuickView(product)}
          />
        </div>
      );
    }, [products, columnCount]);
  
    useEffect(() => {
      const getProducts = async () => {
        setLoading(true);
        const data = await fetchProducts(filters);
        setProducts(data);
        setLoading(false);
      };
  
      getProducts();
    }, [filters]);
  
    if (loading) return <div className="loading-spinner" />;
  
    return (
      <div className="product-list-container" style={{ height: '80vh', width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeGrid
              className="product-grid"
              columnCount={columnCount}
              columnWidth={width / columnCount}
              height={height}
              rowCount={rowCount}
              rowHeight={350} // Altura fija para cada producto
              width={width}
            >
              {Cell}
            </FixedSizeGrid>
          )}
        </AutoSizer>
      </div>
    );
  };
  
  export default React.memo(ProductList);`,
        preventionStrategies: [
          'Implementar virtualización para listas largas desde el inicio del proyecto',
          'Establecer presupuestos de rendimiento y medirlos en dispositivos representativos',
          'Utilizar React.memo y useCallback para optimizar componentes con renderizado costoso',
          'Implementar lazy loading de imágenes y contenido fuera de pantalla'
        ]
      },
      thinkingProcess: {
        approach: 'Para resolver este problema de rendimiento, primero identifiqué la causa raíz mediante herramientas de profiling en dispositivos reales. Luego, investigué patrones de optimización para el caso específico de listas largas en React.',
        steps: [
          {
            title: 'Profiling inicial',
            description: 'Utilicé React DevTools Profiler y Chrome Performance para identificar los cuellos de botella durante el scroll.',
            result: 'Detecté que el problema principal era el número excesivo de nodos DOM siendo creados, actualizados y destruidos durante el scroll, especialmente en dispositivos con recursos limitados.'
          },
          {
            title: 'Investigación de técnicas de virtualización',
            description: 'Investigué diferentes enfoques para virtualización de listas en React, comparando bibliotecas como react-window, react-virtualized, y implementaciones personalizadas.',
            result: 'Decidí utilizar react-window por su simplicidad, pequeño tamaño y enfoque en rendimiento.'
          },
          {
            title: 'Implementación de prototipo',
            description: 'Desarrollé una versión prototipo del componente utilizando FixedSizeGrid para crear una cuadrícula virtual que solo renderiza los elementos visibles.',
            result: 'El prototipo mostró una mejora significativa en rendimiento, reduciendo el tiempo de renderizado en un 70%.'
          },
          {
            title: 'Optimización adicional',
            description: 'Apliqué optimizaciones adicionales como React.memo, useCallback para funciones handlers, y reduje el número de prop drilling.',
            result: 'Estas optimizaciones redujeron aún más las re-renderizaciones innecesarias y mejoraron la respuesta de la UI.'
          },
          {
            title: 'Pruebas en diferentes dispositivos',
            description: 'Realicé pruebas en diversos dispositivos para validar la solución, ajustando el número de columnas según el tamaño de pantalla.',
            result: 'La solución mantuvo un rendimiento consistente en todos los dispositivos probados, incluso con más de 500 productos.'
          }
        ],
        lessonsLearned: [
          'La virtualización es crucial para manejar listas largas, especialmente en dispositivos móviles',
          'La medición temprana del rendimiento en dispositivos reales puede prevenir problemas futuros',
          'Las herramientas de profiling son indispensables para identificar con precisión los cuellos de botella',
          'A veces es mejor reemplazar un enfoque por completo que intentar optimizar código problemático'
        ]
      },
      references: [
        {
          title: 'Documentación de react-window',
          url: 'https://react-window.vercel.app/',
          description: 'Guía oficial para implementar listas virtualizadas con react-window'
        },
        {
          title: 'Web Performance Optimization con React',
          url: 'https://reactjs.org/docs/optimizing-performance.html',
          description: 'Guía oficial de React sobre optimización de rendimiento'
        }
      ]
    },
    {
      id: 'bug-002',
      title: 'Memory Leak en Componente con Observable',
      description: 'Se detecta un memory leak en la aplicación cuando se navega entre páginas después de visitar el componente Dashboard que utiliza RxJS Observables para datos en tiempo real.',
      status: 'solved',
      priority: 'medium',
      createdAt: '2023-04-02T15:20:00Z',
      updatedAt: '2023-04-04T11:35:00Z',
      solvedAt: '2023-04-04T11:35:00Z',
      tags: ['memory-leak', 'RxJS', 'React', 'websocket'],
      stepsToReproduce: [
        'Navegar a la página Dashboard que muestra datos en tiempo real',
        'Permanecer en la página por al menos 10 segundos',
        'Navegar a otra página',
        'Repetir este proceso varias veces',
        'Abrir las DevTools y tomar un heap snapshot para observar el incremento de memoria'
      ],
      expectedBehavior: 'La memoria debe liberarse correctamente al desmontar el componente Dashboard.',
      actualBehavior: 'La memoria aumenta progresivamente cada vez que se visita y se abandona la página Dashboard, eventualmente causando lentitud en la aplicación.',
      problematicCode: `// Dashboard.jsx (con memory leak)
  import React, { useState, useEffect } from 'react';
  import { interval } from 'rxjs';
  import { map, startWith } from 'rxjs/operators';
  import { fetchDashboardData } from '../api/dashboard';
  
  const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [realtimeData, setRealtimeData] = useState([]);
    
    // Cargar datos iniciales
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchDashboardData();
        setStats(data);
      };
      
      loadData();
    }, []);
    
    // Configurar observable para datos en tiempo real
    useEffect(() => {
      // Crear un observable que emite cada 3 segundos
      const dataSubscription = interval(3000).pipe(
        startWith(0),
        map(() => {
          // Simular obtención de datos en tiempo real
          return {
            timestamp: new Date().toISOString(),
            value: Math.floor(Math.random() * 100)
          };
        })
      ).subscribe(newData => {
        setRealtimeData(prevData => [...prevData, newData].slice(-10));
      });
      
      // No hay cleanup function
    }, []);
    
    if (!stats) return <div>Cargando...</div>;
    
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="stats-grid">
          {/* Contenido del dashboard */}
        </div>
        <div className="realtime-chart">
          {/* Gráfico de datos en tiempo real */}
        </div>
      </div>
    );
  };
  
  export default Dashboard;`,
      solution: {
        description: 'Se corrigió el memory leak agregando una función de limpieza (cleanup) en el useEffect que maneja los Observables, para cancelar la suscripción cuando el componente se desmonta. También se optimizó el manejo de estado para evitar actualizaciones de estado en componentes desmontados.',
        fileName: 'Dashboard.jsx',
        lineNumbers: '21-32',
        code: `// Dashboard.jsx (corregido)
  import React, { useState, useEffect } from 'react';
  import { interval } from 'rxjs';
  import { map, startWith, take } from 'rxjs/operators';
  import { fetchDashboardData } from '../api/dashboard';
  
  const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [realtimeData, setRealtimeData] = useState([]);
    
    // Cargar datos iniciales
    useEffect(() => {
      let mounted = true;
      
      const loadData = async () => {
        try {
          const data = await fetchDashboardData();
          if (mounted) {
            setStats(data);
          }
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        }
      };
      
      loadData();
      
      // Cleanup function
      return () => {
        mounted = false;
      };
    }, []);
    
    // Configurar observable para datos en tiempo real
    useEffect(() => {
      // Crear un observable que emite cada 3 segundos
      const dataSubscription = interval(3000).pipe(
        startWith(0),
        map(() => {
          // Simular obtención de datos en tiempo real
          return {
            timestamp: new Date().toISOString(),
            value: Math.floor(Math.random() * 100)
          };
        })
      ).subscribe(newData => {
        setRealtimeData(prevData => [...prevData, newData].slice(-10));
      });
      
      // Añadir cleanup function para cancelar la suscripción
      return () => {
        dataSubscription.unsubscribe();
      };
    }, []);
    
    if (!stats) return <div>Cargando...</div>;
    
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="stats-grid">
          {/* Contenido del dashboard */}
        </div>
        <div className="realtime-chart">
          {/* Gráfico de datos en tiempo real */}
        </div>
      </div>
    );
  };
  
  export default Dashboard;`,
        preventionStrategies: [
          'Siempre incluir funciones de limpieza (cleanup) en useEffect cuando se trabaja con suscripciones',
          'Utilizar una variable de "montado" para evitar actualizaciones de estado en componentes desmontados',
          'Implementar un eslint personalizado para detectar useEffect sin función de retorno',
          'Realizar pruebas regulares de memoria usando las DevTools'
        ]
      },
      thinkingProcess: {
        approach: 'Al enfrentar este memory leak, utilicé un enfoque metódico para identificar, aislar y corregir la fuga de memoria en el componente que usa RxJS.',
        steps: [
          {
            title: 'Reproducción y verificación',
            description: 'Primero confirmé el memory leak utilizando las DevTools de Chrome y tomando snapshots de heap después de navegar varias veces por el componente.',
            result: 'Confirmé que el número de listeners y objetos Observable aumentaba progresivamente, indicando que las suscripciones no se estaban limpiando correctamente.'
          },
          {
            title: 'Revisión de código',
            description: 'Revisé el código del componente Dashboard buscando suscripciones que no fueran canceladas al desmontar el componente.',
            result: 'Identifiqué que el useEffect que configura el observable interval no tenía una función de limpieza para cancelar la suscripción.'
          },
          {
            title: 'Implementación de la solución',
            description: 'Añadí una función de retorno al useEffect para cancelar la suscripción cuando el componente se desmonta.',
            result: 'La suscripción ahora se cancela correctamente liberando los recursos.'
          },
          {
            title: 'Mejora adicional',
            description: 'También añadí una mejora para manejar el caso de actualizaciones de estado en componentes desmontados.',
            result: 'Usando una variable "mounted", evité que se actualice el estado después de que el componente ha sido desmontado.'
          },
          {
            title: 'Verificación final',
            description: 'Realicé pruebas adicionales para confirmar que la memoria se liberaba correctamente.',
            result: 'Los heapshots confirmaron que ya no había acumulación de memoria al navegar entre páginas.'
          }
        ],
        lessonsLearned: [
          'Siempre incluir funciones de limpieza en useEffect cuando se trabaja con suscripciones o temporizadores',
          'Los memory leaks pueden no ser evidentes inmediatamente y requieren pruebas específicas para detectarlos',
          'Es importante entender el ciclo de vida de los componentes React al trabajar con recursos externos',
          'Las bibliotecas reactivas como RxJS requieren atención especial para la gestión de recursos'
        ]
      },
      references: [
        {
          title: 'Documentación de useEffect',
          url: 'https://reactjs.org/docs/hooks-effect.html',
          description: 'Guía oficial sobre el correcto uso de useEffect y funciones de limpieza'
        },
        {
          title: 'Evitar memory leaks con RxJS',
          url: 'https://rxjs.dev/guide/subscription',
          description: 'Documentación oficial sobre manejo de suscripciones en RxJS'
        }
      ]
    },
    {
      id: 'bug-003',
      title: 'Inconsistencia en Estados de Autenticación',
      description: 'Los usuarios experimentan sesiones que expiran incorrectamente y estados de autenticación inconsistentes al navegar entre páginas o refrescar la aplicación.',
      status: 'in-progress',
      priority: 'high',
      progress: 75,
      createdAt: '2023-06-10T09:15:00Z',
      updatedAt: '2023-06-15T16:20:00Z',
      tags: ['autenticación', 'JWT', 'Estado', 'Context API'],
      stepsToReproduce: [
        'Iniciar sesión en la aplicación',
        'Navegar a diferentes páginas durante aproximadamente 15-20 minutos',
        'Observar cómo algunas páginas muestran estado de autenticado mientras otras redirigen al login',
        'Refrescar cualquier página puede causar pérdida de sesión incluso cuando el token JWT no ha expirado'
      ],
      expectedBehavior: 'La sesión del usuario debe mantenerse consistente en toda la aplicación mientras el token JWT sea válido, y debe refrescarse apropiadamente cuando está a punto de expirar.',
      actualBehavior: 'El estado de autenticación varía entre componentes, algunas partes de la aplicación muestran al usuario como autenticado mientras otras lo muestran como desconectado.',
      problematicCode: `// AuthContext.jsx (con problemas)
  import React, { createContext, useState, useContext } from 'react';
  import { login as apiLogin, logout as apiLogout } from '../api/auth';
  
  const AuthContext = createContext();
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const login = async (credentials) => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiLogin(credentials);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    const logout = async () => {
      try {
        await apiLogout();
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    };
    
    // No hay verificación del token al iniciar
    // No hay manejo de expiración del token
    // No hay refresh token
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          isAuthenticated: !!token,
          loading,
          error,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);`,
      thinkingProcess: {
        approach: 'Para resolver este problema con la autenticación, estoy implementando una solución robusta que maneja correctamente la inicialización, verificación, y renovación de tokens JWT.',
        steps: [
          {
            title: 'Análisis del problema',
            description: 'Identifiqué tres problemas principales: falta de verificación inicial del token, no decodificación del token para comprobar su validez, y ausencia de un mecanismo de refresco automático.',
            result: 'Comprendí que necesitamos una solución que maneje todo el ciclo de vida del token JWT y mantenga el estado sincronizado entre componentes.'
          },
          {
            title: 'Decodificación y validación de tokens',
            description: 'Implementé funciones para decodificar tokens JWT y verificar su expiración sin necesidad de llamadas al servidor para validaciones básicas.',
            result: 'Ahora podemos determinar rápidamente si un token ha expirado o está a punto de expirar.'
          },
          {
            title: 'Inicialización del estado de autenticación',
            description: 'Modifiqué el proveedor de autenticación para verificar el token almacenado durante la inicialización y cargar los datos del usuario si el token es válido.',
            result: 'El estado de autenticación se inicializa correctamente al cargar la aplicación o refrescar la página.'
          },
          {
            title: 'Implementación de token refresh',
            description: 'Añadí un mecanismo para refrescar automáticamente el token cuando está a punto de expirar y para manejar tokens inválidos.',
            result: 'Los tokens se refrescan en segundo plano, minimizando las interrupciones para el usuario.'
          }
        ],
        lessonsLearned: [
          'La autenticación basada en JWT requiere manejo cuidadoso tanto del lado del cliente como del servidor',
          'Es crucial verificar la validez de los tokens almacenados localmente antes de considerarlos válidos',
          'Implementar un mecanismo de refresco de tokens mejora significativamente la experiencia del usuario',
          'El almacenamiento consistente del estado de autenticación es fundamental para aplicaciones con múltiples rutas'
        ]
      }
    },
    {
      id: 'bug-004',
      title: 'Race Condition en Carga de Datos',
      description: 'Se produce una race condition cuando el usuario cambia rápidamente entre diferentes vistas que cargan datos de la API, causando que se muestren datos incorrectos o desactualizados.',
      status: 'open',
      priority: 'medium',
      createdAt: '2023-07-05T11:45:00Z',
      updatedAt: '2023-07-05T11:45:00Z',
      tags: ['async', 'data-fetching', 'race-condition', 'React'],
      stepsToReproduce: [
        'Navegar a la página de productos',
        'Cambiar rápidamente entre diferentes categorías o filtros',
        'Observar cómo ocasionalmente se muestran productos que no corresponden con el filtro o categoría seleccionada'
      ],
      expectedBehavior: 'Solo deben mostrarse los productos que corresponden con el filtro o categoría actualmente seleccionada, independientemente de la velocidad a la que el usuario cambie entre vistas.',
      actualBehavior: 'Ocasionalmente se muestran productos incorrectos debido a que respuestas más lentas de la API sobrescriben respuestas más recientes.',
      problematicCode: `// ProductCatalog.jsx (con race condition)
  import React, { useState, useEffect } from 'react';
  import ProductGrid from './ProductGrid';
  import { fetchProducts } from '../api/products';
  
  const ProductCatalog = ({ category, filters }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadProducts = async () => {
        setLoading(true);
        setError(null);
        
        try {
          // No hay mecanismo para cancelar solicitudes previas
          const data = await fetchProducts(category, filters);
          setProducts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      loadProducts();
    }, [category, filters]);
  
    if (loading) return <div className="loading-spinner" />;
    if (error) return <div className="error-message">{error}</div>;
    
    return <ProductGrid products={products} />;
  };
  
  export default ProductCatalog;`
    },
    {
      id: 'bug-005',
      title: 'Error de Accesibilidad en Formulario',
      description: 'El formulario de checkout no es accesible para usuarios que utilizan lectores de pantalla o navegan con teclado, incumpliendo estándares WCAG 2.1.',
      status: 'solved',
      priority: 'medium',
      createdAt: '2023-05-12T14:30:00Z',
      updatedAt: '2023-05-15T10:25:00Z',
      solvedAt: '2023-05-15T10:25:00Z',
      tags: ['accesibilidad', 'formularios', 'WCAG', 'a11y'],
      stepsToReproduce: [
        'Navegar al formulario de checkout con un lector de pantalla',
        'Intentar completar el formulario usando solo teclado',
        'Observar que algunos campos no tienen etiquetas adecuadas',
        'Notar que los mensajes de error no son anunciados por lectores de pantalla',
        'Comprobar que el orden de tabulación no es lógico'
      ],
      expectedBehavior: 'El formulario debe ser completamente accesible para usuarios con discapacidades visuales o motoras, cumpliendo con WCAG 2.1 nivel AA.',
      actualBehavior: 'Los usuarios con lectores de pantalla no pueden identificar correctamente los campos, los errores no se anuncian, y la navegación con teclado no sigue un orden lógico.',
      solution: {
        description: 'Se implementaron mejoras de accesibilidad incluyendo etiquetas adecuadas, atributos ARIA, manejo correcto de errores para lectores de pantalla, y se corrigió el orden de tabulación y estados de foco.',
        fileName: 'CheckoutForm.jsx',
        code: `// CheckoutForm.jsx (versión accesible)
  import React, { useState } from 'react';
  import { useForm } from 'react-hook-form';
  
  const CheckoutForm = ({ onSubmit }) => {
    const { register, handleSubmit, errors, formState } = useForm();
    const [submitting, setSubmitting] = useState(false);
    
    const onFormSubmit = async (data) => {
      setSubmitting(true);
      try {
        await onSubmit(data);
      } finally {
        setSubmitting(false);
      }
    };
    
    return (
      <form 
        onSubmit={handleSubmit(onFormSubmit)}
        aria-labelledby="checkout-title"
        noValidate
      >
        <h2 id="checkout-title" className="form-title">Checkout</h2>
        
        <div className="form-section" role="group" aria-labelledby="personal-info-title">
          <h3 id="personal-info-title">Información Personal</h3>
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              {...register('name', { required: 'Por favor, introduce tu nombre' })}
            />
            {errors.name && (
              <div 
                id="name-error" 
                className="form-error" 
                role="alert"
              >
                {errors.name.message}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              {...register('email', { 
                required: 'Por favor, introduce tu correo electrónico',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                  message: 'Dirección de correo inválida'
                }
              })}
            />
            {errors.email && (
              <div 
                id="email-error" 
                className="form-error" 
                role="alert"
              >
                {errors.email.message}
              </div>
            )}
          </div>
        </div>
        
        {/* Más campos del formulario... */}
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? 'Procesando...' : 'Completar Compra'}
          </button>
        </div>
      </form>
    );
  };
  
  export default CheckoutForm;`,
        preventionStrategies: [
          'Incluir pruebas automatizadas de accesibilidad con herramientas como Axe o Lighthouse',
          'Establecer una lista de verificación de accesibilidad para todos los nuevos componentes',
          'Realizar pruebas regulares con lectores de pantalla reales',
          'Capacitar al equipo en mejores prácticas de accesibilidad web'
        ]
      }
    }
  ];
  
  export default bugsData;