import { Code, Figma, Aperture, LineChart } from 'lucide-react';
import { Service, TeamMember, Project, OrgMember } from './types';

export const LEADERSHIP_DATA = [
  {
    name: "Vir Bhan Sood",
    image: '/img/Sood.jpg',
    description: "25 years’ experience in Quality Assurance and inspection with RITES Limited, premier Third Party Inspection & Consultancy Organization. Conducted inspection of apprx.16000 tons of 60 Kg UIC Rails in China and wheels & wheel sets in Romania besides inspection of Wheels, Axles, Tyres & Wheel sets and other M&P items in foreign countries. Organized and supervised Quality Assurance and inspection of machinery Plant and equipment procured against World Bank funded projects of Health System Corporation of different State Governments on behalf of Oil Sector Clients such as Indian Oil Corporation Limited and IBP Co Ltd. Etc. Upgraded the RITES Northern Region Laboratory for testing of Metals. Surveillance of private and other Government testing laboratories. Vendor assessment prior to their approval .Construction supervision of Retail Outlets of IBP Company in Northern and Eastern Regions for assuring the Quality of works. Trained Lead Assessor in ISO 9001 and ISO 14001, worked as Management Representative Northern Region, RITES for.ISO 9001 from Aug 97 to Feb. 2004.Changed ISO Manual from 1994 version to 2000 version. In 2005 prepared Manual for ISO 17020 for RITES QA Division for its certification as Inspection agency. Consultancy works. Conducted ISO audits in different Divisions of RITES. Freelance Empanelled Assessor for National Accreditation Board for certifying Bodies, for assessment of Certification Bodies and inspection bodies for 08 years. . Member of NABCB Accreditation Committee From August 2021 to July 2023."
  },
  {
    name: "Rajesh Khare",
    image: '/img/rajesh.png',
    description: "Mr. Khare, a Seasoned Chartered Civil Engineering Professional with 45+ years of experience in planning, design, and execution of infrastructure projects including roads, water supply, sewerage, wastewater systems, and smart city developments. Proven expertise in project management, structural design, and quality compliance with strong leadership in large-scale public infrastructure projects. He has gained this experience while working in different capacities in Govt. departments and is associated with us as Country Head."
  },
  {
    name: "Indu Kumar Srivastava",
    image: '/img/indu.png',
    description: "Mr. Indu Kant Srivastava is a distinguished Civil Engineering graduate with an illustrious career spanning 39 years of dedicated service at U.P. Jal Nigam. A veteran in the field of public infrastructure, he has developed an unparalleled mastery over the entire lifecycle of Water Supply Projects, ranging from initial conceptualization and design to ground-level execution and large-scale supervision. Beyond his specialization in water systems, Mr. Srivastava’s technical footprint extends to the successful management of complex Building and Road projects, demonstrating a versatile engineering acumen. His nearly four decades at the forefront of state-level infrastructure development have equipped him with deep expertise in navigating regulatory frameworks, ensuring quality compliance, and leading multi-disciplinary teams through high-stakes engineering challenges. His career is a testament to technical excellence and a lifelong commitment to enhancing public utility systems."
  },
  {
    name: "Arun Kumar Tyagi",
    image: '/img/Arun.jpeg',
    description: "Mr. Arun Kumar Tyagi is a distinguished professional with a robust background in engineering and management (BE, MBA, FIE). He has a proven track record of leadership in the public sector, having served as the Chief Project Officer for UREDA (Uttarakhand Renewable Energy Development Agency) and as an Advisor to the Planning Department for the Government of Uttarakhand. With deep expertise in large-scale project implementation and strategic planning, Mr. Tyagi specializes in steering complex initiatives from conception to execution within government frameworks. As a Fellow of the Institution of Engineers (FIE), he brings a high level of technical authority and administrative excellence to our leadership team."
  },
];

