export interface Metric {
  value: string;
  label: string;
  detail: string;
  order: number;
}

export interface Skill {
  name: string;
  icon: string;
  accent: 'primary' | 'secondary' | 'tertiary';
  category: string;
  level: string;
  order: number;
}

export interface Project {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  year: string;
  featured: boolean;
  order: number;
}

export interface Step {
  index: string;
  title: string;
  description: string;
  order: number;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  order: number;
  visible: boolean;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  availability: string;
  location: string;
  email: string;
}

export interface PortfolioContent {
  brand: string;
  profile: Profile;
  metrics: Metric[];
  skills: Skill[];
  projects: Project[];
  steps: Step[];
  links: SocialLink[];
}

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  brand: 'ARCHITECT.OS',
  profile: {
    name: 'Tu Nombre',
    role: 'Ingeniero en Computación e Informática',
    headline: 'Construyo productos digitales con enfoque técnico, claridad visual y bases sólidas.',
    bio:
      'Portafolio visual preparado para conectarse a Firebase y administrar contenido desde una base de datos sin rehacer la interfaz.',
    availability: 'Abierto a proyectos, prácticas y roles de desarrollo',
    location: 'LatAm / Remoto',
    email: 'hola@portfolio.dev'
  },
  metrics: [
    { value: '03+', label: 'Áreas fuertes', detail: 'Frontend, backend y arquitectura.', order: 1 },
    { value: '06', label: 'Tecnologías base', detail: 'Stack pensado para escalar.', order: 2 },
    { value: '24/7', label: 'Mentalidad de producto', detail: 'Iteración, orden y mantenimiento.', order: 3 }
  ],
  skills: [
    { name: 'TypeScript', icon: 'terminal', accent: 'primary', category: 'Frontend', level: 'Avanzado', order: 1 },
    { name: 'Angular', icon: 'layers', accent: 'secondary', category: 'Frontend', level: 'Intermedio', order: 2 },
    { name: 'Node.js', icon: 'dns', accent: 'tertiary', category: 'Backend', level: 'Intermedio', order: 3 },
    { name: 'Firebase', icon: 'database', accent: 'primary', category: 'Backend', level: 'Base', order: 4 },
    { name: 'PostgreSQL', icon: 'storage', accent: 'secondary', category: 'Datos', level: 'Intermedio', order: 5 },
    { name: 'UI Systems', icon: 'design_services', accent: 'tertiary', category: 'Diseño', level: 'Intermedio', order: 6 }
  ],
  projects: [
    {
      title: 'Dashboard Académico',
      category: 'Frontend + Datos',
      summary: 'Panel para visualizar métricas, progreso y contenido editable desde una fuente central.',
      tags: ['Angular', 'TypeScript', 'UX'],
      year: '2026',
      featured: true,
      order: 1
    },
    {
      title: 'Plataforma de Servicios',
      category: 'Arquitectura Web',
      summary: 'Sitio informativo con secciones modulares, navegación clara y foco en conversión.',
      tags: ['Responsive', 'UI System', 'SEO'],
      year: '2025',
      featured: false,
      order: 2
    },
    {
      title: 'Gestor de Contenido',
      category: 'Admin Ready',
      summary: 'Base visual preparada para integrar Firebase y editar proyectos, skills y experiencia.',
      tags: ['Firebase', 'CMS', 'Escalable'],
      year: 'Próximo',
      featured: false,
      order: 3
    }
  ],
  steps: [
    {
      index: '01',
      title: 'Diseño',
      description: 'Definir estructura, jerarquía visual y experiencia adaptable.',
      order: 1
    },
    {
      index: '02',
      title: 'Contenido',
      description: 'Conectar datos de perfil, proyectos y habilidades desde Firebase.',
      order: 2
    },
    {
      index: '03',
      title: 'Escala',
      description: 'Agregar admin, filtros y edición sin rehacer la interfaz.',
      order: 3
    }
  ],
  links: [
    { label: 'GitHub', url: '#contacto', icon: 'code', order: 1, visible: true },
    { label: 'LinkedIn', url: '#contacto', icon: 'work', order: 2, visible: true },
    { label: 'Contacto', url: '#contacto', icon: 'mail', order: 3, visible: true }
  ]
};
