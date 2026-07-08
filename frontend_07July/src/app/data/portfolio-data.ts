// Static portfolio data — previously served by the Spring Boot backend
// (com.eakas.portfolio.controller.PortfolioController). Kept 1:1 identical
// to the original API response shapes so no component templates need to change.

export const PROJECTS: any[] = [
  {
    id: 1,
    name: 'Scriptless Automation Framework',
    shortDesc: 'Non-technical users create & run automated test cases without writing code',
    longDesc: 'An enterprise-grade scriptless automation platform built for BFSI clients. Non-technical users can design, execute, and monitor automated test cases through an intuitive UI. Built with a microservices architecture featuring real-time execution monitoring via WebSockets, secure auth via OAuth2/OIDC/JWT, and AI-integrated workflow orchestration via Apache Kafka. Adopted across 6+ international projects across Scandinavia.',
    stack: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'Selenium', 'Apache Kafka', 'MySQL', 'Docker', 'Kubernetes', 'Jenkins', 'OAuth2', 'JWT'],
    category: ['Fullstack', 'AI/ML'],
    hasAI: true,
    impact: {
      metric1: '78% reduction in manual testing effort',
      metric2: '6+ international BFSI projects (Finland, Norway, Denmark)',
      metric3: '20+ active users across projects'
    },
    architecture: 'microservices',
    githubUrl: 'https://github.com/eakas',
    liveUrl: ''
  },
  {
    id: 2,
    name: 'Trailr – Travel Discovery Platform',
    shortDesc: 'Map-centric travel web app with GeoJSON REST APIs for geospatial exploration',
    longDesc: 'A high-performance travel discovery platform centered around an interactive map experience. Serves GeoJSON-based REST APIs for geospatial data with optimized relational DB schemas. Real-time filtering powered by RxJS. Achieved 80% performance improvement through lazy loading, optimized API payloads, and responsive design techniques.',
    stack: ['Java', 'Angular', 'Spring Boot', 'Mapbox GL JS', 'MySQL', 'RxJS'],
    category: ['Fullstack'],
    hasAI: false,
    impact: {
      metric1: '80% application performance improvement',
      metric2: 'GeoJSON APIs for high-performance geospatial queries',
      metric3: 'Real-time filtering with RxJS'
    },
    architecture: 'monolith-optimized',
    githubUrl: 'https://github.com/eakas',
    liveUrl: ''
  }
];

export const EXPERIENCE: any[] = [
  {
    type: 'work',
    company: 'LTIMindtree',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 – Present',
    logoPlaceholder: 'LTI',
    bullets: [
      'Designed a scalable Selenium-based automation platform using Node.js, TypeScript & Angular which reduced manual testing effort by 78% across 6+ BFSI projects.',
      'Implemented OAuth2/OIDC/JWT authentication and real-time WebSocket communication which improved system security and reduced latency for 20+ active users.',
      'Orchestrated AI-integrated Kafka workflows within microservices resulting in fully asynchronous, resilient BFSI test execution pipelines.'
    ],
    ach: [{ icon: 'trophy', text: '78% testing reduction' },
          { icon: 'chart', text: '6+ intl BFSI projects' },
          { icon: 'users', text: '20+ platform users' }]
  },
  {
    type: 'work',
    company: 'MyCaptain',
    role: 'Junior Technical Associate',
    period: '',
    logoPlaceholder: 'MC',
    bullets: [
      'Developed scalable CRM and reporting tools using React, TypeScript & Redux which improved data tracking and process automation for internal teams.',
      'Implemented Jest-based unit and component testing frameworks which increased code reliability and maintainability across the platform.',
      'Led automation initiatives using JavaScript and React that improved student onboarding efficiency by 20%.'
    ],
    ach: [{ icon: 'trophy', text: '45% onboarding workflow automated' },
          { icon: 'chart', text: '10+ states' },
          { icon: 'users', text: '500+ platform users' }]
  },
  {
    type: 'education',
    company: 'Shri Ramdeobaba College of Engineering',
    role: 'B.Tech – Electronics & Communication Engineering',
    period: '',
    logoPlaceholder: 'RCOEM',
    bullets: [
      'Studied Data Structures & Algorithms, DBMS, OS, Computer Networks, and Software Engineering.',
      "Served as Creative & Technical Systems Head, Students' Representative Council (Jun 2022 – Jan 2024).",
      'Taught Web Development, database fundamentals, and debugging to students in interactive sessions.'
    ]
  }
];

export const SKILLS: any = {
  radar: [
    { category: 'Frontend', value: 82 },
    { category: 'Backend', value: 90 },
    { category: 'DevOps', value: 75 },
    { category: 'AI/ML', value: 70 },
    { category: 'Databases', value: 80 },
    { category: 'System Design', value: 85 }
  ],
  groups: {
    Frontend: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Redux', 'Bootstrap', 'Tailwind', 'RxJS'],
    Backend: ['Spring Boot', 'Java', 'Node.js', 'REST APIs', 'Microservices', 'WebSockets', 'Kafka'],
    DevOps: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'CI/CD', 'Git'],
    'AI/ML': ['LangChain', 'LLM Inferencing', 'TensorFlow', 'PyTorch', 'OpenAI API'],
    Databases: ['MySQL', 'PostgreSQL', 'SQL'],
    Security: ['OAuth2', 'JWT', 'OIDC']
  }
};