export const CERTIFICATION_LOGOS = [
  { id: 1, src: '/img/iso_9001.svg', alt: 'ISO Certification' },
  { id: 2, src: '/img/iso_27001.svg', alt: 'Quality Standard' },
  { id: 3, src: '/img/startup_india.png', alt: 'Safety Accreditation' },
];
export const SERVICES: Service[] = [
  {
    id: 'soft-dev',
    title: 'AI-Powered Software Development',
    description: 'We engineer intelligent, self-optimizing digital systems — not just apps. Every solution we build is architected with AI at its core, leveraging LLMs, neural inference, and autonomous workflows to deliver platforms that learn, adapt, and scale beyond human limitations.',
    icon: 'Code2',
  },
  {
    id: 'ai',
    title: 'Generative AI & LLM Integration',
    description: 'Unlock the transformative power of Large Language Models. We design and deploy production-grade AI agents, RAG pipelines, and fine-tuned models that automate complex reasoning tasks, synthesize knowledge, and create new value from your enterprise data.',
    icon: 'Brain',
  },
  {
    id: 'ml',
    title: 'Machine Learning & Predictive AI',
    description: 'Transform raw data into autonomous decision-making engines. We architect and train deep learning models, predictive inference systems, and computer vision pipelines — converting your unstructured data into a strategic competitive advantage.',
    icon: 'Cpu',
  },
  {
    id: 'ui-ux',
    title: 'Intelligent UI/UX Design',
    description: 'We craft AI-aware interfaces that anticipate user intent. By combining behavioral analytics, dynamic personalization, and adaptive layouts, we build digital experiences that feel alive — intelligently morphing to each users context and need.',
    icon: 'Figma',
  },
  {
    id: 'motion',
    title: 'Motion Graphics & AI Visualization',
    description: 'Bring your AI systems to life with stunning visual narratives. We create GPU-accelerated animations, real-time data visualizations, and procedurally generated motion design that communicate complex machine intelligence in an instantly graspable, captivating form.',
    icon: 'Aperture',
  },
  {
    id: 'consulting',
    title: 'AI Strategy & Transformation',
    description: 'Navigate the AI revolution with confidence. Our experts conduct AI readiness audits, design your neural architecture roadmap, identify automation opportunities across your value chain, and guide your organization through a structured, low-risk AI adoption journey.',
    icon: 'LineChart',
  },
  {
    id: 'cloud',
    title: 'AI-Native Cloud Infrastructure',
    description: 'Build the elastic backbone your AI workloads demand. We architect GPU-accelerated cloud environments, MLOps pipelines, and serverless inference platforms on AWS, Azure, and GCP — optimized for training, deployment, and real-time AI serving at any scale.',
    icon: 'Cloud',
  },
  {
    id: 'cybersecurity',
    title: 'AI-Driven Cyber Security',
    description: 'Fight modern threats with machine intelligence. Our anomaly-detection models and AI-powered SIEM systems identify zero-day vulnerabilities, behavioral intrusions, and adversarial attacks in real time — providing a self-hardening digital perimeter that evolves with the threat landscape.',
    icon: 'ShieldCheck',
  },
  {
    id: 'data-analytics',
    title: 'Autonomous Data Intelligence',
    description: 'Deploy AI that does not just analyze data — it asks the right questions. We build autonomous analytics engines, vector databases, and semantic search platforms that surface non-obvious patterns, generate narrative insights, and power intelligent decision-making at enterprise scale.',
    icon: 'BarChart3',
  },
  {
    id: 'mobile-dev',
    title: 'On-Device AI Mobile Apps',
    description: 'Bring intelligence to the edge. We build React Native and Flutter applications embedded with on-device ML models for real-time inference, offline AI capabilities, and privacy-preserving personalization — delivering a genius-level mobile experience across iOS and Android.',
    icon: 'Smartphone',
  },
];

export const TEAM: TeamMember[] = [
  { id: '1', name: 'Pranav Srivastava', role: 'Director IT', image: '/img/dir_IT.png' },
  { id: '2', name: 'Shubham Singh', role: 'Technical Lead', image: 'https://picsum.photos/seed/sarah/200' },
  { id: '3', name: 'Satyam Gupta', role: 'Frontend Lead', image: 'https://picsum.photos/seed/marcus/200' },
  { id: '4', name: 'Navajit Mishra', role: 'Backend Lead', image: 'https://picsum.photos/seed/elena/200' },
];

