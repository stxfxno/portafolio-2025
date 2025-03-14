// src/data/codeSamplesData.js
const codeSamplesData = [
    {
      id: 'custom-hooks',
      name: 'React Custom Hooks',
      language: 'javascript',
      description: 'Una colección de hooks personalizados que utilizo para manejar funcionalidades comunes como fetch de datos, estado de formularios, y almacenamiento local.',
      code: `// useLocalStorage.js - Hook para manejar estado persistente en localStorage
  import { useState, useEffect } from 'react';
  
  /**
   * Hook personalizado para persistir estado en localStorage
   * @param {string} key - Clave para almacenar en localStorage
   * @param {any} initialValue - Valor inicial si no hay valor en localStorage
   * @returns {Array} - [valorAlmacenado, setValorAlmacenado]
   */
  function useLocalStorage(key, initialValue) {
    // Estado para almacenar nuestro valor
    // Pasa la función de inicialización a useState para que la lógica
    // solo se ejecute una vez
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Obtener de localStorage por key
        const item = window.localStorage.getItem(key);
        // Analizar el JSON almacenado o devolver initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // Si hay error, devolver initialValue
        console.log(error);
        return initialValue;
      }
    });
  
    // Devolver una versión envuelta de la función setter de useState
    // que persiste el nuevo valor en localStorage
    const setValue = value => {
      try {
        // Permitir que value sea una función para seguir el mismo patrón
        // que tiene useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Guardar state
        setStoredValue(valueToStore);
        // Guardar en localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // Una implementación más avanzada manejaría el caso de error
        console.log(error);
      }
    };
  
    // Escuchar cambios en otros tabs/ventanas
    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === key) {
          try {
            setStoredValue(JSON.parse(e.newValue));
          } catch (error) {
            console.log(error);
          }
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [key]);
  
    return [storedValue, setValue];
  }
  
  export default useLocalStorage;
  
  
  // useFetch.js - Hook para manejar peticiones HTTP
  import { useState, useEffect, useCallback } from 'react';
  
  /**
   * Hook personalizado para manejar peticiones fetch
   * @param {string} url - URL para hacer fetch
   * @param {Object} options - Opciones para fetch
   * @returns {Object} - { data, loading, error, refetch }
   */
  function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`Error HTTP: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || 'Ocurrió un error al obtener los datos');
      } finally {
        setLoading(false);
      }
    }, [url, options]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    // Permitir refrescar manualmente
    const refetch = () => {
      fetchData();
    };
  
    return { data, loading, error, refetch };
  }
  
  export default useFetch;
  
  
  // useForm.js - Hook para manejar formularios
  import { useState, useCallback } from 'react';
  
  /**
   * Hook personalizado para manejar estado y validación de formularios
   * @param {Object} initialValues - Valores iniciales del formulario
   * @param {Function} validate - Función de validación (opcional)
   * @param {Function} onSubmit - Función a ejecutar en submit válido
   * @returns {Object} - Métodos y estado del formulario
   */
  function useForm(initialValues, validate, onSubmit) {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // Actualizar campo individual
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
    }, []);
  
    // Marcar campo como tocado en blur
    const handleBlur = useCallback((e) => {
      const { name } = e.target;
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
      
      // Validar al perder el foco si hay función de validación
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
      }
    }, [validate, values]);
  
    // Manejar envío del formulario
    const handleSubmit = useCallback((e) => {
      e.preventDefault();
      
      // Marcar todos los campos como tocados
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);
      
      // Validar todo el formulario
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        // Si no hay errores, proceder con el envío
        if (Object.keys(validationErrors).length === 0) {
          setIsSubmitting(true);
          onSubmit(values, {
            resetForm: () => {
              setValues(initialValues || {});
              setTouched({});
              setErrors({});
              setIsSubmitting(false);
            }
          });
        }
      } else {
        // Sin validación, enviar directamente
        setIsSubmitting(true);
        onSubmit(values, {
          resetForm: () => {
            setValues(initialValues || {});
            setTouched({});
            setIsSubmitting(false);
          }
        });
      }
    }, [initialValues, onSubmit, validate, values]);
  
    // Resetear formulario
    const resetForm = useCallback(() => {
      setValues(initialValues || {});
      setTouched({});
      setErrors({});
      setIsSubmitting(false);
    }, [initialValues]);
  
    // Establecer un valor específico
    const setValue = useCallback((name, value) => {
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
    }, []);
  
    return {
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      resetForm,
      setValue
    };
  }
  
  export default useForm;`
    },
    {
      id: 'reusable-components',
      name: 'Componentes Reutilizables UI',
      language: 'javascript',
      description: 'Una muestra de componentes de UI reutilizables que he desarrollado para proyectos React, con énfasis en accesibilidad y personalización.',
      code: `// Button.jsx - Componente de botón reutilizable con variantes
  import React from 'react';
  import PropTypes from 'prop-types';
  import classNames from 'classnames';
  
  /**
   * Componente de botón reutilizable con múltiples variantes
   */
  const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    type = 'button',
    onClick,
    className,
    ...props
  }) => {
    // Definir las clases base y variantes
    const buttonClasses = classNames(
      // Clases base
      'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
      // Variantes
      {
        // Tipo de botón
        'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500': variant === 'primary',
        'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500': variant === 'secondary',
        'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500': variant === 'success',
        'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500': variant === 'danger',
        'bg-transparent hover:bg-gray-100 text-blue-600 border border-blue-600': variant === 'outline',
        'bg-transparent hover:bg-gray-50 text-gray-700 underline': variant === 'link',
        
        // Tamaño
        'px-2.5 py-1.5 text-xs': size === 'small',
        'px-4 py-2 text-sm': size === 'medium',
        'px-5 py-3 text-base': size === 'large',
        
        // Ancho completo
        'w-full': fullWidth,
        
        // Estado deshabilitado
        'opacity-50 cursor-not-allowed': disabled,
      },
      // Clases adicionales pasadas como prop
      className
    );
  
    return (
      <button
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'outline', 'link']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    className: PropTypes.string,
  };
  
  export default Button;
  
  
  // Modal.jsx - Componente modal accesible
  import React, { useEffect, useRef } from 'react';
  import { createPortal } from 'react-dom';
  import PropTypes from 'prop-types';
  import FocusTrap from 'focus-trap-react';
  
  /**
   * Componente de modal accesible
   */
  const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'medium',
  }) => {
    const modalRef = useRef(null);
    
    // Manejar escape para cerrar
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';
      }
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        // Restaurar scroll al desmontar
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);
    
    // Cerrar al hacer clic fuera del modal
    const handleOverlayClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    // Determinar la clase de tamaño
    const sizeClass = {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-2xl',
      full: 'max-w-full mx-4',
    }[size];
    
    if (!isOpen) return null;
    
    return createPortal(
      <div
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby={title ? 'modal-title' : undefined}
        role="dialog"
        aria-modal="true"
      >
        {/* Overlay con fondo semi-transparente */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleOverlayClick}
        />
        
        {/* Contenedor centrado */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <FocusTrap>
            <div
              ref={modalRef}
              className={\`bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:w-full \${sizeClass}\`}
            >
              {/* Encabezado */}
              {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 
                    id="modal-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    {title}
                  </h3>
                </div>
              )}
              
              {/* Cuerpo */}
              <div className="px-6 py-4">
                {children}
              </div>
              
              {/* Pie opcional */}
              {footer && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                  {footer}
                </div>
              )}
            </div>
          </FocusTrap>
        </div>
      </div>,
      document.body
    );
  };
  
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  };
  
  export default Modal;`
    },
    {
      id: 'async-data-fetching',
      name: 'Manejo Asincrónico de Datos',
      language: 'javascript',
      description: 'Diferentes enfoques para manejar peticiones asincrónicas en React, desde Promises básicas hasta React Query para casos avanzados.',
      code: `// Ejemplo 1: Uso de Async/Await con useEffect
  import React, { useState, useEffect } from 'react';
  
  const AsyncFetchExample = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Función para obtener datos
      const fetchData = async () => {
        try {
          setLoading(true);
          // Simular un delay para demostración
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const response = await fetch('https://api.example.com/data');
          
          if (!response.ok) {
            throw new Error(\`Error HTTP: \${response.status}\`);
          }
          
          const result = await response.json();
          setData(result);
          setError(null);
        } catch (err) {
          setError(err.message || 'Ocurrió un error al obtener los datos');
          setData(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No hay datos disponibles</div>;
  
    return (
      <div>
        <h2>Datos obtenidos</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };
  
  // Ejemplo 2: Uso de un Custom Hook para abstracción
  import { useState, useEffect, useCallback } from 'react';
  
  // Custom hook para fetch de datos
  function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = useCallback(async () => {
      try {
        setLoading(true);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`Error HTTP: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || 'Ocurrió un error al obtener los datos');
        setData(null);
      } finally {
        setLoading(false);
      }
    }, [url, options]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    // Permitir refrescar manualmente
    const refetch = () => {
      fetchData();
    };
  
    return { data, loading, error, refetch };
  }
  
  // Componente que usa el custom hook
  const FetchHookExample = () => {
    const { data, loading, error, refetch } = useFetch('https://api.example.com/data');
  
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No hay datos disponibles</div>;
  
    return (
      <div>
        <h2>Datos obtenidos</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={refetch}>Recargar datos</button>
      </div>
    );
  };
  
  // Ejemplo 3: Uso de React Query para gestión avanzada de cache y estados
  import React from 'react';
  import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
  
  // Configuración de React Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutos
      },
    },
  });
  
  // Funciones de API
  const fetchTodos = async () => {
    const response = await fetch('https://api.example.com/todos');
    if (!response.ok) throw new Error('Error al obtener tareas');
    return response.json();
  };
  
  const addTodo = async (newTodo) => {
    const response = await fetch('https://api.example.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    
    if (!response.ok) throw new Error('Error al crear tarea');
    return response.json();
  };
  
  // Componente que usa React Query
  const TodoApp = () => {
    const [newTodoText, setNewTodoText] = React.useState('');
    
    // Query para obtener tareas
    const { 
      data: todos, 
      isLoading, 
      isError, 
      error 
    } = useQuery('todos', fetchTodos);
    
    // Mutation para agregar tareas
    const addTodoMutation = useMutation(addTodo, {
      onSuccess: () => {
        // Invalida y recarga la query de todos
        queryClient.invalidateQueries('todos');
        setNewTodoText('');
      },
    });
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newTodoText.trim()) return;
      
      addTodoMutation.mutate({ title: newTodoText, completed: false });
    };
    
    if (isLoading) return <div>Cargando tareas...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    
    return (
      <div>
        <h2>Lista de Tareas</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Nueva tarea"
          />
          <button 
            type="submit" 
            disabled={addTodoMutation.isLoading}
          >
            {addTodoMutation.isLoading ? 'Agregando...' : 'Agregar'}
          </button>
        </form>
        
        {addTodoMutation.isError && (
          <p style={{ color: 'red' }}>
            Error: {addTodoMutation.error.message}
          </p>
        )}
        
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Envolver la aplicación con el proveedor de React Query
  const TodoAppWithProvider = () => (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );`
    },
    {
      id: 'responsive-layout',
      name: 'Layout Responsivo con CSS Grid',
      language: 'html',
      description: 'Un ejemplo de layout responsivo utilizando CSS Grid y CSS Variables para crear layouts flexibles y mantenibles.',
      code: `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout Responsivo con CSS Grid</title>
    <style>
      /* Variables CSS para configuración global */
      :root {
        /* Colores */
        --color-primary: #4361ee;
        --color-secondary: #3f37c9;
        --color-accent: #4cc9f0;
        --color-text: #333333;
        --color-text-light: #666666;
        --color-background: #f9f9f9;
        --color-background-alt: #ffffff;
        --color-border: #e0e0e0;
        
        /* Espaciado */
        --spacing-xs: 0.25rem;
        --spacing-sm: 0.5rem;
        --spacing-md: 1rem;
        --spacing-lg: 1.5rem;
        --spacing-xl: 2rem;
        --spacing-xxl: 3rem;
        
        /* Layout */
        --container-max-width: 1200px;
        --header-height: 60px;
        --footer-height: 100px;
        --sidebar-width: 250px;
        
        /* Fuentes */
        --font-family-base: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        --font-size-base: 16px;
        --font-size-sm: 0.875rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.5rem;
        
        /* Bordes */
        --border-radius-sm: 4px;
        --border-radius-md: 8px;
        --border-radius-lg: 12px;
        
        /* Sombras */
        --box-shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        --box-shadow-md: 0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12);
        --box-shadow-lg: 0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1);
        
        /* Transiciones */
        --transition-fast: 0.1s ease;
        --transition-normal: 0.2s ease;
        --transition-slow: 0.3s ease;
      }
      
      /* Reset y estilos base */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        color: var(--color-text);
        background-color: var(--color-background);
        line-height: 1.6;
        min-height: 100vh;
      }
      
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Layout principal con CSS Grid */
      .grid-container {
        display: grid;
        min-height: 100vh;
        grid-template-areas:
          "header header header"
          "sidebar main main"
          "footer footer footer";
        grid-template-columns: var(--sidebar-width) 1fr;
        grid-template-rows: var(--header-height) 1fr var(--footer-height);
      }
      
      /* Áreas del grid */
      .header {
        grid-area: header;
        background-color: var(--color-primary);
        color: white;
        padding: 0 var(--spacing-lg);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--box-shadow-sm);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .sidebar {
        grid-area: sidebar;
        background-color: var(--color-background-alt);
        border-right: 1px solid var(--color-border);
        padding: var(--spacing-lg);
        overflow-y: auto;
      }
      
      .main {
        grid-area: main;
        padding: var(--spacing-lg);
        overflow-y: auto;
      }
      
      .footer {
        grid-area: footer;
        background-color: var(--color-text);
        color: white;
        padding: var(--spacing-lg);
        text-align: center;
      }
      
      /* Adaptación responsiva */
      @media (max-width: 768px) {
        .grid-container {
          grid-template-areas:
            "header header"
            "main main"
            "footer footer";
          grid-template-columns: 1fr;
          grid-template-rows: var(--header-height) 1fr var(--footer-height);
        }
        
        .sidebar {
          display: none; /* Ocultar sidebar en móvil */
        }
        
        /* Mostrar menú hamburguesa en móvil */
        .menu-toggle {
          display: block;
        }
        
        /* Sidebar como overlay en móvil cuando está activado */
        .sidebar.active {
          display: block;
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 80%;
          height: calc(100vh - var(--header-height));
          z-index: 99;
          box-shadow: var(--box-shadow-md);
        }
      }
      
      /* Cards Grid para el contenido */
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-lg);
      }
      
      .card {
        background-color: var(--color-background-alt);
        border-radius: var(--border-radius-md);
        overflow: hidden;
        box-shadow: var(--box-shadow-sm);
        transition: transform var(--transition-normal), box-shadow var(--transition-normal);
      }
      
      .card:hover {
        transform: translateY(-5px);
        box-shadow: var(--box-shadow-md);
      }
      
      .card-img {
        height: 200px;
        background-color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: var(--font-size-xl);
      }
      
      .card-content {
        padding: var(--spacing-lg);
      }
      
      .card-title {
        margin-bottom: var(--spacing-sm);
        color: var(--color-primary);
      }
      
      .card-text {
        color: var(--color-text-light);
        margin-bottom: var(--spacing-md);
      }
      
      .card-button {
        display: inline-block;
        background-color: var(--color-primary);
        color: white;
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--border-radius-sm);
        text-decoration: none;
        transition: background-color var(--transition-fast);
      }
      
      .card-button:hover {
        background-color: var(--color-secondary);
      }
      
      /* Menú de navegación */
      .nav-list {
        list-style: none;
      }
      
      .nav-item:not(:last-child) {
        margin-bottom: var(--spacing-md);
      }
      
      .nav-link {
        display: block;
        padding: var(--spacing-sm) 0;
        color: var(--color-text);
        text-decoration: none;
        transition: color var(--transition-fast);
      }
      
      .nav-link:hover {
        color: var(--color-primary);
      }
      
      .nav-link.active {
        color: var(--color-primary);
        font-weight: bold;
      }
      
      /* Utilidades */
      .container {
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: 0 var(--spacing-lg);
      }
      
      .menu-toggle {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: var(--font-size-lg);
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="grid-container">
      <header class="header">
        <h1>Mi Sitio</h1>
        <button class="menu-toggle">☰</button>
      </header>
      
      <aside class="sidebar">
        <nav>
          <ul class="nav-list">
            <li class="nav-item"><a href="#" class="nav-link active">Inicio</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Proyectos</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Servicios</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Sobre Mí</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Contacto</a></li>
          </ul>
        </nav>
      </aside>
      
      <main class="main">
        <h2>Proyectos Destacados</h2>
        <p>Explora algunos de mis proyectos más recientes.</p>
        
        <div class="cards-grid">
          <div class="card">
            <div class="card-img">Proyecto 1</div>
            <div class="card-content">
              <h3 class="card-title">E-Commerce Platform</h3>
              <p class="card-text">Plataforma completa de comercio electrónico con React y Node.js.</p>
              <a href="#" class="card-button">Ver Detalles</a>
            </div>
          </div>
          
          <div class="card">
            <div class="card-img">Proyecto 2</div>
            <div class="card-content">
              <h3 class="card-title">Task Manager</h3>
              <p class="card-text">Aplicación de gestión de tareas con sincronización en tiempo real.</p>
              <a href="#" class="card-button">Ver Detalles</a>
            </div>
          </div>
          
          <div class="card">
            <div class="card-img">Proyecto 3</div>
            <div class="card-content">
              <h3 class="card-title">Fitness Tracker</h3>
              <p class="card-text">App móvil para seguimiento de actividad física y nutrición.</p>
              <a href="#" class="card-button">Ver Detalles</a>
            </div>
          </div>
          
          <div class="card">
            <div class="card-img">Proyecto 4</div>
            <div class="card-content">
              <h3 class="card-title">AI Chatbot</h3>
              <p class="card-text">Chatbot de servicio al cliente con inteligencia artificial.</p>
              <a href="#" class="card-button">Ver Detalles</a>
            </div>
          </div>
        </div>
      </main>
      
      <footer class="footer">
        <p>&copy; 2023 Mi Portafolio. Todos los derechos reservados.</p>
      </footer>
    </div>
    
    <script>
      // JavaScript para toggle del menú en móvil
      document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
      });
    </script>
  </body>
  </html>`
    }
  ];
  
  export default codeSamplesData;a