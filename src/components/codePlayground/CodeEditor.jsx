// src/components/codePlayground/CodeEditor.jsx
import React, { useRef, useEffect } from 'react';

// Nota: En una implementación real, usaríamos bibliotecas como Monaco Editor,
// CodeMirror o Prism para la sintaxis highlighting y la funcionalidad completa del editor.
// Esta es una implementación simplificada para demostración.

const CodeEditor = ({ code, language, onChange }) => {
  const editorRef = useRef(null);
  
  // Simulación de resaltado de sintaxis básico para demostración
  const syntaxHighlight = (code, language) => {
    if (!code) return '';
    
    // Aplicar una versión muy básica de resaltado de sintaxis
    let highlighted = code;
    
    if (language === 'javascript' || language === 'react') {
      // Palabras clave de JS
      const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await'];
      // Funciones/métodos comunes
      const functions = ['console', 'log', 'map', 'filter', 'reduce', 'forEach', 'setState', 'useState', 'useEffect'];
      // Valores especiales
      const values = ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'];
      
      // Reemplazar palabras clave
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
      });
      
      // Reemplazar funciones
      functions.forEach(func => {
        const regex = new RegExp(`\\b${func}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span class="text-yellow-400">${func}</span>`);
      });
      
      // Reemplazar valores
      values.forEach(value => {
        const regex = new RegExp(`\\b${value}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span class="text-orange-400">${value}</span>`);
      });
      
      // Reemplazar strings (básico)
      highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>');
      highlighted = highlighted.replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>');
      
      // Reemplazar comentarios (básico)
      highlighted = highlighted.replace(/\/\/(.*)$/gm, '<span class="text-gray-500">//$1</span>');
    } else if (language === 'html') {
      // Tags HTML
      highlighted = highlighted.replace(/(&lt;[^&]*&gt;)/g, '<span class="text-red-400">$1</span>');
    } else if (language === 'css') {
      // Propiedades CSS
      highlighted = highlighted.replace(/([\w-]+):/g, '<span class="text-blue-400">$1:</span>');
      // Valores CSS
      highlighted = highlighted.replace(/: ([^;]+);/g, ': <span class="text-green-400">$1</span>;');
    }
    
    // Reemplazar números
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>');
    
    return highlighted;
  };
  
  // Manejar cambios en el textarea
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  
  // Manejo de tabulación
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insertar el tab
      const newText = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newText);
      
      // Mover el cursor después del tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };
  
  // Mostrar el resaltado de sintaxis sobre el textarea
  useEffect(() => {
    const textarea = editorRef.current;
    if (!textarea) return;
    
    // Asegurarse de que el textarea y el contenedor tengan el mismo scroll
    const container = textarea.parentElement;
    textarea.addEventListener('scroll', () => {
      container.querySelector('.syntax-highlight').scrollTop = textarea.scrollTop;
      container.querySelector('.syntax-highlight').scrollLeft = textarea.scrollLeft;
    });
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden font-mono text-sm">
      {/* Capa de resaltado de sintaxis */}
      <div 
        className="syntax-highlight absolute inset-0 p-4 whitespace-pre overflow-auto pointer-events-none"
        dangerouslySetInnerHTML={{ 
          __html: syntaxHighlight(
            code
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;'), 
            language
          ) 
        }}
      />
      
      {/* Input real */}
      <textarea
        ref={editorRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 w-full h-full p-4 text-transparent bg-transparent caret-white resize-none focus:outline-none"
        spellCheck="false"
        placeholder="Escribe tu código aquí..."
      />
    </div>
  );
};

export default CodeEditor;