export const ORG_MEMBERS: Record<string, OrgMember> = {
  chairperson: {
    id: "chairperson",
    role: "Chairperson",
    name: "J. P. Srivastava",
    image: '/img/chairperson.png',
    details: "Provides top-level strategic vision and governance. Oversees board operations, guides the long-term business trajectory, and ensures the company's overarching objectives align with its core values and stakeholder interests.",
    experiences: ["30+ years of industry experience.", "Expert in Third-Party Inspection and Quality Assurance.", "Former leadership roles in Govt/PSUs (Ministry of Railways, RDSO, RITES).", "Proven expertise in tendering, marketing, and project management."]
  },

  managingdirector: {
    id: "managingdirector",
    role: "Managing Director",
    name: "Rekha Srivastava",
    image: '/img/managing_dir.png',
    details: "Directs overall daily business operations and executes the company's strategic vision. Acts as the primary bridge between the board of directors and executive leadership to drive organizational growth, operational excellence, and market expansion.",
    experiences: ["15+ years of experience in the trading, manufacturing, and service sectors.", "Directs daily business operations and executes long-term organizational strategy.", "Fosters a strong corporate culture and team development, backed by a PG in Psychology.", "Oversees financial health, business growth, and administrative excellence."]
  },
  directorSales: {
    id: "dir-hr-marketing",
    role: "Director Marketing",
    name: "Anant Srivastava",
    image: 'img/dir_sales.png',
    details: "Drives revenue growth by leading business development initiatives and client acquisition strategies. Cultivates key enterprise partnerships, expands market reach, and manages the end-to-end sales pipeline.",
    experiences: ["Driving revenue growth and B2B tech sales.", "Establishing global client networks.", "Over 12 years of executive sales leadership.", "Conducts in-situ testing, risk analysis, and material assessments.", "Leads structural design deliverables and concept development."]
  },

  directorProject: {
    id: "joint-md",
    role: "Joint Managing Director",
    name: "Rita Kumari",
    image: '/img/dir_project.jpeg',
    details: "Ensures the flawless execution and delivery of all client projects. Oversees project management frameworks, agile methodologies, and resource allocation to guarantee digital solutions are delivered on time, strictly within budget, and up to quality standards.",
    experiences: ["12+ years of industry experience as a Mechanical Engineer.", "Project lifecycle management and Agile methodologies.", "Delivered 50+ enterprise IT projects.", "Expertise in risk and resource management.", "Management Representative for ISO 17020 compliance and NABCB audits."]
  },
  directorFinance: {
    id: "dir-finance",
    role: "Director Finance",
    name: "Akash Srivastava",
    image: '/img/dir_finance.jpeg',
    details: "Manages the company's financial health, including budgeting, forecasting, and capital optimization. Provides strategic financial insights and risk management to support sustainable organizational scaling.",
    experiences: ["Financial planning & analysis.", "Budget management and forecasting.", "10+ years of engineering experience with EliTes India.", "Specializes in consultancy, project monitoring, and vendor assessment."]
  },
  financeTeam: {
    id: "finance-team",
    role: "Finance Team",
    name: "Finance Ops",
    image: '/img/finance_ops.jpg',
    details: "Handles day-to-day financial operations including invoicing, accounts payable/receivable, payroll processing, and financial compliance reporting to maintain flawlessly accurate records.",
    experiences: ["Accounting, taxation, and auditing.", "Quarterly financial reporting.", "Ensuring regulatory financial compliance.", "Maintains accurate financial forecasting, budget tracking, and cost-benefit reporting."]
  },
  directorTech: {
    id: "dir-tech",
    role: "Director IT",
    name: "Pramod Srivastava",
    image: '/img/tech_lead.webp',
    details: "Leads the overarching technology strategy, engineering practices, and product development. Oversees the technical architecture and drives the engineering teams to deliver high-performance, scalable, and innovative software solutions.",
    experiences: ["Cloud architecture and scalable system design.", "Full-stack development leadership.", "5+ years in software engineering.", "Led frontend architecture, UI/UX execution, sprint planning and stakeholder coordination"]
  },
  teamLeader: {
    id: "vp",
    role: "VP",
    name: "VP",
    image: '/img/tech_lead.webp',
    details: "Manages the day-to-day operations of the engineering floor. Mentors developers, enforces rigorous code quality and architectural best practices, and bridges the gap between complex technical execution and project requirements.",
    experiences: ["full-stack engineering and technical leadership.", "Drives agile sprint execution and actively mentors development teams.", "Code reviews, systems architecture, debugging."]
  },
  teamSales: {
    id: "sales-team",
    role: "Sales Team",
    name: "Sales Ops",
    image: '/img/sales_ops.jpeg',
    details: "Supports the overarching sales strategy by analyzing market data, managing CRM tools, generating leads, and optimizing the client onboarding process to maximize conversion rates.",
    experiences: ["Manages end-to-end CRM workflows and sales pipeline optimization.", "Conducts targeted market research to drive lead generation strategies.", "Analyzes core sales metrics to accurately forecast revenue and scale growth."]
  },
  teamProject: {
    id: "project-team",
    role: "Project Team",
    name: "Project Ops",
    image: '/img/project_ops.webp',
    details: "Coordinates daily project tasks, tracks sprint milestones, and facilitates seamless communication between internal engineering teams and external clients to ensure a smooth development lifecycle.",
    experiences: ["Coordinates cross-functional teams to ensure on-time, on-budget delivery.", "Manages resource allocation, risk mitigation, and daily project tracking.", "Maintains continuous, transparent communication with key internal and external stakeholders."]
  },
  architects: {
    id: "architects",
    role: "Architects/Managers & SEs",
    name: "Engineering Team",
    image: '/img/team.jpg',
    details: "The core builders of the company’s digital products. Responsible for writing robust code, designing scalable system architectures, and implementing cutting-edge technologies to solve complex engineering challenges.",
    experiences: ["Building rich scalable software solutions.", "React, Node.js, Python, AWS, Azure.", "Performance optimization & AI integrations."]
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-1',
    title: 'NeboSense — Predictive Maintenance AI',
    category: 'AI / IoT Analytics',
    image: '/img/nebosense.jpg',
    shortDescription: 'NeboSense is an AI-powered IoT sensor analytics platform that uses edge ML models and multivariate anomaly detection to predict equipment failures up to 72 hours before they occur — slashing downtime by 68% across industrial facilities.',
    description: 'NeboSense redefines industrial reliability through artificial intelligence. The platform ingests real-time telemetry from thousands of IoT sensors deployed on critical machinery, running it through a multi-layer anomaly detection stack powered by LSTM neural networks and transformer-based time-series models trained on decades of failure signatures. The system continuously learns from operational feedback, refining its prediction accuracy with every cycle. A centralized AI command dashboard surfaces failure probability scores, remaining useful life estimates, and auto-generated maintenance work orders — enabling maintenance teams to shift from reactive firefighting to proactive, intelligence-driven scheduling. NeboSense has delivered an average 68% reduction in unplanned downtime and a 3.2× ROI on maintenance spend across all deployments.',
    points: [
      'LSTM + Transformer models for multivariate time-series anomaly detection.',
      'Predicts equipment failures up to 72 hours in advance with 94% accuracy.',
      'Real-time ingestion of 10,000+ IoT sensor streams via MQTT and Kafka.',
      'Edge ML inference deployed on-device for zero-latency alerts.',
      'Auto-generated AI maintenance work orders routed to field teams.',
      'Delivered 68% reduction in unplanned downtime across industrial clients.',
      'Continuous federated learning loop improves model accuracy post-deployment.',
    ]
  },
  {
    id: 'ai-2',
    title: 'NeboChat — Multilingual AI Government Assistant',
    category: 'Conversational AI',
    image: '/img/nebochat.jpg',
    shortDescription: 'NeboChat is a production-grade multilingual AI chatbot engine built for government citizen portals. Powered by a fine-tuned LLM with a domain-specific RAG pipeline, it handles 50,000+ citizen queries daily in 12 Indian languages — resolving 84% without human intervention.',
    description: 'NeboChat eliminates the communication barrier between government services and citizens at scale. The engine is built on a fine-tuned large language model augmented with a Retrieval-Augmented Generation (RAG) architecture, grounding every response in official government documents, policy PDFs, and real-time service status APIs. A proprietary multilingual NLP layer enables fluid conversation in 12 Indian languages including Hindi, Tamil, Bengali, and Marathi — with seamless mid-conversation language switching. The system integrates directly with department backends to provide live application status, document checklists, and appointment scheduling through natural dialogue. A human-in-the-loop escalation engine ensures complex cases are routed to the right officer with full AI-generated context briefings. Deployed across 3 state government portals, NeboChat now handles over 50,000 citizen interactions per day.',
    points: [
      'Fine-tuned LLM with domain-specific RAG over government policy documents.',
      'Supports 12 Indian languages with real-time mid-conversation switching.',
      'Resolves 84% of citizen queries autonomously without human escalation.',
      'Live integration with government backends for real-time service status.',
      'AI-generated context briefings for human-in-the-loop escalations.',
      'Deployed across 3 state portals serving 50,000+ daily active users.',
      'End-to-end encrypted with full audit trail for regulatory compliance.',
    ]
  },
  {
    id: 'ai-3',
    title: 'NeboVision — Computer Vision Quality Inspector',
    category: 'Computer Vision / ML',
    image: '/img/nebovision.jpg',
    shortDescription: 'NeboVision is a real-time computer vision quality inspection system that deploys fine-tuned object detection models on manufacturing lines to identify micro-defects at 120fps — achieving 99.2% defect detection accuracy while processing 6× faster than human inspectors.',
    description: 'NeboVision brings the precision of deep learning to industrial quality control. Cameras deployed at every critical point of the manufacturing line stream footage to the NeboVision inference engine, which runs fine-tuned YOLOv8 and Vision Transformer models to detect surface defects, dimensional anomalies, label misalignment, and contamination with sub-millimeter precision at 120 frames per second. The system is trained using a proprietary active learning loop — flagging uncertain predictions for expert review, retraining nightly on the corrected samples, and continuously tightening its accuracy threshold. A spatial analytics dashboard maps defect hotspots across the production floor, enabling root-cause analysis and process corrections that reduce defect rates at the source. NeboVision achieved 99.2% detection accuracy across 47 defect classes in its pilot deployment, eliminating the need for full-time visual inspection staff and reducing quality-related product recalls by 91%.',
    points: [
      'Fine-tuned YOLOv8 + Vision Transformer models for multi-class defect detection.',
      '99.2% detection accuracy across 47 defect categories at 120fps.',
      'Active learning loop: uncertain predictions auto-flagged for expert annotation.',
      'Spatial analytics dashboard maps defect hotspots for process root-cause analysis.',
      'Processes 6× faster than human visual inspection at 5% of the cost.',
      'Reduced client quality-related product recalls by 91% in pilot deployment.',
      'Edge deployment on NVIDIA Jetson hardware — no cloud latency.',
    ]
  },
  // { id: 'p1', 
  //   title: 'Brihanmumbai Municipal Corporation', 
  //   category: 'Software Development', 
  //   image: '/img/BMCLogo.jpeg',
  //   shortDescription: "The Brihanmumbai Municipal Corporation (BMC) Digital Governance Platform is a municipal management system built on the DIGIT Platform using the UPYOG framework. It digitizes departmental workflows and integrates multiple municipal services into a single platform to improve operational efficiency and transparency.",
  //   description: 'The Digital Governance Platform for the Brihanmumbai Municipal Corporation (BMC) was developed using the open-source DIGIT Platform through the UPYOG framework. The project aims to modernize municipal operations by digitizing workflows across multiple departments and improving service delivery for citizens.The system is composed of multiple integrated modules designed to address specific operational needs. The Inventory Management Module allows municipal departments to track, manage, and monitor assets and resources in real time. The Deonar Abattoir Module digitizes slaughterhouse operations, including workflow management, compliance tracking, and operational monitoring. Additionally, the Planning Module (Citizen Side) enables citizens to access planning-related services, submit applications, and interact with municipal authorities through an online interface.The platform is built on a microservice architecture with modular user interface components, allowing the system to scale easily and integrate with other government systems. By centralizing data and automating manual processes, the platform improves transparency, enhances departmental coordination, and ensures faster service delivery for citizens.', 
  //   points:[
  //     "Built using the UPYOG framework on the DIGIT Platform.",
  //     "Focuses on digitizing municipal workflows and services.",
  //     "Uses microservice architecture for scalability.",
  //     "Major modules include-Inventory Management, Deonar Abattoir Management, Planning Module (Citizen Side)",
  //     "Enables real-time asset tracking and workflow management.",
  //     "Improves transparency and departmental coordination.",
  //     "Provides faster and more accessible citizen services."
  //   ]
  // },
  {
    id: 'p2',
    title: 'CISH',
    category: 'Web Development',
    image: '/img/cish.jpg',
    shortDescription: "The website for Central Institute for Subtropical Horticulture (CISH) was developed as a digital platform consisting of a public website and an internal administrative portal. It provides accessible information for the public while allowing institutional staff to manage content efficiently through a secure role-based admin system.",
    description: 'The website for the Central Institute for Subtropical Horticulture (CISH) was developed as a comprehensive digital platform designed to serve both public users and internal employees. The system consists of a people-centric public website and an employee-focused administrative portal.The public website provides citizens, researchers, and stakeholders with easy access to information related to the institute, including research programs, horticulture resources, publications, and institutional announcements. The platform is designed with an intuitive interface to ensure users can easily navigate various sections and stay informed about the institute’s activities and updates.In addition to the public interface, an administrative management panel was developed for internal staff. The admin portal uses role-based access control, allowing different users such as Admin, Director, and Super Admin to manage specific functionalities. Authorized personnel can update website content, publish news, manage institutional data, and maintain the digital presence of the institute securely and efficiently.',
    points: [
      "Consists of two main components:Public website and Employee admin portal",
      "Provides information on:Research initiatives, Publications, Events, Horticulture resources",
      "Admin panel includes role-based access control.",
      "Enables content management and website updates.",
      "Ensures secure and structured information management."
    ]
  },
  {
    id: 'p3',
    title: 'National Farmer Portal',
    category: 'Web Development',
    image: '/img/farmerportal.png',
    shortDescription: "The National Farmer Portal is a centralized, digital agricultural platform designed to bridge the gap between rural farmers and agricultural experts. Operating on a strict, top-to-bottom Role-Based Access Control (RBAC) model, the platform streamlines farmer onboarding through local representatives (Editors), captures their on-the-ground challenges, and routes these issues directly to verified experts (Agronomists) for resolution.",
    description: 'The platform operates on a strict, top-to-bottom Role-Based Access Control (RBAC) hierarchy to ensure secure, organized, and efficient workflows. At the administrative level, Admins manage the overarching system and are exclusively responsible for verifying and onboarding qualified Agronomists, ensuring quality control. To overcome potential digital literacy barriers, Ground Level Editors act as the vital link in specific regions; they are responsible for physically onboarding farmers into the system and actively logging their localized agricultural issues. Once registered, farmers gain access to a secure digital portal where they can manage their profiles, connect with community support networks, and explore available agricultural programs. The issues logged by the Editors are then routed directly to the vetted Agronomists, who review the data and provide expert, actionable solutions. This creates a centralized digital ecosystem that seamlessly connects field realities with expert guidance.',
    points: [
      "Farmers can create profiles and register through an online form to join the platform.",
      "Centralizes farmer data and provides an organized system for agricultural engagement.",
      "Designed to connect farmers with agricultural information, programs, and support networks.",
      "Having a RBAC controlled platform with top to bottom approach.",
      "Regional Editors register farmers to overcome tech barriers.",
      "Admins exclusively verify and onboard expert Agronomists.",
      "Editors log localized field issues; Agronomists resolve them.",
      "A single digital portal for farmer data, issue tracking, and community resources."
    ]
  },
  {
    id: 'p4',
    title: 'UPYOG/DIGIT Platform',
    category: 'Software Architecture',
    image: '/img/upyog.jpg',
    shortDescription: "The DIGIT Platform based UPYOG Platform is an open-source digital governance framework designed to help municipal bodies deliver efficient and transparent public services. It enables government departments to digitize workflows and manage services through a unified platform. The system supports multiple modules for different administrative functions and allows citizens to access municipal services online.",
    points: [
      "Built on the open-source DIGIT Platform framework.",
      "Designed for digital governance of municipal corporations and ULBs.",
      "Provides a modular architecture for different government departments.",
      "Supports modules such as:Property management, Trade licensing, Planning permissions, Inventory management, Grievance systems",
      "Helps digitize workflows and reduce manual paperwork.",
      "Ensures scalability, interoperability, and service standardization.",
      "Provides citizens with online access to municipal services.",
      "Improves transparency, efficiency, and data-driven decision making."
    ]
  },
  {
    id: 'p5',
    title: 'GMR',
    category: 'Web App Selfie Kiosk',
    image: '/img/gmr.avif',
    shortDescription: "The Selfie Kiosk System developed for **GMR Group at Indira Gandhi International Airport provides an interactive digital experience where visitors can capture selfies with themed backgrounds and download them instantly using a QR code.",
    description: 'The Selfie Kiosk System was developed as an interactive digital solution for visitors at Indira Gandhi International Airport, with GMR Group as the client. The kiosk allows travelers to capture personalized selfies and enhance them with digitally generated backgrounds, creating a memorable airport experience.The system provides a user-friendly interface where visitors can take a selfie using the kiosk camera and select from multiple predefined background themes. After capturing the photo, the application processes the image and merges it with the selected background using image compositing techniques.Once the final image is generated, the system creates a QR code that users can scan with their smartphones to download the image instantly. This contactless download method ensures convenience and speed, especially in high-traffic environments like airports.The kiosk is designed for high performance and quick processing, making it suitable for locations with large numbers of visitors. By combining image processing, digital background integration, and QR-based downloads, the system provides an engaging and innovative digital experience for airport passengers.',
    points: [
      "Installed at Indira Gandhi International Airport.",
      "Allows users to capture selfies through a digital kiosk.",
      "Users can select themed digital backgrounds.",
      "System performs image processing and background compositing.",
      "Generates a QR code for instant image download.",
      "Designed for high-footfall environments.",
      "Provides contactless and engaging visitor experience."
    ]
  },
];

