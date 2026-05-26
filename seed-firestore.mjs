import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const DATA = {
  site: {
    config: {
      brand: 'ARCHITECT.OS'
    }
  },
  profile: {
    main: {
      name: 'Tu Nombre',
      role: 'Ingeniero en Computación e Informática',
      headline: 'Construyo productos digitales con enfoque técnico, claridad visual y bases sólidas.',
      bio: 'Portafolio visual preparado para conectarse a Firebase y administrar contenido desde una base de datos sin rehacer la interfaz.',
      availability: 'Abierto a proyectos, prácticas y roles de desarrollo',
      location: 'LatAm / Remoto',
      email: 'hola@portfolio.dev'
    }
  },
  metrics: [
    {
      id: 'metric-1',
      value: '03+',
      label: 'Áreas fuertes',
      detail: 'Frontend, backend y arquitectura.',
      order: 1
    },
    {
      id: 'metric-2',
      value: '06',
      label: 'Tecnologías base',
      detail: 'Stack pensado para escalar.',
      order: 2
    },
    {
      id: 'metric-3',
      value: '24/7',
      label: 'Mentalidad de producto',
      detail: 'Iteración, orden y mantenimiento.',
      order: 3
    }
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'TypeScript',
      icon: 'terminal',
      accent: 'primary',
      category: 'Frontend',
      level: 'Avanzado',
      order: 1
    },
    {
      id: 'skill-2',
      name: 'Angular',
      icon: 'layers',
      accent: 'secondary',
      category: 'Frontend',
      level: 'Intermedio',
      order: 2
    },
    {
      id: 'skill-3',
      name: 'Node.js',
      icon: 'dns',
      accent: 'tertiary',
      category: 'Backend',
      level: 'Intermedio',
      order: 3
    },
    {
      id: 'skill-4',
      name: 'Firebase',
      icon: 'database',
      accent: 'primary',
      category: 'Backend',
      level: 'Base',
      order: 4
    },
    {
      id: 'skill-5',
      name: 'PostgreSQL',
      icon: 'storage',
      accent: 'secondary',
      category: 'Datos',
      level: 'Intermedio',
      order: 5
    },
    {
      id: 'skill-6',
      name: 'UI Systems',
      icon: 'design_services',
      accent: 'tertiary',
      category: 'Diseño',
      level: 'Intermedio',
      order: 6
    }
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Dashboard Académico',
      category: 'Frontend + Datos',
      summary: 'Panel para visualizar métricas, progreso y contenido editable desde una fuente central.',
      tags: ['Angular', 'TypeScript', 'UX'],
      year: '2026',
      featured: true,
      order: 1
    },
    {
      id: 'project-2',
      title: 'Plataforma de Servicios',
      category: 'Arquitectura Web',
      summary: 'Sitio informativo con secciones modulares, navegación clara y foco en conversión.',
      tags: ['Responsive', 'UI System', 'SEO'],
      year: '2025',
      featured: false,
      order: 2
    },
    {
      id: 'project-3',
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
      id: 'step-1',
      index: '01',
      title: 'Diseño',
      description: 'Definir estructura, jerarquía visual y experiencia adaptable.',
      order: 1
    },
    {
      id: 'step-2',
      index: '02',
      title: 'Contenido',
      description: 'Conectar datos de perfil, proyectos y habilidades desde Firebase.',
      order: 2
    },
    {
      id: 'step-3',
      index: '03',
      title: 'Escala',
      description: 'Agregar admin, filtros y edición sin rehacer la interfaz.',
      order: 3
    }
  ],
  socialLinks: [
    {
      id: 'link-1',
      label: 'GitHub',
      url: 'https://github.com/tuusuario',
      icon: 'code',
      order: 1,
      visible: true
    },
    {
      id: 'link-2',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/tuusuario',
      icon: 'work',
      order: 2,
      visible: true
    },
    {
      id: 'link-3',
      label: 'Contacto',
      url: 'mailto:hola@portfolio.dev',
      icon: 'mail',
      order: 3,
      visible: true
    }
  ]
};

function parseArgs(argv) {
  return new Set(argv.slice(2));
}

function resolveServiceAccount() {
  const inlineKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (inlineKey) {
    return JSON.parse(inlineKey);
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credentialsPath && existsSync(credentialsPath)) {
    return JSON.parse(readFileSync(credentialsPath, 'utf8'));
  }

  throw new Error(
    'Falta credencial de servicio. Define FIREBASE_SERVICE_ACCOUNT_KEY o GOOGLE_APPLICATION_CREDENTIALS.'
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const dryRun = args.has('--dry-run');

  if (dryRun) {
    console.log(JSON.stringify(DATA, null, 2));
    return;
  }

  const serviceAccount = resolveServiceAccount();
  const projectId = serviceAccount.project_id ?? process.env.FIREBASE_PROJECT_ID ?? 'portfolio-9b27b';

  initializeApp({
    credential: cert(serviceAccount),
    projectId
  });

  const db = getFirestore();
  const batch = db.batch();

  batch.set(db.doc('site/config'), DATA.site.config);
  batch.set(db.doc('profile/main'), DATA.profile.main);

  for (const metric of DATA.metrics) {
    const { id, ...data } = metric;
    batch.set(db.doc(`metrics/${id}`), data);
  }

  for (const skill of DATA.skills) {
    const { id, ...data } = skill;
    batch.set(db.doc(`skills/${id}`), data);
  }

  for (const project of DATA.projects) {
    const { id, ...data } = project;
    batch.set(db.doc(`projects/${id}`), data);
  }

  for (const step of DATA.steps) {
    const { id, ...data } = step;
    batch.set(db.doc(`steps/${id}`), data);
  }

  for (const link of DATA.socialLinks) {
    const { id, ...data } = link;
    batch.set(db.doc(`socialLinks/${id}`), data);
  }

  await batch.commit();
  console.log(`Firestore populated for project ${projectId}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
