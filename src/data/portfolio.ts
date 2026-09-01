export interface Project {
  id: string;
  title: string;
  name: string;
  tagline: string;
  category: string;
  featured?: boolean;
  description: string;
  detailedDescription?: string;
  tech: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  demoNote?: string;
  status: 'Completed' | 'In Progress';
  year: string;
  highlights?: string[];
  mockupType?: 'finora' | 'slides' | 'analyzer';
}

export interface SkillItem {
  name: string;
  category: 'proficient' | 'familiar';
  techCategory: 'Core Programming' | 'Web Programming' | 'Libraries & Frameworks' | 'Database & Tools';
  strength: string;
  desc: string;
  iconName: string;
}

export interface EducationMilestone {
  year: string;
  degree: string;
  institution: string;
  status: string;
  grade?: string;
  description: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: 'Technical Certification' | 'Cloud & AI' | 'National Participation';
  issueDate: string;
  credentialId?: string;
  instructorOrSignee?: string;
  organization: string;
  partnerLogoText?: string;
  description: string;
  skillsCovered: string[];
  themeColor: 'teal' | 'purple' | 'blue' | 'amber';
  badge: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date?: string;
  category: 'Certification' | 'Academic Distinction' | 'Personal Quality' | 'National Flagship Participation';
  description: string;
  credentialUrl?: string;
  verified?: boolean;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    subTitle: string;
    headline: string;
    introSummary: string;
    bio: string[];
    mobile: string;
    address: string;
    personalQualities: string[];
    certifications: string[];
    focusPillars: {
      title: string;
      desc: string;
      icon: string;
    }[];
    quickFacts: {
      label: string;
      value: string;
      subtext: string;
    }[];
    statusBadge: string;
    location: string;
    resumeUrl: string;
  };
  skills: SkillItem[];
  projects: Project[];
  education: EducationMilestone[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    mobile: string;
  };
  contact: {
    email: string;
    mobile: string;
    address: string;
    heading: string;
    subheading: string;
    responseTime: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Sirimalla Chandana",
    firstName: "Chandana",
    lastName: "Sirimalla",
    title: "Computer Science & Engineering Student // Software Engineer",
    subTitle: "B.Tech Computer Science & Engineering",
    headline: "Passionate Computer Science Student & Aspiring Software Engineer",
    introSummary: "A passionate B.Tech student specializing in Computer Science and Engineering. Eager to apply computational knowledge to real-world problems and continuously enhance technical and analytical skills in software engineering.",
    bio: [
      "A passionate B.Tech student specializing in Computer Science and Engineering with a strong interest in software engineering. Eager to apply knowledge to solve real-world problems and continuously enhance technical and analytical skills.",
      "Proficient in core programming (C, Java, Python, DSA Problem Solving), modern web technologies (HTML, CSS, JavaScript, React.js, Node.js), and data frameworks (Pandas, NumPy, Matplotlib).",
      "Collaborative, self-motivated, and goal-oriented with a proven track record of academic distinction (8.47 CGPA in B.Tech, 88% in Intermediate, 9.3/10 GPA in SSC)."
    ],
    mobile: "+91 7382100594",
    address: "11-18-1091, Vivekananda Colony, Warangal, 506002",
    personalQualities: [
      "Collaborative and supportive team player",
      "Focused on achieving high standards and goals",
      "Skilled at analyzing and synthesizing complex information",
      "Develops and implements innovative ideas",
      "Self-motivated and driven to continuously learn"
    ],
    certifications: [
      "Cisco Networking Academy (C & Python)",
      "Simplilearn SkillUp (Cloud & NLP)",
      "IEEE National Event Participation (NSPAC & SPYRO)"
    ],
    focusPillars: [
      {
        title: "DSA & Problem Solving",
        desc: "Strengthened algorithmic reasoning in Java, C, and Python to develop optimal computational solutions.",
        icon: "Cpu"
      },
      {
        title: "Full-Stack Web Development",
        desc: "Building interactive, responsive web applications utilizing React.js, JavaScript, Node.js, HTML, and CSS.",
        icon: "Layers"
      },
      {
        title: "Data Analytics & Frameworks",
        desc: "Applying Python, Pandas, NumPy, and Matplotlib for data processing, numerical computation, and insights.",
        icon: "ShieldCheck"
      },
      {
        title: "Verified Certifications",
        desc: "Certified by Cisco, Simplilearn, and active IEEE participant in national congresses and hackathons.",
        icon: "Sparkles"
      }
    ],
    quickFacts: [
      { label: "B.Tech CGPA", value: "8.47 CGPA", subtext: "Vaagdevi College of Engg" },
      { label: "Core Languages", value: "C, Java, Python", subtext: "DSA & OOPs Expertise" },
      { label: "Web & Data", value: "React.js, Node.js", subtext: "Pandas, NumPy, Matplotlib" },
      { label: "Location", value: "Warangal, India", subtext: "Vivekananda Colony" }
    ],
    statusBadge: "Available for Software Engineering Roles & Internships",
    location: "Warangal, India",
    resumeUrl: "https://www.linkedin.com/in/chandana-sirimalla"
  },

  skills: [
    // CORE PROGRAMMING
    {
      name: "C",
      category: "proficient",
      techCategory: "Core Programming",
      strength: "Foundational & Systems",
      desc: "Pointer arithmetic, memory management, algorithmic loops, and modular programming.",
      iconName: "Terminal"
    },
    {
      name: "Java",
      category: "proficient",
      techCategory: "Core Programming",
      strength: "Object-Oriented Programming",
      desc: "Robust OOP concepts, class structures, exception handling, and Java collections.",
      iconName: "Code2"
    },
    {
      name: "Python",
      category: "proficient",
      techCategory: "Core Programming",
      strength: "Versatile & Analytics",
      desc: "Clean scripting, algorithmic problem solving, data processing, and backend automation.",
      iconName: "Cpu"
    },
    {
      name: "DSA Solving",
      category: "proficient",
      techCategory: "Core Programming",
      strength: "Algorithmic Problem Solving",
      desc: "Arrays, linked lists, stacks, queues, trees, searching, sorting, and dynamic problem solving.",
      iconName: "Boxes"
    },

    // WEB PROGRAMMING
    {
      name: "HTML",
      category: "proficient",
      techCategory: "Web Programming",
      strength: "Semantic Structure",
      desc: "Semantic document markup, accessibility standards, and modern clean layouts.",
      iconName: "FileCode"
    },
    {
      name: "CSS",
      category: "proficient",
      techCategory: "Web Programming",
      strength: "Visual & Responsive",
      desc: "Flexbox, responsive grids, media queries, modern UI variables, and smooth animations.",
      iconName: "Palette"
    },
    {
      name: "JavaScript",
      category: "proficient",
      techCategory: "Web Programming",
      strength: "Dynamic Web Logic",
      desc: "ES6+ syntax, asynchronous programming, event handling, and DOM manipulation.",
      iconName: "Code2"
    },
    {
      name: "Node",
      category: "proficient",
      techCategory: "Web Programming",
      strength: "Backend Runtime",
      desc: "Server-side JavaScript runtime, NPM packages, and modular REST API handling.",
      iconName: "Server"
    },

    // LIBRARIES & FRAMEWORKS
    {
      name: "React.js",
      category: "proficient",
      techCategory: "Libraries & Frameworks",
      strength: "Component UI Architecture",
      desc: "Functional components, React hooks, state management, and responsive single-page apps.",
      iconName: "Atom"
    },
    {
      name: "Node.js",
      category: "proficient",
      techCategory: "Libraries & Frameworks",
      strength: "Server & Microservices",
      desc: "Building scalable web server backends, routing, and asynchronous task execution.",
      iconName: "Network"
    },
    {
      name: "Pandas",
      category: "proficient",
      techCategory: "Libraries & Frameworks",
      strength: "Data Analysis & Manipulation",
      desc: "DataFrame structuring, data cleaning, filtering, transformations, and tabular processing.",
      iconName: "Database"
    },
    {
      name: "NumPy",
      category: "proficient",
      techCategory: "Libraries & Frameworks",
      strength: "Numerical Computing",
      desc: "Multidimensional N-dimensional arrays, vectorization, and mathematical computations.",
      iconName: "Layers"
    },
    {
      name: "Matplotlib",
      category: "proficient",
      techCategory: "Libraries & Frameworks",
      strength: "Data Visualization",
      desc: "Plotting graphs, charts, distributions, histograms, and statistical visualizations.",
      iconName: "LayoutGrid"
    }
  ],

  projects: [
    {
      id: "finora-ai",
      title: "Finora AI",
      name: "Finora AI",
      tagline: "Smart Expense Tracker & Financial Intelligence",
      category: "AI / Finance / Web Application",
      featured: true,
      description: "An intelligent personal expense tracker and financial management web application that streamlines income and expense tracking, budget planning, and spending visual analytics in one unified dashboard with responsive real-time calculations and automated categorization.",
      detailedDescription: "Finora AI is a comprehensive modern finance application built to help users manage their financial health. It features an interactive dashboard with live balance summaries, spending trends visual charts, custom category allocations, budget thresholds, and an integrated assistant to provide instant financial insights.",
      tech: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Recharts", "Node.js"],
      features: [
        "Live Income, Expense & Balance Analytics Dashboard",
        "Category-wise spending breakdowns with real-time visual charts",
        "Budget management and transaction ledger tracking",
        "Interactive financial assistant for quick query summaries and spending tips",
        "Responsive, dark-mode native interface with smooth state transitions"
      ],
      highlights: [
        "Interactive Charting with Recharts",
        "Real-Time Expense Breakdown",
        "Smart Budget Monitoring",
        "Instant Financial Assistant"
      ],
      demoUrl: "https://finora-ai-sepia.vercel.app/",
      status: "Completed",
      year: "2026",
      mockupType: "finora"
    },
    {
      id: "student-performance-analyzer",
      title: "Student Performance Analyzer",
      name: "Student Performance Analyzer",
      tagline: "Academic Evaluation & Student Record Management System",
      category: "Python / Data Analytics / Web Application",
      featured: false,
      description: "A web-based system designed to help educators efficiently manage student data and evaluate academic performance. It provides features such as adding, updating, and deleting student records, along with real-time performance analysis using visual charts.",
      detailedDescription: "Built with a Python backend and SQLite database, this platform automates grade computations, maintains student profiles, and displays distribution graphs so teachers and administrators can track academic trends effectively.",
      tech: ["Python", "Pandas", "NumPy", "Matplotlib", "HTML", "CSS", "JavaScript"],
      features: [
        "User Login & Registration system with session management",
        "Add / Update / Delete student records with input validation",
        "Search and filter student performance data",
        "Automatic grade calculation and GPA metrics",
        "Performance analytics dashboard with graphical representation via Matplotlib",
        "Responsive UI design with clean table and chart views"
      ],
      highlights: [
        "Automated Grade Calculations",
        "Interactive Charting with Matplotlib & NumPy",
        "Complete CRUD Data Management",
        "Role-Based Authentication"
      ],
      githubUrl: "https://github.com/sirimallachandana4/Student-Performance-Analyser",
      demoUrl: "https://student-performance-analyser-7wza.onrender.com",
      demoNote: "Hosted on Render free tier (may take a moment to wake on initial load).",
      status: "Completed",
      year: "2026",
      mockupType: "analyzer"
    },
    {
      id: "ai-presentation-suite",
      title: "AI Presentation Suite",
      name: "AI Presentation Suite",
      tagline: "Slide Generator Powered by AI & React",
      category: "React / JavaScript / Productivity",
      featured: false,
      description: "A presentation design suite that intelligently outlines, structures, and themes complete slide decks from any prompt. Designed with robust customization, dual PDF/PowerPoint export systems, and state persistence.",
      detailedDescription: "Empowers educators, developers, and students to convert natural language prompts into structured multi-slide presentations with live preview, customizable visual themes, Markdown slide editing, and export.",
      tech: ["React.js", "JavaScript", "HTML", "CSS", "Node.js", "Tailwind CSS"],
      features: [
        "Intelligent Slide Blueprinting: Instantly generates beautifully structured slide decks.",
        "Curated Visual Themes for clean typography and presentation.",
        "PowerPoint (.pptx) & PDF Export pipelines.",
        "Full client-side state preservation."
      ],
      highlights: [
        "Slide Blueprinting Engine",
        "PowerPoint (.pptx) & PDF Export",
        "Curated Visual Themes",
        "Fast Responsive Rendering"
      ],
      githubUrl: "https://github.com/sirimallachandana4/AI-PPT-Slides-Builder",
      demoUrl: "https://ai-ppt-slides-builder.onrender.com",
      demoNote: "Hosted on Render free tier (may take a moment to wake on initial load).",
      status: "Completed",
      year: "2026",
      mockupType: "slides"
    }
  ],

  education: [
    {
      year: "2024 - 2028",
      degree: "B. Tech in Computer Science and Engineering",
      institution: "Vaagdevi College of Engineering, Warangal",
      status: "8.47 CGPA",
      grade: "8.47 CGPA",
      description: "Pursuing Bachelor of Technology in Computer Science & Engineering with strong academic performance (8.47 CGPA). Mastering core programming (C, Java, Python), Data Structures & Algorithms, and modern web application development.",
      highlights: [
        "Current CGPA: 8.47 / 10.0",
        "Core Focus: C, Java, Python, and DSA Problem Solving",
        "Web Programming: HTML, CSS, JavaScript, React.js, Node.js",
        "Data Frameworks: Pandas, NumPy, Matplotlib"
      ]
    },
    {
      year: "2022 - 2024",
      degree: "Intermediate (MPC)",
      institution: "SR Junior College for Girls, Warangal",
      status: "88%",
      grade: "88%",
      description: "Completed Higher Secondary Intermediate Education with an outstanding 88% score in Mathematics, Physics, and Chemistry, establishing a strong analytical and quantitative foundation.",
      highlights: [
        "Score: 88% Distinction",
        "Mathematics, Physics, Chemistry stream",
        "Analytical problem solving and scientific modeling"
      ]
    },
    {
      year: "2022",
      degree: "Secondary School Certificate (SSC)",
      institution: "Govt High School Narendra Nagar, Warangal",
      status: "9.3 / 10.0 GPA",
      grade: "9.3 / 10 GPA",
      description: "Graduated Secondary School Certificate with stellar academic achievement (9.3 / 10.0 GPA), developing early enthusiasm for mathematics, science, and computing.",
      highlights: [
        "Score: 9.3 / 10.0 GPA",
        "Academic Excellence Distinction",
        "Foundational Mathematics & Science Honors"
      ]
    }
  ],

  certificates: [
    {
      id: "cisco-c-essentials-1",
      title: "C Essentials 1",
      issuer: "Cisco Networking Academy & C++ Institute",
      category: "Technical Certification",
      issueDate: "08 Nov 2025",
      instructorOrSignee: "Shekhar Katukoori (Instructor, Vaagdevi College of Engineering)",
      organization: "Vaagdevi College of Engineering via Cisco Networking Academy",
      partnerLogoText: "Cisco Academy • C++ Institute",
      description: "Comprehensive certification covering C syntax, control flow, functions, arrays, pointers, memory allocation, and modular software design.",
      skillsCovered: ["C Language", "Pointers & Memory", "Control Flow", "Modular Architecture", "Algorithmic Logic"],
      themeColor: "teal",
      badge: "CISCO VERIFIED"
    },
    {
      id: "cisco-python-essentials-1",
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy & Python Institute",
      category: "Technical Certification",
      issueDate: "13 Oct 2025",
      instructorOrSignee: "Shekhar Katukoori (Instructor, Vaagdevi College of Engineering)",
      organization: "Vaagdevi College of Engineering via Cisco Networking Academy",
      partnerLogoText: "Cisco Academy • OpenEDG Python Institute",
      description: "Foundational Python certification covering fundamental computer programming concepts, Python syntax, data types, loops, lists, and functions.",
      skillsCovered: ["Python Syntax", "Data Types & Collections", "Functional Programming", "Algorithm Design"],
      themeColor: "teal",
      badge: "CISCO VERIFIED"
    },
    {
      id: "cisco-python-essentials-2",
      title: "Python Essentials 2",
      issuer: "Cisco Networking Academy & Python Institute",
      category: "Technical Certification",
      issueDate: "27 Oct 2025",
      instructorOrSignee: "Shekhar Katukoori (Instructor, Vaagdevi College of Engineering)",
      organization: "Vaagdevi College of Engineering via Cisco Networking Academy",
      partnerLogoText: "Cisco Academy • OpenEDG Python Institute",
      description: "Advanced Python certification covering Object-Oriented Programming (OOP), modules, packages, string/file processing, exception handling, and generator comprehension.",
      skillsCovered: ["Object-Oriented Programming", "Modules & Packages", "Exception Handling", "File I/O", "Lambda & Generators"],
      themeColor: "teal",
      badge: "CISCO VERIFIED"
    },
    {
      id: "simplilearn-cloud-computing",
      title: "Learn Cloud Computing Fundamentals",
      issuer: "Simplilearn SkillUp",
      category: "Cloud & AI",
      issueDate: "19th June 2026",
      credentialId: "10367103",
      instructorOrSignee: "Krishna Kumar (CEO, Simplilearn)",
      organization: "Simplilearn SkillUp Platform",
      partnerLogoText: "Simplilearn SkillUp",
      description: "Professional certification validating core knowledge of cloud service models (IaaS, PaaS, SaaS), cloud architecture, virtualization, security, and scalability.",
      skillsCovered: ["Cloud Architecture", "IaaS / PaaS / SaaS", "Virtualization", "Cloud Security", "Scalability"],
      themeColor: "purple",
      badge: "SKILLUP VERIFIED"
    },
    {
      id: "simplilearn-nlp-text-mining",
      title: "Natural Language Processing (NLP) & Text Mining",
      issuer: "Simplilearn SkillUp",
      category: "Cloud & AI",
      issueDate: "20th June 2026",
      credentialId: "10370860",
      instructorOrSignee: "Krishna Kumar (CEO, Simplilearn)",
      organization: "Simplilearn SkillUp Platform",
      partnerLogoText: "Simplilearn SkillUp",
      description: "Specialized certification in Natural Language Processing, text parsing, tokenization, stopword filtering, sentiment extraction, and text mining algorithms.",
      skillsCovered: ["Natural Language Processing", "Text Mining", "Tokenization & Stemming", "Sentiment Analysis", "Text Preprocessing"],
      themeColor: "purple",
      badge: "SKILLUP VERIFIED"
    },
    {
      id: "ieee-nspac-2024",
      title: "NSPAC '24 - National Student Professional Awareness Congress",
      issuer: "IEEE Vaagdevi College of Engineering Student Branch (IEEE VCE SB)",
      category: "National Participation",
      issueDate: "13 & 14 November 2024",
      instructorOrSignee: "Mr. Lavan Kumar Adduri (Chair Person) & Mr. B. Nagaraju (Branch Counselor)",
      organization: "IEEE Computer Society, IEEE PES, IEEE CAS, WIE & Vaagdevi College of Engineering",
      partnerLogoText: "IEEE VCE SB • IEEE Computer Society • IEEE PES • IEEE CAS • WIE",
      description: "Certificate of Participation presented for excellent contributions and active engagement in the two-day National Student Professional Awareness Congress (NSPAC'24).",
      skillsCovered: ["Professional Awareness", "Engineering Leadership", "Technical Symposia", "Collaborative Problem Solving"],
      themeColor: "blue",
      badge: "IEEE PARTICIPATION"
    },
    {
      id: "ieee-spyro-6",
      title: "SPYRO 6.0 - Building Smart Solutions For Digital World",
      issuer: "IEEE Vaagdevi Engineering College Student Branch, Warangal",
      category: "National Participation",
      issueDate: "28th & 29th October 2024",
      instructorOrSignee: "Mr. Syed Shariq Sharief (Convenor), Mr. S. David Raj (Chairperson), Ms. Velpula Madhavi (Branch Counselor)",
      organization: "IEEE Computer Society, IEEE ComSoc, IEEE Signal Processing Society, WIE",
      partnerLogoText: "IEEE VEC SB • IEEE ComSoc • IEEE SPS • WIE",
      description: "Certificate of Participation for contributing to the Two-Day National Level Flagship Event SPYRO 6.0 focused on 'Building Smart Solutions For Digital World'.",
      skillsCovered: ["Smart Digital Solutions", "Innovation & Ideation", "IoT & Emerging Tech", "Team Collaboration"],
      themeColor: "amber",
      badge: "IEEE FLAGSHIP"
    }
  ],

  achievements: [
    {
      id: "cert-cisco-group",
      title: "Cisco Networking Academy Certified (C & Python)",
      organization: "Cisco & Vaagdevi College of Engineering",
      date: "Oct - Nov 2025",
      category: "Certification",
      description: "Earned certified credentials in C Essentials 1, Python Essentials 1, and Python Essentials 2 with distinguished completion.",
      verified: true
    },
    {
      id: "cert-simplilearn-group",
      title: "Simplilearn SkillUp Certified (Cloud & NLP)",
      organization: "Simplilearn SkillUp",
      date: "June 2026",
      category: "Certification",
      description: "Completed industry-grade courses in Cloud Computing Fundamentals and Natural Language Processing (NLP) & Text Mining.",
      verified: true
    },
    {
      id: "part-nspac",
      title: "NSPAC '24 National Congress Participant",
      organization: "IEEE Vaagdevi College of Engineering Student Branch",
      date: "13 & 14 Nov 2024",
      category: "National Flagship Participation",
      description: "Participated in National Student Professional Awareness Congress hosted by IEEE VCE SB with IEEE Computer Society and PES.",
      verified: true
    },
    {
      id: "part-spyro",
      title: "SPYRO 6.0 National Flagship Participant",
      organization: "IEEE Vaagdevi Engineering College Student Branch",
      date: "28 & 29 Oct 2024",
      category: "National Flagship Participation",
      description: "Contributed to the two-day National Flagship Event on 'Building Smart Solutions For Digital World'.",
      verified: true
    },
    {
      id: "qual-1",
      title: "Collaborative & Supportive",
      organization: "Personal Quality",
      category: "Personal Quality",
      description: "Works cohesively in teams, communicates effectively, and supports peers in solving complex software problems.",
      verified: true
    },
    {
      id: "qual-2",
      title: "Goal-Driven & Self-Motivated",
      organization: "Personal Quality",
      category: "Personal Quality",
      description: "Focused on achieving high standards, developing and implementing innovative ideas with dedication.",
      verified: true
    }
  ],

  socialLinks: {
    github: "https://github.com/sirimallachandana4",
    linkedin: "https://www.linkedin.com/in/chandana-sirimalla",
    email: "sirimallachandana4@gmail.com",
    mobile: "+91 7382100594"
  },

  contact: {
    email: "sirimallachandana4@gmail.com",
    mobile: "+91 7382100594",
    address: "11-18-1091, Vivekananda Colony, Warangal, 506002",
    heading: "Get In Touch",
    subheading: "Feel free to reach out for software engineering opportunities, internships, or collaborative development.",
    responseTime: "Quick response via Email or Mobile"
  }
};