export const CLIENT_LOGOS = [
  'GMR Groups', 'EliTes India Pvt. Ltd.', 'UPYOG(Urban Platform for delivery of Online Governance)', 'Nebo Engineering India Pvt. Ltd.'
];

import { Testimonial, Stat, ProcessStep } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajiv Mehta',
    role: 'Program Director',
    company: 'Government Digital Initiative',
    quote: 'Nebo IT Solutions delivered a digital governance platform that transformed how our municipal services operate. Their team understood the complexity of government workflows and built a system that is both powerful and intuitive. The platform now serves thousands of citizens daily.',
    rating: 5,
    projectType: 'Digital Governance Platform'
  },
  {
    id: 't2',
    name: 'Sunita Sharma',
    role: 'Chief Operations Officer',
    company: 'National Agricultural Program',
    quote: 'The farmer portal built by Nebo IT has bridged the gap between our agronomists and rural farmers in ways we never imagined possible. The RBAC system is flawless, and the platform has onboarded over 10,000 farmers in its first quarter.',
    rating: 5,
    projectType: 'Web Application'
  },
  {
    id: 't3',
    name: 'Arjun Kapoor',
    role: 'VP of Technology',
    company: 'Airport Operations Group',
    quote: 'The selfie kiosk system Nebo built for our airport terminal exceeded all expectations. The image processing is lightning fast, and the QR download feature works seamlessly even during peak hours with thousands of daily users.',
    rating: 5,
    projectType: 'Interactive Kiosk System'
  },
  {
    id: 't4',
    name: 'Dr. Priya Desai',
    role: 'Institute Director',
    company: 'Central Research Institute',
    quote: 'Our new institutional website and admin portal have completely modernized how we manage and share research. The role-based system gives our team exactly the right level of access, and the public site beautifully showcases our work.',
    rating: 5,
    projectType: 'Institutional Web Platform'
  },
  {
    id: 't5',
    name: 'Vikram Singh',
    role: 'CTO',
    company: 'Enterprise Solutions Firm',
    quote: 'Working with Nebo IT was a game-changer for our digital transformation. Their expertise in AI and cloud architecture helped us reduce operational costs by 40% while significantly improving our system reliability and performance.',
    rating: 5,
    projectType: 'Cloud & AI Solutions'
  },
];

