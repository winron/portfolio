// Constants file for repeated values throughout the application

export const CONTACT_INFO = {
  email: "liuwinton22@gmail.com",
  github: "https://github.com/winron",
  linkedin: "https://www.linkedin.com/in/winton-liu/",
  resume: "/src/assets/resume.pdf"
} as const;

export const PERSONAL_INFO = {
  name: "Winton",
  greeting: "Hi I'm ",
  description: "With over 4 years of experience building intuitive, scalable, and high-performance web apps, I’ve worked on modernizing legacy systems, designing dashboards to streamline migrations, and making complex platforms feel effortless to use. My focus is on creating smooth, accessible experiences that truly make an impact.",
  welcomeMessage: "Welcome to my digital nook. I hope you enjoy your stay. (:",
  peaceIcon: "peace.svg",
  homeDescriptions: [
    "Software engineer.",
    "Tech enthusiast.", 
    "Lifelong learner."
  ]
} as const;

export const NAVIGATION_SECTIONS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" }
] as const;

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: CONTACT_INFO.linkedin,
    icon: "linkedin.svg"
  },
  {
    name: "GitHub", 
    url: CONTACT_INFO.github,
    icon: "github.svg"
  },
  {
    name: "Email",
    url: `mailto:${CONTACT_INFO.email}`,
    icon: "gmail.svg"
  },
  {
    name: "Resume",
    url: CONTACT_INFO.resume,
    icon: "resume.svg"
  }
] as const;

export const PROJECTS_DATA = [
  { 
    title: 'Bindify', 
    description: 'A desktop application that allows users to control their Spotify playback with customizable keyboard shortcuts',
    githubUrl: 'https://github.com/winron/bindify'
  }
] as const;

// Skills data with icon mappings and category tags
export const SKILLS_DATA = {
  core: [
    { name: 'JavaScript', icon: 'javascript.svg', docs: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 1 },
    { name: 'TypeScript', icon: 'typescript.svg', docs: 'https://www.typescriptlang.org/docs/', category: 1 },
    { name: 'Python', icon: 'python.svg', docs: 'https://docs.python.org/3/', category: 1 },
    { name: 'Java', icon: 'java.svg', docs: 'https://docs.oracle.com/en/java/', category: 1 },
    { name: 'HTML5', icon: 'html5.svg', docs: 'https://developer.mozilla.org/en-US/docs/Web/HTML', category: 1 },
    { name: 'CSS3', icon: 'css3.svg', docs: 'https://developer.mozilla.org/en-US/docs/Web/CSS', category: 1 },
    { name: 'GraphQL', icon: 'graphql.svg', docs: 'https://graphql.org/learn/', category: 1 }
  ],
  libs: [
    { name: 'React', icon: 'react.svg', docs: 'https://react.dev/', category: 2 },
    { name: 'Redux', icon: 'redux.svg', docs: 'https://redux.js.org/', category: 2 },
    { name: 'React Router', icon: 'react_router.svg', docs: 'https://reactrouter.com/', category: 2 },
    { name: 'React Query', icon: 'react_query.svg', docs: 'https://tanstack.com/query/latest', category: 2 },
    { name: 'Axios', icon: 'axios.svg', docs: 'https://axios-http.com/docs/intro', category: 2 },
    { name: 'Styled Components', icon: 'styled_components.svg', docs: 'https://styled-components.com/docs', category: 2 },
    { name: 'Jest', icon: 'jest.svg', docs: 'https://jestjs.io/docs/getting-started', category: 2 },
    { name: 'React Testing Library', icon: 'react_testing.svg', docs: 'https://testing-library.com/docs/react-testing-library/intro/', category: 2 },
    { name: 'React Native', icon: 'react_native.svg', docs: 'https://reactnative.dev/docs/getting-started', category: 2 },
    { name: 'Electron', icon: 'electron.svg', docs: 'https://www.electronjs.org/docs/latest/', category: 2 }
  ],
  tools: [
    { name: 'Git', icon: 'git.svg', docs: 'https://git-scm.com/doc', category: 3 },
    { name: 'Webpack', icon: 'webpack.svg', docs: 'https://webpack.js.org/concepts/', category: 3 },
    { name: 'Postman', icon: 'postman.svg', docs: 'https://learning.postman.com/docs/getting-started/introduction/', category: 3 },
    { name: 'OracleDB', icon: 'oracle.svg', docs: 'https://docs.oracle.com/en/database/', category: 3 },
    { name: 'PostgreSQL', icon: 'postgresql.svg', docs: 'https://www.postgresql.org/docs/', category: 3 },
    { name: 'MongoDB', icon: 'mongodb.svg', docs: 'https://docs.mongodb.com/', category: 3 }
  ]
} as const;

// Animation constants
export const ANIMATION_CONFIG = {
  cardWidth: 196, // 180px + 16px margin
  animationSpeed: 20, // 50fps for smooth animation
  typingSpeed: 125,
  scrollThreshold: 100,
  parallaxSpeed: 0.8
} as const;

// UI constants
export const UI_CONFIG = {
  maxWidth: '1200px',
  sectionPadding: '120px 40px 40px',
  borderRadius: '8px',
  transitionSpeed: '0.3s ease',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
} as const;

// Location and timezone
export const LOCATION_CONFIG = {
  location: 'BROOKLYN',
  timezone: 'America/New_York',
  timeFormat: {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  }
} as const;

// Theme configurations
// Using color palette: ["#dad7cd","#a3b18a","#588157","#3a5a40","#344e41"] with black and white
// Light theme with accessibility compliance (WCAG AA)
export const LIGHT_THEME = {
  background: "#ffffff", // Pure white background
  color: "#000000", // Pure black text (7:1 contrast ratio)
  component: {
    background: "#dad7cd", // Light sage component background
    border: "1px solid #a3b18a", // Medium sage border (4.5:1 contrast)
    boxShadow: "0px 4px 6px rgba(52, 78, 65, 0.15)", // Dark sage shadow
  },
  primary: "#588157", // Medium sage primary (4.5:1 contrast on white)
  secondary: "#3a5a40", // Dark sage secondary (7:1 contrast on white)
  name: "light"
} as const;

// Dark theme with accessibility compliance (WCAG AA)
export const DARK_THEME = {
  background: "#000000", // Pure black background
  color: "#ffffff", // Pure white text (7:1 contrast ratio)
  component: {
    background: "#344e41", // Darkest sage component background
    border: "1px solid #588157", // Medium sage border (4.5:1 contrast)
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)", // Strong shadow for dark mode
  },
  primary: "#a3b18a", // Light sage primary (4.5:1 contrast on black)
  secondary: "#dad7cd", // Lightest sage secondary (7:1 contrast on black)
  name: "dark"
} as const;