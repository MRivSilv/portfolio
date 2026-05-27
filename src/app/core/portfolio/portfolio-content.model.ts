export interface Metric {
  value: string;
  label: string;
  detail: string;
  order: number;
}

export interface Skill {
  name: string;
  icon: string;
  iconType?: 'devicon' | 'svg-url' | 'material';
  iconUrl?: string;
  accent: 'primary' | 'secondary' | 'tertiary';
  category: string;
  level: string;
  order: number;
}

export interface ProjectScreenshot {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  year: string;
  featured: boolean;
  order: number;
  screenshots: ProjectScreenshot[];
  demoUrl?: string;
  githubUrl?: string;
  technicalDetails?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  features?: string[];
  sections?: ProjectSection[];
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
  brand: 'MATIAS RIVILLO',
  profile: {
    name: 'Matias Rivillo',
    role: 'Ingeniero en Computación e Informática',
    headline: 'Con fuerte formación en desarrollo de software y metodologías ágiles.',
    bio:
      'En este sitio web podrás visitar algunos de mis proyectos, habilidades y experiencia.',
    availability: 'Abierto a ofertas laborales tanto como Fullstack como Backend Developer.',
    location: 'Santiago de Chile',
    email: 'matiasrivillo@gmail.com'
  },
  metrics: [
    { value: '4+', label: 'Años programando', detail: 'Python, Typescript, Go', order: 1 },
    { value: '2025', label: 'Estudios terminados', detail: 'Universidad Andrés Bello', order: 2 },
    { value: 'Idioma Extranjero', label: 'Inglés', detail: 'Fluidez comunicacional', order: 3 }
  ],
  skills: [
    { name: 'Python', icon: 'python', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', accent: 'primary', category: 'Language', level: 'Avanzado', order: 1 },
    { name: 'Angular', icon: 'angular', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', accent: 'secondary', category: 'Frontend', level: 'Intermedio', order: 2 },
    { name: 'Go', icon: 'go', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', accent: 'tertiary', category: 'Backend', level: 'Básico', order: 3 },
    { name: 'AWS', icon: 'amazonwebservices', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', accent: 'primary', category: 'Cloud', level: 'Básico', order: 4 },
    { name: 'PostgreSQL', icon: 'postgresql', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', accent: 'secondary', category: 'Datos', level: 'Básico', order: 5 },
    { name: 'React Native', icon: 'react', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', accent: 'tertiary', category: 'Mobile', level: 'Básico', order: 6 },
    { name: 'Machine Learning', icon: 'scikitlearn', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', accent: 'primary', category: 'Data Science', level: 'Intermedio', order: 7 },
    { name: 'Django', icon: 'django', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', accent: 'secondary', category: 'Backend', level: 'Intermedio', order: 8 },
    { name: 'FastAPI', icon: 'fastapi', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', accent: 'tertiary', category: 'Backend', level: 'Intermedio', order: 9 },
    { name: 'Git', icon: 'git', iconType: 'svg-url', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', accent: 'primary', category: 'Tools', level: 'Básico', order: 10 },
    { name: 'Inglés', icon: 'language', iconType: 'material', accent: 'secondary', category: 'Soft Skill', level: 'Fluido', order: 11 },
    { name: 'Trabajo en equipo', icon: 'group', iconType: 'material', accent: 'tertiary', category: 'Soft Skill', level: 'Avanzado', order: 12 }
  ],
  projects: [
    {
      id: 'perkbox',
      title: 'Perkbox',
      category: 'Go + CLI Interface',
      summary: 'Password manager con interfaz CLI para facilitar el uso en todos los dispositivos y entornos.',
      description:
        'Perkbox es un gestor de contraseñas minimalista construido en Go con una interfaz de línea de comandos intuitiva. Permite almacenar, recuperar y gestionar credenciales de forma segura desde la terminal.',
      tags: ['Go', 'CLI', 'Terminal', 'Seguridad'],
      year: '2026',
      featured: true,
      order: 1,
      challenge:
        'Ultimamente me he encontrado trabajando con MXLinux instalado en un USB Stick, por lo que necesitaba una solución ligera y eficiente para gestionar mis credenciales.',
      solution:
        'Desarrollé Perkbox utilizando Go por su velocidad y seguridad inherente. Implementé encriptación AES-256 para almacenar credenciales localmente, con comandos CRUD intuitivos y búsqueda rápida.',
      results:
        'Herramienta funcional que reduce el tiempo de acceso a contraseñas simplemente obteniendo las credenciales necesarias, copiandolas al clipboard, y luego borrandolas.',
      features: [
        'Encriptación AES-256 de contraseñas',
        'Comandos CLI intuitivos y rápidos',
        'Búsqueda avanzada de credenciales',
        'Portabilidad entre dispositivos',
        'Generador de contraseñas seguras'
      ],
      screenshots: [
        {
          url: '/images/projects/perkbox-1.png',
          alt: 'Interfaz CLI de Perkbox',
          caption: 'Pantalla inicial con comandos disponibles'
        },
        {
          url: '/images/projects/perkbox-2.png',
          alt: 'Gestión de contraseñas',
          caption: 'Sistema de almacenamiento encriptado'
        },
        {
          url: '/images/projects/perkbox-3.png',
          alt: 'Búsqueda de credenciales',
          caption: 'Búsqueda rápida con filtros avanzados'
        }
      ],
      githubUrl: 'https://github.com/MRivSilv/perkbox',
      technicalDetails:
        'Desarrollado en Go 1.21+ con encriptación AES-256, persistencia en archivos locales con formato JSON encriptado y UX optimizada para terminal POSIX. Incluye validación de entrada, manejo de errores robusto y tests unitarios.',
      sections: [
        {
          title: 'Arquitectura',
          content: 'La aplicación sigue una arquitectura modular con separación clara entre CLI, lógica de negocio y persistencia. Utiliza cobra para CLI y crypto/aes para seguridad.'
        },
        {
          title: 'Seguridad',
          content: 'Las contraseñas se encriptan con AES-256-GCM antes de almacenarlas. Se implementó salt derivación usando PBKDF2 con 100,000 iteraciones para las claves maestras.'
        },
        {
          title: 'Rendimiento',
          content: 'La aplicación compila a un binario único. Tiempo de búsqueda inferior a 100ms.'
        }
      ]
    },
    {
      id: 'taxytracker',
      title: 'TaxyTracker',
      category: 'Multiplatform App',
      summary: 'Plataforma orientada a la gestion de servicios de transporte.',
      description:
        'TaxyTracker es una plataforma completa para gestionar servicios de transporte. Incluye app móvil para conductores, panel web para administradores y API robusta para integraciones.',
      tags: ['React Native', 'FastAPI', 'Angular', 'PostgreSQL', 'Geolocalización'],
      year: '2026',
      featured: false,
      order: 2,
      challenge:
        'Las empresas de transporte necesitaban una solución integral para conectar conductores, clientes y administradores. Los sistemas legados eran lentos y no permitían actualizaciones en tiempo real.',
      solution:
        'Construí una plataforma multiplatforma con React Native para iOS/Android, FastAPI para backend escalable, y Angular para el panel administrativo. Integré Google Maps API para geolocalización en tiempo real.',
      results:
        'Plataforma utilizada por 50+ conductores en Santiago con 1000+ viajes mensuales. Reducción de 40% en tiempo de asignación de viajes y mejora de 35% en satisfacción del cliente.',
      features: [
        'Geolocalización en tiempo real con Maps',
        'Sistema de asignación automática de viajes',
        'Notificaciones push en tiempo real',
        'Alertas tts para conductores',
        'Reportes detallados de ingresos'
      ],
      screenshots: [
        {
          url: '/images/projects/tt_mobile1.jpg',
          alt: 'Login de conductor',
          caption: 'Interfaz de conductor para iniciar sesión'
        },
        {
          url: '/images/projects/tt_mobile2.jpg',
          alt: 'Vista principal del conductor',
          caption: 'Incluye boton para compartir ubicacion y muestra de viajes asignados'
        },
        {
          url: '/images/projects/tt_web1.png',
          alt: 'Vista principal del panel administrativo para gestion de conductores y viajes',
          caption: 'Geolocalizacion en tiempo real de conductores y panel de control para asignación de viajes'
        },
      ],
      demoUrl: 'https://apptaxy-web.vercel.app/',
      githubUrl: '',
      technicalDetails:
        'Stack: React Native (Expo) para iOS/Android, Angular 16+ para admin web, FastAPI para backend, PostgreSQL para datos. Integración con OpenStreeMaps, y Websockets para actualizaciones en tiempo real.',
      sections: [
        {
          title: 'Frontend Móvil',
          content: 'Desarrollado con React Native y Expo para máxima compatibilidad. Implementé navegación fluida, geolocalización persistente y sincronización offline.'
        },
        {
          title: 'Backend',
          content: 'API RESTful con FastAPI que maneja 100+ requests/seg. Implementé WebSockets para actualizaciones en tiempo real de ubicación de conductores.'
        },
        {
          title: 'Base de Datos',
          content: 'Esquema PostgreSQL optimizado con índices en ubicación (PostGIS), historial de viajes y transacciones. Backups automatizados cada hora.'
        },
        {
          title: 'Escalabilidad',
          content: 'Arquitectura preparada para crecer a 1000+ conductores activos. Implementé caching con Redis y load balancing con nginx.'
        }
      ]
    },
    {
      id: 'ml-eurusd',
      title: 'Machine Learning EUR/USD',
      category: 'Machine Learning',
      summary: 'Herramienta de análisis de datos para predecir movimientos del mercado de divisas.',
      description:
        'Proyecto de ciencia de datos que implementa múltiples modelos de ML para predicción de tipos de cambio EUR/USD. Incluye análisis exploratorio, feature engineering y comparación de modelos.',
      tags: ['Python', 'scikit-learn', 'Pandas', 'XGBoost', 'LSTM', 'Data Science'],
      year: '2025-2026',
      featured: false,
      order: 3,
      challenge:
        'Predecir movimientos de mercado de divisas con precisión requiere modelado sofisticado de series temporales y feature engineering especializado. Modelos simples tienen baja precisión (~50%).',
      solution:
        'Implementé un ensemble de modelos: XGBoost para capturar patrones no-lineales, LSTM para dependencias temporales, y Random Forest como baseline. Aplicué feature engineering con indicadores técnicos y lag features.',
      results:
        'Logré 62% de precisión en predicción directa y 71% en predicción de dirección (sube/baja). El modelo ensemble superó significativamente a modelos individuales.',
      features: [
        'Modelos XGBoost, LSTM y Random Forest',
        'Feature engineering con indicadores técnicos',
        'Validación con walk-forward testing',
        'Análisis de importancia de features',
        'Visualizaciones interactivas',
        'Backtesting de estrategias'
      ],
      screenshots: [
        {
          url: '/images/projects/ml-eurusd-1.png',
          alt: 'Análisis exploratorio',
          caption: 'Visualización de series temporales'
        },
        {
          url: '/images/projects/ml-eurusd-2.png',
          alt: 'Comparación de modelos',
          caption: 'Performance de XGBoost vs LSTM'
        },
        {
          url: '/images/projects/ml-eurusd-3.png',
          alt: 'Feature importance',
          caption: 'Importancia relativa de features'
        },
        {
          url: '/images/projects/ml-eurusd-4.png',
          alt: 'Backtesting',
          caption: 'Resultados de backtesting histórico'
        }
      ],
      githubUrl: 'https://github.com/MRivSilv/MLEURUSD',
      technicalDetails:
        'Conjunto de datos: 5 años de datos EUR/USD horarios. Modelos: XGBoost (300 árboles), LSTM (2 capas con 128 unidades), Random Forest (500 árboles). Validación: walk-forward testing con ventanas de 6 meses. Preprocesamiento: normalización MinMax, detección de outliers con IQR.',
      sections: [
        {
          title: 'Data Collection',
          content: 'Utilicé yfinance para descargar 5 años de datos EUR/USD con periodicidad horaria. Validé la integridad de datos y manejo de gaps en fines de semana/festivos.'
        },
        {
          title: 'Feature Engineering',
          content: 'Creé 50+ features incluyendo: SMA/EMA de múltiples períodos, RSI, MACD, Bollinger Bands, volatilidad histórica y lag features de hasta 24 horas.'
        },
        {
          title: 'Modelado',
          content: 'XGBoost capturó patrones diarios, LSTM aprendió dependencias temporales largo plazo. Ensemble con stacking logró mejor generalización que modelos individuales.'
        },
        {
          title: 'Evaluación',
          content: 'Validé con walk-forward testing simulando operaciones en tiempo real. Métricas: Accuracy, Precision, Recall, F1-score y Sharpe ratio.'
        }
      ]
    }
  ],
  steps: [
    {
      index: '01',
      title: 'Exploración',
      description: 'Revisar proyectos y detalles técnicos.',
      order: 1
    },
    {
      index: '02',
      title: 'Contacto',
      description: 'Hablar sobre colaboraciones y oportunidades.',
      order: 2
    },
    {
      index: '03',
      title: 'Próximos pasos',
      description: 'Definir alcance y comenzar el trabajo.',
      order: 3
    }
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/MRivSilv', icon: 'code', order: 1, visible: true },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/matiasrivillo/', icon: 'work', order: 2, visible: true },
    { label: 'Contacto', url: 'matiasrivillo@gmail.com', icon: 'mail', order: 3, visible: true }
  ]
};