export const STATS: Stat[] = [
  { id: 's1', value: 6, suffix: '+', label: 'Years of Excellence', icon: 'Calendar' },
  { id: 's2', value: 50, suffix: '+', label: 'Projects Delivered', icon: 'Rocket' },
  { id: 's3', value: 15, suffix: '+', label: 'Clients Served', icon: 'Users' },
  { id: 's4', value: 20, suffix: '+', label: 'Team Members', icon: 'UserCheck' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'ps1',
    step: 1,
    title: 'Discovery',
    description: 'We deep-dive into your business challenges, conduct comprehensive root cause analysis, and define the most effective digital strategy.',
    icon: 'Search'
  },
  {
    id: 'ps2',
    step: 2,
    title: 'Design',
    description: 'Our team crafts user-centric interfaces with stunning visual aesthetics, wireframes, and interactive prototypes tailored to your brand.',
    icon: 'Palette'
  },
  {
    id: 'ps3',
    step: 3,
    title: 'Develop',
    description: 'We build robust, scalable applications using modern tech stacks with agile methodologies, rigorous testing, and continuous integration.',
    icon: 'Code2'
  },
  {
    id: 'ps4',
    step: 4,
    title: 'Deploy & Scale',
    description: 'We launch your solution with zero-downtime deployments, provide ongoing support, and optimize for performance as your business scales.',
    icon: 'Rocket'
  },
];