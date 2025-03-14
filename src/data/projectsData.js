// src/data/projectsData.js
const projectsData = [
    {
      id: 'ecommerce-app',
      name: 'E-Commerce Platform',
      shortDescription: 'Plataforma de comercio electrónico con React, Node.js y MongoDB',
      description: 'Una plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos, panel de administración y sistema de reseñas.',
      year: 2023,
      status: 'completed',
      type: 'web',
      technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'AWS'],
      repo: 'https://github.com/username/ecommerce-platform',
      demo: 'https://ecommerce-demo.example.com',
      image: '/assets/projects/ecommerce.jpg',
      highlights: [
        'Implementación de carrito de compras con persistencia mediante localStorage',
        'Integración de pasarela de pagos con Stripe',
        'Sistema de autenticación con JWT y Google OAuth',
        'Panel de administración para gestión de productos, categorías y pedidos',
        'Optimización de rendimiento con lazy loading y code splitting'
      ],
      objectives: [
        'Crear una plataforma de comercio electrónico escalable y mantenible',
        'Implementar una arquitectura modular que facilite futuras expansiones',
        'Asegurar una experiencia de usuario fluida y responsive en todos los dispositivos',
        'Integrar múltiples métodos de pago de forma segura',
        'Optimizar el rendimiento para mejorar tasas de conversión'
      ],
      role: 'Desarrollador Full Stack',
      responsibilities: [
        'Diseño de la arquitectura general del sistema',
        'Desarrollo del frontend con React y Redux',
        'Implementación de APIs RESTful con Node.js y Express',
        'Integración con servicios de terceros como Stripe y AWS',
        'Optimización de rendimiento y experiencia de usuario'
      ],
      process: [
        {
          name: 'Ideación',
          description: 'Fase inicial de conceptualización y planificación del proyecto',
          processDescription: 'En esta etapa, me enfoqué en comprender los requisitos del cliente, investigar soluciones existentes y definir el alcance del proyecto. Realicé un análisis competitivo para identificar oportunidades de diferenciación.',
          activities: [
            'Entrevistas con stakeholders para entender sus necesidades',
            'Análisis de competidores y benchmarking',
            'Definición de historias de usuario y casos de uso',
            'Creación de wireframes iniciales',
            'Planificación de la arquitectura técnica'
          ],
          artifacts: [
            {
              name: 'Documento de Requerimientos',
              description: 'Especificación detallada de los requisitos funcionales y no funcionales del sistema',
              type: 'document',
              created: '15 enero, 2023'
            },
            {
              name: 'Flujo de Usuario',
              description: 'Diagrama de flujo que representa la navegación del usuario a través del sistema',
              type: 'diagram',
              url: 'flow-diagram.jpg',
              created: '18 enero, 2023'
            }
          ],
          decisions: [
            {
              title: 'Selección de Stack Tecnológico',
              description: 'Decidí utilizar MERN stack (MongoDB, Express, React, Node.js) por su flexibilidad y ecosistema',
              impact: 'Alto',
              alternatives: 'LAMP, MEAN'
            },
            {
              title: 'Enfoque de Diseño UI/UX',
              description: 'Opté por un diseño minimalista con foco en la velocidad de carga y usabilidad móvil',
              impact: 'Alto'
            }
          ]
        },
        {
          name: 'Diseño',
          description: 'Creación de wireframes, mockups y definición de la arquitectura del sistema',
          processDescription: 'Durante la fase de diseño, traduje los requisitos en wireframes y mockups detallados. Definí la estructura de la base de datos, API endpoints, y diseñé la arquitectura del sistema para asegurar escalabilidad.',
          activities: [
            'Creación de wireframes de alta fidelidad',
            'Diseño de la estructura de la base de datos',
            'Definición de la arquitectura del sistema',
            'Planificación de API endpoints',
            'Creación de especificaciones técnicas'
          ],
          artifacts: [
            {
              name: 'Mockups de UI',
              description: 'Diseños de alta fidelidad de las principales interfaces de usuario',
              type: 'image',
              url: 'ui-mockups.jpg',
              created: '5 febrero, 2023'
            },
            {
              name: 'Diagrama de Base de Datos',
              description: 'Modelo entidad-relación de la estructura de datos del sistema',
              type: 'diagram',
              url: 'database-diagram.jpg',
              created: '10 febrero, 2023'
            },
            {
              name: 'Especificación de API',
              description: 'Documentación de los endpoints de la API, parámetros y respuestas',
              type: 'document',
              created: '15 febrero, 2023'
            }
          ],
          decisions: [
            {
              title: 'Modelo de Datos NoSQL',
              description: 'Elegí MongoDB como base de datos por su flexibilidad para modelar datos de productos',
              impact: 'Alto',
              alternatives: 'PostgreSQL, MySQL'
            },
            {
              title: 'Autenticación con JWT',
              description: 'Implementación de JWT para autenticación stateless en lugar de sesiones',
              impact: 'Medio',
              alternatives: 'Sesiones, OAuth exclusivo'
            }
          ]
        },
        {
          name: 'Desarrollo',
          description: 'Implementación del código para el frontend y backend',
          processDescription: 'La fase de desarrollo se centró en la implementación del código, siguiendo buenas prácticas de desarrollo y patrones de diseño. Trabajé con un enfoque iterativo, desarrollando características principales primero y refinando gradualmente.',
          activities: [
            'Configuración del entorno de desarrollo',
            'Implementación de la API backend',
            'Desarrollo del frontend con React',
            'Integración con servicios de terceros',
            'Revisiones de código y refactorización'
          ],
          artifacts: [
            {
              name: 'Componente de Carrito de Compras',
              description: 'Implementación del componente de carrito con persistencia en localStorage',
              type: 'code',
              content: `// src/components/Cart/CartProvider.jsx
  import React, { createContext, useReducer, useEffect } from 'react';
  import cartReducer from './cartReducer';
  
  export const CartContext = createContext();
  
  const CartProvider = ({ children }) => {
    // Cargar estado inicial desde localStorage
    const initialState = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : { items: [], total: 0, itemCount: 0 };
  
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    // Persistir cambios en localStorage
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);
  
    // Añadir item al carrito
    const addToCart = (product, quantity = 1) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product, quantity }
      });
    };
  
    // Remover item del carrito
    const removeFromCart = (productId) => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: productId
      });
    };
  
    // Actualizar cantidad
    const updateQuantity = (productId, quantity) => {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity }
      });
    };
  
    // Limpiar carrito
    const clearCart = () => {
      dispatch({ type: 'CLEAR_CART' });
    };
  
    return (
      <CartContext.Provider
        value={{
          cart: state,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export default CartProvider;`,
              created: '10 marzo, 2023'
            },
            {
              name: 'API de Productos',
              description: 'Implementación de endpoints RESTful para productos',
              type: 'code',
              content: `// src/controllers/productController.js
  const Product = require('../models/Product');
  const asyncHandler = require('express-async-handler');
  
  // @desc    Fetch all products
  // @route   GET /api/products
  // @access  Public
  const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
  
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  });
  
  // @desc    Fetch single product
  // @route   GET /api/products/:id
  // @access  Public
  const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
  
  // @desc    Create a product
  // @route   POST /api/products
  // @access  Private/Admin
  const createProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;
  
    const product = new Product({
      name,
      price,
      user: req.user._id,
      image,
      brand,
      category,
      countInStock,
      description,
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });
  
  module.exports = {
    getProducts,
    getProductById,
    createProduct,
  };`,
              created: '20 marzo, 2023'
            }
          ],
          decisions: [
            {
              title: 'Implementación de Redux',
              description: 'Decidí usar Redux para la gestión de estado global en lugar de Context API',
              impact: 'Alto',
              alternatives: 'Context API, MobX'
            },
            {
              title: 'Estructura de Carpetas por Característica',
              description: 'Organización del código por características en lugar de por tipo de archivo',
              impact: 'Medio'
            }
          ]
        },
        {
          name: 'Pruebas',
          description: 'Testing y aseguramiento de calidad',
          processDescription: 'La fase de pruebas incluyó pruebas unitarias, de integración y end-to-end para asegurar la calidad del código y la funcionalidad del sistema. Implementé un enfoque de TDD para componentes críticos.',
          activities: [
            'Escritura de pruebas unitarias con Jest',
            'Pruebas de integración para flujos principales',
            'Pruebas end-to-end con Cypress',
            'Análisis de rendimiento y optimización',
            'Revisión de seguridad'
          ],
          artifacts: [
            {
              name: 'Pruebas Unitarias de Carrito',
              description: 'Suite de pruebas para el reducer y contexto del carrito',
              type: 'code',
              content: `// src/components/Cart/__tests__/cartReducer.test.js
  import cartReducer from '../cartReducer';
  
  describe('Cart Reducer', () => {
    const initialState = {
      items: [],
      total: 0,
      itemCount: 0
    };
  
    const sampleProduct = {
      _id: '123',
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    };
  
    test('should return initial state', () => {
      expect(cartReducer(undefined, {})).toEqual(initialState);
    });
  
    test('should handle ADD_TO_CART for new item', () => {
      const action = {
        type: 'ADD_TO_CART',
        payload: { product: sampleProduct, quantity: 1 }
      };
  
      const expectedState = {
        items: [
          {
            product: sampleProduct,
            quantity: 1,
            total: 99.99
          }
        ],
        total: 99.99,
        itemCount: 1
      };
  
      expect(cartReducer(initialState, action)).toEqual(expectedState);
    });
  
    test('should handle ADD_TO_CART for existing item', () => {
      const currentState = {
        items: [
          {
            product: sampleProduct,
            quantity: 1,
            total: 99.99
          }
        ],
        total: 99.99,
        itemCount: 1
      };
  
      const action = {
        type: 'ADD_TO_CART',
        payload: { product: sampleProduct, quantity: 2 }
      };
  
      const expectedState = {
        items: [
          {
            product: sampleProduct,
            quantity: 3,
            total: 299.97
          }
        ],
        total: 299.97,
        itemCount: 3
      };
  
      expect(cartReducer(currentState, action)).toEqual(expectedState);
    });
  
    test('should handle REMOVE_FROM_CART', () => {
      const currentState = {
        items: [
          {
            product: sampleProduct,
            quantity: 2,
            total: 199.98
          }
        ],
        total: 199.98,
        itemCount: 2
      };
  
      const action = {
        type: 'REMOVE_FROM_CART',
        payload: '123'
      };
  
      expect(cartReducer(currentState, action)).toEqual(initialState);
    });
  });`,
              created: '15 abril, 2023'
            },
            {
              name: 'Informe de Rendimiento',
              description: 'Análisis de rendimiento y optimizaciones implementadas',
              type: 'document',
              created: '25 abril, 2023'
            }
          ],
          decisions: [
            {
              title: 'Estrategia de Testing',
              description: 'Implementación de pruebas automatizadas para componentes críticos y flujos principales',
              impact: 'Alto'
            },
            {
              title: 'Implementación de Lazy Loading',
              description: 'Carga diferida de componentes y recursos para mejorar el tiempo de carga inicial',
              impact: 'Alto'
            }
          ]
        },
        {
          name: 'Despliegue',
          description: 'Publicación y monitorización en producción',
          processDescription: 'El despliegue incluyó la configuración de infraestructura en AWS, implementación de CI/CD, y monitorización de rendimiento y errores en producción.',
          activities: [
            'Configuración de infraestructura en AWS',
            'Implementación de pipeline CI/CD',
            'Configuración de DNS y SSL',
            'Despliegue en producción',
            'Monitorización y resolución de problemas post-lanzamiento'
          ],
          artifacts: [
            {
              name: 'Configuración de Infraestructura',
              description: 'Configuración de AWS para host del proyecto',
              type: 'document',
              created: '10 mayo, 2023'
            },
            {
              name: 'Pipeline CI/CD',
              description: 'Configuración de integración y despliegue continuo',
              type: 'code',
              content: `# .github/workflows/deploy.yml
  name: Deploy
  
  on:
    push:
      branches: [ main ]
  
  jobs:
    deploy:
      runs-on: ubuntu-latest
      
      steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to AWS
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-west-2'
          SOURCE_DIR: 'build'
          
      - name: Invalidate CloudFront
        uses: chetan/invalidate-cloudfront-action@master
        env:
          DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
          PATHS: '/*'
          AWS_REGION: 'us-west-2'
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}`,
              created: '15 mayo, 2023'
            }
          ],
          decisions: [
            {
              title: 'Arquitectura Serverless',
              description: 'Despliegue de backend como funciones Lambda para optimizar costos y escalabilidad',
              impact: 'Alto',
              alternatives: 'EC2, ECS'
            },
            {
              title: 'CDN para Contenido Estático',
              description: 'Uso de CloudFront para distribución de assets estáticos y mejora de rendimiento global',
              impact: 'Medio'
            }
          ]
        }
      ],
      challenges: [
        {
          title: 'Optimización de Rendimiento en Móviles',
          description: 'El rendimiento en dispositivos móviles de gama baja era significativamente peor que en desktop, afectando la experiencia de usuario.',
          solution: 'Implementé code splitting, lazy loading de componentes, y optimicé las imágenes con diferentes tamaños según el dispositivo. También reduje el tamaño del bundle principal mediante tree shaking y eliminación de dependencias innecesarias.'
        },
        {
          title: 'Manejo de Estado Complejo',
          description: 'La gestión de estado se volvió compleja con múltiples niveles de componentes necesitando acceso a datos compartidos.',
          solution: 'Reorganicé la arquitectura de estado utilizando Redux con un enfoque de "duck pattern" para modularizar por características. Implementé selectores memoizados con Reselect para mejorar el rendimiento y middleware personalizado para acciones asíncronas.',
          code: `// src/features/cart/cartSlice.js
  import { createSlice, createSelector } from '@reduxjs/toolkit';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItemStart(state) {
        state.loading = true;
      },
      addItemSuccess(state, action) {
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.product._id === product._id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.total = existingItem.quantity * existingItem.product.price;
        } else {
          state.items.push({
            product,
            quantity,
            total: quantity * product.price
          });
        }
        
        state.loading = false;
        state.error = null;
      },
      addItemFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      }
      // Otros reducers...
    }
  });
  
  // Actions
  export const { addItemStart, addItemSuccess, addItemFailure } = cartSlice.actions;
  
  // Thunk
  export const addToCart = (product, quantity) => async (dispatch) => {
    try {
      dispatch(addItemStart());
      // Aquí iría una llamada API si necesitamos persistir en servidor
      dispatch(addItemSuccess({ product, quantity }));
    } catch (error) {
      dispatch(addItemFailure(error.message));
    }
  };
  
  // Selectors
  export const selectCartItems = state => state.cart.items;
  export const selectCartTotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.total, 0)
  );
  export const selectCartItemCount = createSelector(
    [selectCartItems],
    (items) => items.reduce((count, item) => count + item.quantity, 0)
  );
  
  export default cartSlice.reducer;`
        },
        {
          title: 'Integración de Pasarela de Pagos',
          description: 'La integración con Stripe presentaba problemas en el manejo de errores y la compatibilidad entre frontend y backend.',
          solution: 'Desarrollé una capa de abstracción que normalizaba las respuestas de Stripe, manejaba reintentos automáticos, y proporcionaba feedback claro al usuario. Implementé un sistema de webhooks para manejar eventos asincrónicos de pagos.'
        }
      ],
      learnings: [
        {
          title: 'Arquitectura por Características',
          description: 'Aprendí que organizar el código por características en lugar de por tipo de archivo mejora la mantenibilidad y escalabilidad, especialmente en proyectos grandes.'
        },
        {
          title: 'Pruebas Automatizadas',
          description: 'La implementación de pruebas automatizadas desde el inicio del proyecto redujo significativamente el número de bugs en producción y facilitó refactorizaciones seguras.'
        },
        {
          title: 'Optimización de Rendimiento',
          description: 'Las optimizaciones de rendimiento deben ser parte del proceso de desarrollo desde el principio, no una consideración posterior, para evitar problemas estructurales difíciles de resolver.'
        }
      ],
      nextSteps: [
        'Implementar un sistema de recomendaciones basado en el historial de compras',
        'Mejorar la accesibilidad según las pautas WCAG 2.1 nivel AA',
        'Desarrollar aplicaciones nativas para iOS y Android'
      ]
    },
    {
      id: 'task-manager',
      name: 'Task Management System',
      shortDescription: 'Aplicación colaborativa de gestión de tareas con React y Firebase',
      description: 'Sistema de gestión de tareas colaborativo que permite equipos trabajar juntos en proyectos, asignar tareas, y seguir el progreso en tiempo real.',
      year: 2022,
      status: 'completed',
      type: 'web',
      technologies: ['React', 'Firebase', 'Material-UI', 'React DnD', 'PWA'],
      repo: 'https://github.com/username/task-manager',
      demo: 'https://task-manager-demo.example.com',
      image: '/assets/projects/taskmanager.jpg',
      highlights: [
        'Interfaz drag-and-drop para gestión visual de tareas tipo Kanban',
        'Sincronización en tiempo real entre múltiples usuarios',
        'Notificaciones push para actualizaciones de tareas',
        'Modo offline con sincronización posterior',
        'Dashboard con analíticas de progreso y productividad'
      ],
      objectives: [
        'Crear una herramienta intuitiva para gestión de tareas en equipo',
        'Implementar sincronización en tiempo real para colaboración efectiva',
        'Permitir la gestión visual de flujos de trabajo tipo Kanban',
        'Ofrecer analíticas útiles sobre productividad y progreso',
        'Asegurar usabilidad en dispositivos móviles y soporte offline'
      ],
      role: 'Desarrollador Frontend',
      responsibilities: [
        'Diseño de la interfaz de usuario y experiencia de usuario',
        'Implementación de la interfaz drag-and-drop con React DnD',
        'Integración con Firebase para sincronización en tiempo real',
        'Desarrollo de componentes reutilizables de UI',
        'Implementación de funcionalidades PWA'
      ]
    },
    {
      id: 'ai-chatbot',
      name: 'AI Customer Service Chatbot',
      shortDescription: 'Chatbot de servicio al cliente potenciado por IA con integración multicanal',
      description: 'Chatbot inteligente para servicio al cliente que utiliza procesamiento de lenguaje natural para comprender y responder a consultas, integrándose con múltiples canales de comunicación.',
      year: 2023,
      status: 'in-progress',
      type: 'ai',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'Docker', 'AWS Lambda'],
      repo: null,
      demo: 'https://chatbot-demo.example.com',
      image: '/assets/projects/chatbot.jpg',
      highlights: [
        'Procesamiento de lenguaje natural para comprender consultas complejas',
        'Integración con plataformas de mensajería (WhatsApp, Messenger, Telegram)',
        'Sistema de aprendizaje continuo basado en interacciones',
        'Transferencia a agentes humanos cuando sea necesario',
        'Dashboard de analíticas para monitoreo de rendimiento'
      ],
      progress: 75
    },
    {
      id: 'health-tracker',
      name: 'Health & Fitness Tracker',
      shortDescription: 'Aplicación móvil para seguimiento de salud y fitness con sincronización en la nube',
      description: 'Aplicación móvil completa para seguimiento de fitness, nutrición y salud, con sincronización en la nube y analíticas personalizadas.',
      year: 2021,
      status: 'completed',
      type: 'mobile',
      technologies: ['React Native', 'Redux', 'Node.js', 'GraphQL', 'MongoDB'],
      repo: 'https://github.com/username/health-tracker',
      demo: null,
      image: '/assets/projects/healthtracker.jpg',
      highlights: [
        'Seguimiento de actividad física, nutrición y métricas de salud',
        'Integración con dispositivos wearables (Apple Watch, Fitbit)',
        'Planes personalizados basados en objetivos del usuario',
        'Analíticas detalladas y visualizaciones de progreso',
        'Sincronización entre dispositivos y plataformas'
      ]
    }
  ];
  
  export default projectsData;