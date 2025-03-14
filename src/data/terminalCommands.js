// src/data/terminalCommands.js
import projectsData from './projectsData';
import skillsData from './skillsData';

// Información del perfil - reemplazar con tus datos
const profile = {
  name: "Tu Nombre",
  title: "Desarrollador Frontend",
  email: "tuemail@ejemplo.com",
  github: "github.com/tuusuario",
  linkedin: "linkedin.com/in/tuusuario",
  location: "Ciudad, País",
  about: `Soy un desarrollador web apasionado por crear experiencias digitales 
interactivas y accesibles. Me especializo en React, JavaScript y diseño UI/UX, 
con un enfoque en arquitecturas escalables y código mantenible.`
};

export const commands = [
  {
    name: 'help',
    description: 'Muestra la lista de comandos disponibles',
    usage: 'help',
    aliases: ['h', '?'],
    execute: () => {
      return [
        'Comandos disponibles:',
        '-------------------',
        ...commands.map(cmd => `${cmd.name.padEnd(12)} - ${cmd.description}`),
        '',
        'Para obtener más información sobre un comando específico, escribe "help [comando]"'
      ];
    }
  },
  {
    name: 'clear',
    description: 'Limpia la pantalla de la terminal',
    usage: 'clear',
    aliases: ['cls'],
    execute: () => {
      // Este comando se maneja de forma especial en el componente Terminal
      return '¡Terminal limpiada!';
    }
  },
  {
    name: 'about',
    description: 'Muestra información sobre mí',
    usage: 'about',
    aliases: ['whoami', 'info'],
    execute: () => {
      return [
        `Nombre: ${profile.name}`,
        `Título: ${profile.title}`,
        `Ubicación: ${profile.location}`,
        '',
        profile.about,
        '',
        'Para más detalles, prueba los comandos "skills", "experience", o "contact"'
      ];
    }
  },
  {
    name: 'contact',
    description: 'Muestra mi información de contacto',
    usage: 'contact',
    aliases: ['email', 'social'],
    execute: () => {
      return [
        'Información de Contacto:',
        `Email: ${profile.email}`,
        `GitHub: ${profile.github}`,
        `LinkedIn: ${profile.linkedin}`,
        '',
        '¡No dudes en contactarme!'
      ];
    }
  },
  {
    name: 'projects',
    description: 'Lista mis proyectos o muestra detalles de un proyecto específico',
    usage: 'projects [nombre-proyecto]',
    aliases: ['project', 'proj'],
    execute: (args) => {
      if (args.length === 0) {
        return [
          'Mis Proyectos:',
          '-------------',
          ...projectsData.map((proj, index) => `${index + 1}. ${proj.name} - ${proj.shortDescription}`),
          '',
          'Para ver detalles de un proyecto específico, escribe "projects [nombre-proyecto]"'
        ];
      } else {
        const projectName = args.join(' ').toLowerCase();
        const project = projectsData.find(p => 
          p.name.toLowerCase() === projectName || 
          p.name.toLowerCase().includes(projectName)
        );
        
        if (project) {
          return [
            `Proyecto: ${project.name}`,
            `-------------------`,
            `Descripción: ${project.description}`,
            `Tecnologías: ${project.technologies.join(', ')}`,
            `Repositorio: ${project.repo || 'No disponible'}`,
            `Demo: ${project.demo || 'No disponible'}`,
            '',
            'Logros Destacados:',
            ...project.highlights.map(h => `- ${h}`)
          ];
        } else {
          throw new Error(`Proyecto "${args.join(' ')}" no encontrado. Usa "projects" para ver la lista completa.`);
        }
      }
    }
  },
  {
    name: 'skills',
    description: 'Muestra mis habilidades técnicas y profesionales',
    usage: 'skills [categoría]',
    aliases: ['skill', 'tecnologías'],
    execute: (args) => {
      const categories = Object.keys(skillsData);
      
      if (args.length === 0) {
        let result = ['Mis Habilidades por Categoría:', '-------------------------'];
        
        categories.forEach(cat => {
          result.push(`${cat}:`);
          result.push(skillsData[cat].map(skill => `  - ${skill.name} (${skill.level})`).join('\n'));
          result.push('');
        });
        
        return result;
      } else {
        const category = args.join(' ').toLowerCase();
        const matchedCategory = categories.find(c => c.toLowerCase() === category || c.toLowerCase().includes(category));
        
        if (matchedCategory) {
          return [
            `Habilidades en ${matchedCategory}:`,
            `-------------------`,
            ...skillsData[matchedCategory].map(skill => `${skill.name.padEnd(20)} - ${skill.level} ${skill.years ? `(${skill.years} años)` : ''}`)
          ];
        } else {
          throw new Error(`Categoría "${args.join(' ')}" no encontrada. Categorías disponibles: ${categories.join(', ')}`);
        }
      }
    }
  },
  {
    name: 'experience',
    description: 'Muestra mi experiencia laboral',
    usage: 'experience',
    aliases: ['exp', 'work'],
    execute: () => {
      // Reemplazar con tu experiencia laboral real
      return [
        'Experiencia Laboral:',
        '-------------------',
        'Empresa Actual | Desarrollador Frontend Senior | 2020 - Presente',
        '- Lideré el desarrollo de aplicaciones React con enfoque en rendimiento y accesibilidad',
        '- Implementé arquitectura modular que redujo tiempos de desarrollo en 30%',
        '- Mentorié a desarrolladores junior y establecí buenas prácticas de código',
        '',
        'Empresa Anterior | Desarrollador Frontend | 2018 - 2020',
        '- Desarrollé componentes reutilizables para una plataforma de e-commerce',
        '- Colaboré en migración de AngularJS a React con mejoras de UX significativas',
        '- Optimicé tiempos de carga que mejoraron la conversión en 15%',
        '',
        'Para más detalles, visita mi perfil de LinkedIn usando el comando "contact"'
      ];
    }
  },
  {
    name: 'education',
    description: 'Muestra mi formación académica',
    usage: 'education',
    aliases: ['edu', 'estudios'],
    execute: () => {
      // Reemplazar con tu formación académica real
      return [
        'Formación Académica:',
        '-------------------',
        'Universidad Ejemplo | Ingeniería en Informática | 2014 - 2018',
        '- Especialización en Desarrollo de Software',
        '- Proyecto final: Plataforma de aprendizaje colaborativo con React y Node.js',
        '',
        'Certificaciones:',
        '- AWS Certified Developer Associate',
        '- MongoDB Certified Developer',
        '- Scrum Alliance Certified Developer',
        '',
        'Formación Continua:',
        '- Curso Avanzado de React y Redux',
        '- Workshop de Arquitectura Frontend',
        '- Masterclass de Performance Web'
      ];
    }
  },
  {
    name: 'ls',
    description: 'Lista archivos y directorios en el sistema virtual',
    usage: 'ls [directorio]',
    aliases: ['dir', 'list'],
    execute: (args) => {
      // Sistema de archivos virtual
      const fileSystem = {
        '/': ['projects', 'skills', 'contact.txt', 'about.md', 'resume.pdf'],
        '/projects': projectsData.map(p => `${p.name.toLowerCase().replace(/\s+/g, '-')}.project`),
        '/skills': Object.keys(skillsData).map(category => `${category.toLowerCase()}.skill`)
      };
      
      let path = '/';
      if (args.length > 0) {
        path = args[0].startsWith('/') ? args[0] : `/${args[0]}`;
      }
      
      if (fileSystem[path]) {
        return [
          `Contenido de ${path}:`,
          '-------------------',
          ...fileSystem[path].map(item => item)
        ];
      } else {
        throw new Error(`Directorio "${path}" no encontrado.`);
      }
    }
  },
  {
    name: 'cat',
    description: 'Muestra el contenido de un archivo virtual',
    usage: 'cat [archivo]',
    aliases: ['type', 'show'],
    execute: (args) => {
      if (args.length === 0) {
        throw new Error('Debes especificar un archivo. Ejemplo: cat about.md');
      }
      
      const fileName = args[0].toLowerCase();
      
      // Simular contenido de archivos
      const files = {
        'about.md': [
          '# Sobre Mí',
          '',
          profile.about,
          '',
          '## Mi Filosofía de Trabajo',
          '',
          'Creo firmemente en el código limpio, bien documentado y mantenible. Me apasiona el aprendizaje continuo y compartir conocimientos con mi equipo.',
          '',
          '## Intereses',
          '',
          '- Desarrollo web progresivo',
          '- Experiencias de usuario innovadoras',
          '- Optimización de rendimiento',
          '- Accesibilidad web'
        ],
        'contact.txt': [
          'Información de Contacto',
          '=====================',
          '',
          `Email: ${profile.email}`,
          `GitHub: ${profile.github}`,
          `LinkedIn: ${profile.linkedin}`,
          '',
          'Disponible para nuevos proyectos y oportunidades de colaboración.'
        ],
        'resume.pdf': [
          '[Este sería un archivo PDF. Puedes descargarlo desde mi sitio web]'
        ]
      };
      
      // Verificar si es un archivo de proyecto
      if (fileName.endsWith('.project')) {
        const projectName = fileName.replace('.project', '').replace(/-/g, ' ');
        const project = projectsData.find(p => p.name.toLowerCase() === projectName);
        
        if (project) {
          return [
            `# ${project.name}`,
            '',
            project.description,
            '',
            `## Tecnologías: ${project.technologies.join(', ')}`,
            '',
            '## Logros Destacados',
            ...project.highlights.map(h => `- ${h}`),
            '',
            `Demo: ${project.demo || 'No disponible'}`,
            `Código: ${project.repo || 'No disponible'}`
          ];
        }
      }
      
      // Verificar si es un archivo de habilidades
      if (fileName.endsWith('.skill')) {
        const categoryName = fileName.replace('.skill', '');
        const category = Object.keys(skillsData).find(c => c.toLowerCase() === categoryName);
        
        if (category) {
          return [
            `# Habilidades en ${category}`,
            '',
            ...skillsData[category].map(skill => `- ${skill.name}: ${skill.level}${skill.years ? ` (${skill.years} años de experiencia)` : ''}`),
            '',
            'Actualizado continuamente mediante aprendizaje y proyectos personales.'
          ];
        }
      }
      
      // Archivos generales
      if (files[fileName]) {
        return files[fileName];
      }
      
      throw new Error(`Archivo "${fileName}" no encontrado.`);
    }
  },
  {
    name: 'find',
    description: 'Busca información en mi portafolio',
    usage: 'find [término]',
    aliases: ['search', 'buscar'],
    execute: (args) => {
      if (args.length === 0) {
        throw new Error('Debes especificar un término de búsqueda. Ejemplo: find react');
      }
      
      const searchTerm = args.join(' ').toLowerCase();
      let results = [];
      
      // Buscar en proyectos
      const projectMatches = projectsData.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        p.technologies.some(t => t.toLowerCase().includes(searchTerm))
      );
      
      if (projectMatches.length > 0) {
        results.push('Proyectos encontrados:');
        projectMatches.forEach(p => {
          results.push(`- ${p.name}: ${p.shortDescription}`);
        });
        results.push('');
      }
      
      // Buscar en habilidades
      let skillMatches = [];
      Object.keys(skillsData).forEach(category => {
        const skills = skillsData[category].filter(s => 
          s.name.toLowerCase().includes(searchTerm) ||
          category.toLowerCase().includes(searchTerm)
        );
        
        if (skills.length > 0) {
          skillMatches.push(`${category}:`);
          skills.forEach(s => {
            skillMatches.push(`  - ${s.name} (${s.level})`);
          });
        }
      });
      
      if (skillMatches.length > 0) {
        results.push('Habilidades encontradas:');
        results = results.concat(skillMatches);
        results.push('');
      }
      
      // Buscar en la información personal
      if (profile.about.toLowerCase().includes(searchTerm)) {
        results.push('Encontrado en mi perfil personal');
        results.push('');
      }
      
      if (results.length === 0) {
        return [`No se encontraron resultados para "${args.join(' ')}"`];
      }
      
      return [
        `Resultados de búsqueda para "${args.join(' ')}":`,
        '----------------------------------------',
        ...results,
        'Para más detalles, explora los elementos específicos con los comandos correspondientes.'
      ];
    }
  },
  {
    name: 'open',
    description: 'Abre una aplicación o proyecto en el escritorio virtual',
    usage: 'open [aplicación/proyecto]',
    aliases: ['launch', 'start'],
    execute: (args) => {
      if (args.length === 0) {
        throw new Error('Debes especificar qué quieres abrir. Ejemplo: open projects');
      }
      
      const target = args.join(' ').toLowerCase();
      
      // Esta función se completa en la implementación real
      // ya que necesita interactuar con el sistema de ventanas
      return [`Intentando abrir "${args.join(' ')}"...`, 'Esta función se activará en la implementación completa.'];
    }
  },
  {
    name: 'echo',
    description: 'Muestra un mensaje en la terminal',
    usage: 'echo [mensaje]',
    aliases: [],
    execute: (args) => {
      if (args.length === 0) {
        return [''];
      }
      return [args.join(' ')];
    }
  },
  {
    name: 'date',
    description: 'Muestra la fecha y hora actuales',
    usage: 'date',
    aliases: ['time'],
    execute: () => {
      return [new Date().toString()];
    }
  },
  {
    name: 'exit',
    description: 'Cierra la terminal',
    usage: 'exit',
    aliases: ['quit', 'close'],
    execute: () => {
      // Esta función se maneja de forma especial en el componente Terminal
      return '¡Hasta luego!';
    }
  }
];