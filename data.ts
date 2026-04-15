
export const initialData = {
  news: [
    {
      id: 1,
      category: "Product Launch",
      date: "March 15, 2024",
      title: "Introducing AI Analytics for eSmart School",
      excerpt: "Revolutionizing education management with predictive insights and student performance tracking powered by advanced AI algorithms.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      id: 2,
      category: "Events",
      date: "April 10, 2024",
      title: "Global Education Summit 2024",
      excerpt: "Join us at the annual summit where we showcase our latest innovations in educational technology and campus security systems.",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      id: 3,
      category: "Awards",
      date: "February 28, 2024",
      title: "Best Education ERP Provider 2023",
      excerpt: "Efficacious has been recognized as the leading ERP provider for educational institutions in the Maharashtra region.",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
      color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400"
    }
  ],
  contact: {
    office: "Sushma Niwas Plot no 7, Road no 6 Sector 1, New Panvel, Navi Mumbai 410206",
    email: "info@efficacious.co.in",
    phone: "+91 8454943806",
    website: "https://efficacious.co.in",
    socials: {
      linkedin: "#",
      twitter: "#",
      facebook: "#"
    }
  },
  services: [
    {
      id: 1,
      title: "Web Design & Development",
      href: "/services/web-development",
      description: "We don't just build websites; we create digital experiences.",
      iconName: "Layout",
      color: "blue",
      deliverables: ["Custom UI/UX Architecture", "SEO & Performance Optimization", "React/Next.js Development", "CMS Integration"]
    },
    {
      id: 2,
      title: "Mobile App Development",
      href: "/services/mobile-development",
      description: "Reach your customers wherever they are.",
      iconName: "Smartphone",
      color: "indigo",
      deliverables: ["iOS & Android Native Apps", "Flutter/React Native Solutions", "App Store Optimization", "Maintenance & Support"]
    },
    // ... more to be added in context
  ],
  partners: {
    heroSlides: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1920",
        title: "Our Channel Partners",
        subtitle: "Expanding our reach through trusted partnerships across India.",
        overlayColor: "from-blue-900/80 to-slate-900/80"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920",
        title: "Stronger Together",
        subtitle: "Building a robust network to deliver excellence in every region.",
        overlayColor: "from-purple-900/80 to-slate-900/80"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920",
        title: "Local Expertise",
        subtitle: "Connect with our regional representatives for personalized support.",
        overlayColor: "from-emerald-900/80 to-slate-900/80"
      }
    ],
    items: [
      {
        region: "South India",
        name: "Anil Kumar Yeluri",
        address: "G2, Balaji Sai Villa, Hare Ram Bazar, Lawyer Pet, Ongole – 523002. Andhra Pradesh",
        email: "anil.kumar@efficacious.co.in",
        phone: "+91 9030578051 / 8592280673",
        color: "blue"
      },
      {
        region: "North East India",
        name: "Sandip Agarwal",
        address: "183, Bangar Avenue, Block A, 3rd Floor, Kolkata 700055. West Bengal",
        email: "sandip_agarwal@efficacious.co.in",
        phone: "+91 9831919333",
        color: "purple"
      },
      {
        region: "North East India",
        name: "Info Vision (Pradip Bhattacharjee)",
        address: "GE 51, Raj Danga main road kolkata, 700107",
        email: "pradipl@efficacious.co.in",
        phone: "+91 9836589523",
        color: "emerald"
      }
    ]
  },
  gallery: [
    { id: 1, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", caption: "Main Office", category: "Workspace" },
    { id: 2, url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200", caption: "Conference Room", category: "Meetings" },
    { id: 3, url: "/images/gallery/collaboration.png", caption: "Collaborative Space", category: "Innovation" },
    { id: 4, url: "/images/gallery/workspace.png", caption: "Developer HQ", category: "Technology" },
    { id: 5, url: "/images/gallery/breakarea.png", caption: "Creative Breakout", category: "Culture" }
  ],
  team: [
    { 
      id: 1,
      name: "Kamal Agrawal", 
      role: "Founder & CEO", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
      description: "Visionary leader and core finance professional with a passion for innovative IT solutions."
    },
    { 
      id: 2,
      name: "Kiran Kshirsagar", 
      role: "Senior Flutter Android + iOS App Developer", 
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
      description: "Expert in building robust, high-performance cross-platform mobile experiences with smooth animations."
    },
    { 
      id: 3,
      name: "Pranav Patil", 
      role: "Sr. .Net Developer", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      description: "Specializes in highly scalable backend architectures, database optimization, and secure integrations."
    },
    { 
      id: 4,
      name: "Rahul Chauhan", 
      role: "Sr. .Net Developer", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      description: "Passionate about clean code, high-performance web services, and robust cloud infrastructure."
    },
    { 
      id: 5,
      name: "Nandini", 
      role: "Documentation Specialist", 
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
      description: "Ensures clear, concise, and structured documentation for smooth handoffs and client understanding."
    }
  ],
  portfolio: [
    {
      id: 1,
      title: "EuroSchool ERP Implementation",
      category: "Education",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
      description: "A comprehensive ERP solution managing 5000+ students.",
      stats: ["5000+ Students", "98% Efficiency", "Paperless"],
      tags: ["ERP", "Mobile App", "GPS"]
    },
    {
      id: 2,
      title: "Apollo City Hospital",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
      description: "Digital transformation of a multi-specialty hospital with 200+ beds using eSmart Health.",
      stats: ["40% Wait Reduction", "100% Paperless", "200+ Beds"],
      tags: ["Hospital ERP", "EMR", "Inventory"]
    },
    {
      id: 3,
      title: "Orchid Residency",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
      description: "Smart society management for a premium gated community of 500+ apartments.",
      stats: ["500+ Apartments", "Zero Unauth. Entry", "100% Digital"],
      tags: ["Society ERP", "Visitor Mgmt", "Billing"]
    },
    {
      id: 4,
      title: "SwiftLogistics Fleet",
      category: "Logistics",
      image: "https://images.unsplash.com/photo-1519003722824-192d99a24bb1?auto=format&fit=crop&q=80&w=1000",
      description: "Real-time fleet tracking and fuel monitoring for a logistics fleet of 100+ heavy vehicles.",
      stats: ["100+ Trucks", "20% Fuel Saved", "30% Efficiency"],
      tags: ["GPS Tracking", "Fleet Mgmt", "Logistics"]
    }
  ],
  blogs: [
    {
      id: 1,
      title: "5 Ways to Secure Your School Data",
      excerpt: "In the digital age, securing student data is paramount. Learn how to protect your institution's most sensitive information from threats.",
      category: "Security",
      author: "Kamal Agrawal",
      authorRole: "Founder & CEO",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
      color: "blue",
      tags: ["Cybersecurity", "ERP", "Data Privacy"],
      content: [
        {
          heading: "Why School Data Security Matters",
          body: "Educational institutions handle a goldmine of sensitive data — student records, parent contact details, fee history, health information, and academic progress. A single breach can expose thousands of families, erode institutional trust overnight, and invite regulatory penalties. According to recent studies, the education sector ranks among the top targets for ransomware attacks globally."
        },
        {
          heading: "1. Enforce Role-Based Access Control (RBAC)",
          body: "Not every staff member needs access to every record. Implement a strict hierarchy: teachers access only their class data, accountants see only financial records, and principals get a broad but monitored view. eSmart School's RBAC module lets you define granular permissions so sensitive data is always on a need-to-know basis."
        },
        {
          heading: "2. Encrypt Data at Rest and in Transit",
          body: "All student data stored in your ERP should be encrypted using AES-256 standards. More critically, data transmitted between devices — parent apps, teacher dashboards, admin panels — must travel over TLS 1.3 encrypted channels. Avoid SMS-based OTPs for authentication; prefer TOTP authenticators."
        },
        {
          heading: "3. Schedule Regular Security Audits",
          body: "Quarterly penetration tests and annual third-party security audits are non-negotiable for 500+ student institutions. These audits uncover misconfigured servers, unpatched software vulnerabilities, and weak password policies before attackers do. Our team at Efficacious facilitates compliance-ready audit reporting for our ERP clients."
        },
        {
          heading: "4. Enable Multi-Factor Authentication",
          body: "MFA adds a critical second layer of defense. Even if a staff member's password is compromised via phishing, an attacker still cannot log in without the second factor. Enforce MFA for all administrative accounts and make it available as an opt-in for parents using the student portal."
        },
        {
          heading: "5. Train Your People",
          body: "Technology alone cannot seal every gap. A staff member clicking a phishing link or plugging in an unknown USB drive can undo the strongest technical safeguards. Conduct bi-annual cybersecurity awareness workshops, simulate phishing attacks, and establish a clear incident-reporting protocol so threats are surfaced quickly."
        }
      ]
    },
    {
      id: 2,
      title: "The Future of AI in Education",
      excerpt: "Discover how AI-driven analytics are transforming the way schools operate, predict student outcomes, and personalize learning at scale.",
      category: "EdTech",
      author: "Kiran Kshirsagar",
      authorRole: "Sr. Flutter Developer",
      date: "Apr 02, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
      color: "violet",
      tags: ["AI", "Machine Learning", "EdTech"],
      content: [
        {
          heading: "Redefining the Classroom with Artificial Intelligence",
          body: "The global EdTech market is projected to surpass $400 billion by 2028, with AI at its core. From intelligent tutoring systems that adapt to each student's learning pace, to automated grading tools that give teachers back hours every week, AI is no longer a futuristic concept — it is an operational reality in leading schools today."
        },
        {
          heading: "Predictive Analytics: Catching At-Risk Students Early",
          body: "One of AI's most powerful applications in education is identifying students who are at risk of falling behind — weeks before traditional assessments would reveal the problem. By analyzing attendance patterns, homework submission rates, and quiz performance, machine-learning models can flag individual students for early intervention, allowing counselors and teachers to provide targeted support."
        },
        {
          heading: "Personalized Learning Paths",
          body: "No two students learn at the same pace or through the same modalities. AI-powered adaptive learning platforms analyze each student's interaction history and serve content — videos, quizzes, projects — calibrated to their current mastery level. This approach has shown to improve learning outcomes by up to 30% in pilot programs run across schools in Maharashtra and Karnataka."
        },
        {
          heading: "Administrative Automation",
          body: "Beyond the classroom, AI is slashing administrative burdens. Automated fee reminders, AI-generated timetables that minimize conflicts, and smart attendance — including facial-recognition check-ins — are freeing up principals and administrators to focus on strategy rather than operations. eSmart School integrates these capabilities natively."
        },
        {
          heading: "The Road Ahead",
          body: "As natural language processing matures, we will see AI-powered chat tutors capable of answering student queries at 2 AM, and voice-based interfaces allowing young children to interact with digital learning tools without typing. Efficacious is actively investing in these capabilities to ensure our clients stay at the forefront of educational innovation."
        }
      ]
    },
    {
      id: 3,
      title: "How ERP Systems Are Transforming Hospital Management",
      excerpt: "From paperless OPD to real-time bed tracking, modern healthcare ERP solutions are eliminating inefficiencies that cost hospitals time and lives.",
      category: "Healthcare",
      author: "Pranav Patil",
      authorRole: "Sr. .Net Developer",
      date: "Apr 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
      color: "emerald",
      tags: ["Healthcare", "ERP", "Digital Transformation"],
      content: [
        {
          heading: "The Paper-Pile Problem",
          body: "Walk into any mid-sized Indian hospital and you will likely find towers of patient files, handwritten prescriptions deciphered by pharmacists with medical-degree-level guesswork, and registration queues stretching out the door. This is not a resource problem — it is a systems problem. Modern healthcare ERP is the antidote."
        },
        {
          heading: "Real-Time Bed Management",
          body: "One of the most impactful immediate wins from an ERP implementation is live bed-status visibility. Ward managers can see — in real time — which beds are occupied, which are awaiting cleaning, and which are ready for admission. This single capability reduces average patient wait time for inpatient admission by 40% in hospitals that have deployed eSmart Health."
        },
        {
          heading: "Integrated EMR and E-Prescriptions",
          body: "Electronic Medical Records (EMR) give doctors instant access to a patient's full history — past diagnoses, allergies, test results, surgical history — from any terminal in the hospital. E-prescriptions eliminate illegible handwriting, reduce dispensing errors, and create a digital audit trail. Pharmacies integrated with the ERP auto-verify against allergy records before dispensing."
        },
        {
          heading: "Billing Transparency and NABH Compliance",
          body: "Healthcare ERP automates patient billing, consolidating charges from pharmacy, radiology, laboratory, OT, and ward stays into a single clear invoice. For institutions seeking NABH accreditation, the audit trails, consent management modules, and SOP enforcement built into modern ERP systems dramatically reduce the compliance preparation burden."
        },
        {
          heading: "Getting Started with Digital Transformation",
          body: "The transition from legacy systems does not have to be disruptive. Efficacious follows a phased implementation methodology — departments go live in tranches, parallel runs ensure continuity, and on-site training ensures staff adoption. Most clients achieve full operational go-live within 90 days."
        }
      ]
    },
    {
      id: 4,
      title: "GPS Fleet Tracking: A Game-Changer for School Bus Safety",
      excerpt: "Parents should never wonder where their child's bus is. Real-time GPS tracking transforms school transport into a transparent, accountable, and safer system.",
      category: "Technology",
      author: "Rahul Chauhan",
      authorRole: "Sr. .Net Developer",
      date: "Apr 18, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
      color: "amber",
      tags: ["GPS", "Child Safety", "Transport"],
      content: [
        {
          heading: "The Anxiety Every Parent Knows",
          body: "Every morning, thousands of parents wave goodbye and spend the next hour wondering: Has the bus arrived at school? Was my child safely picked up? Is traffic causing a delay? This uncertainty is unnecessary in 2024. Real-time GPS tracking, deeply integrated with the school ERP, can answer all these questions automatically — before the parent even thinks to ask."
        },
        {
          heading: "How Real-Time Tracking Works",
          body: "A tamper-proof GPS device installed in each school bus transmits its location every 5–10 seconds via cellular network to eSmart School's servers. The parent app renders the bus as a moving pin on a Google Maps view. As the bus enters a geofence drawn around the school gate or the student's stop, the parent receives an automatic push notification — 'Your child's bus is 2 minutes away.'"
        },
        {
          heading: "Speed Alerts and Driver Accountability",
          body: "Beyond location, the system monitors bus speed in real time. If the driver exceeds a configured limit — typically 60 km/h in school zones — an immediate alert is sent to the transport manager. Trip replays allow supervisors to review the entire route history, ensuring accountability and adherence to approved paths."
        },
        {
          heading: "Emergency SOS Integration",
          body: "Every bus can be equipped with a physical SOS button. In an emergency, a single press alerts the school control room, transport manager, and pre-designated parents simultaneously, sharing the bus's live location. This capability has been a decisive factor for schools in remote areas with unreliable communication."
        },
        {
          heading: "ROI Beyond Safety",
          body: "Schools that have deployed eSmart Track report a 15% reduction in fuel costs due to optimized routing and reduced idling. Insurance premiums have dropped for some clients as insurers recognise the risk mitigation inherent in a supervised, GPS-tracked fleet. Child safety and operational efficiency — a rare win-win."
        }
      ]
    },
    {
      id: 5,
      title: "5 Signs Your Restaurant Needs a POS & ERP Upgrade",
      excerpt: "Long queues, kitchen mix-ups, and end-of-day inventory nightmares — these are symptoms of a restaurant technology problem that has a clear solution.",
      category: "Hospitality",
      author: "Tech Team",
      authorRole: "Efficacious",
      date: "Apr 25, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
      color: "rose",
      tags: ["Restaurant Tech", "POS", "Operations"],
      content: [
        {
          heading: "When Growth Outpaces Systems",
          body: "A restaurant that thrives on a spreadsheet and a basic POS when serving 50 covers a day will buckle under the same setup when demand scales to 200. The signs of system stress are unmistakable — and costly. Here are five that should prompt an immediate technology audit."
        },
        {
          heading: "Sign 1: Your Waitstaff Are Running Order Slips to the Kitchen",
          body: "Paper dockets are the single largest source of kitchen errors in F&B operations. Misread handwriting, lost slips, and miscommunicated modifications translate directly to food waste, re-fires, and angry customers. A Kitchen Display System (KDS) integrated with a digital POS routes orders to the exact kitchen station the moment a waiter taps 'Submit' on a tablet."
        },
        {
          heading: "Sign 2: You Cannot Tell Your Food Cost Percentage in Real Time",
          body: "If calculating your daily food cost requires a manual stock-take and an Excel formula, you are flying blind. A proper restaurant ERP tracks ingredient consumption per dish, flags variance from recipe standards, and gives you live food cost percentage — so you can course-correct pricing or portion size proactively rather than retrospectively."
        },
        {
          heading: "Sign 3: Table Turnover Is Slowing Down",
          body: "Slow billing is the silent killer of restaurant revenue. If your staff are queuing at a single POS terminal to process payments, or manually splitting bills between five friends, you are losing table turns. Mobile POS handhelds on the floor — with integrated payment gateways — can reduce average billing time from 8 minutes to under 90 seconds."
        },
        {
          heading: "Sign 4: You Have No Data On Your Best and Worst Sellers",
          body: "Menu engineering — the practice of analysing profitability and popularity of individual dishes to inform placement and pricing decisions — is impossible without sales data. A modern restaurant ERP gives you a daily menu performance heatmap. Drop the loss-makers, promote the stars, and watch margin climb."
        },
        {
          heading: "Sign 5: Reservation Management Is a Notebook",
          body: "A paper reservation book cannot send SMS reminders, cannot integrate with a Google Business listing for online bookings, and certainly cannot auto-release no-show tables to a digital waitlist. eSmart Restaurant's table reservation module does all three. The average no-show rate for restaurants using automated reminders drops by 60%."
        }
      ]
    }
  ],
  careers: [
    {
      id: 1,
      title: "Marketing & Sales Executive",
      experience: "3-4 Years",
      department: "Sales",
      type: "Full Time",
      description: "We are looking for a dynamic Marketing or Sales Executive.",
      criteria: ["3 to 4 years of ERP Sales Experience", "MBA (Marketing)"]
    }
  ],
  about: {
    hero: {
      title: "About Us",
      subtitle: "Efficacious is synonymous with Efficiency. Providing innovative & efficient solutions to make life Safe, Secure & Easy.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000"
    },
    whoWeAre: {
      title: "Who We Are",
      content: [
        "Incorporated in 2012 by Mr. Kamal Agrawal, a core finance professional, we started with a vision to create innovative IT solutions for selective target segments.",
        "While we began with IT outsourcing, today Efficacious focuses on creating complete ERP solutions for schools and education institutes. Our mission is to revolutionize school operations with Child Security as the prime focus.",
        "We are a team of dedicated professionals committed to delivering high-quality, scalable, and secure software solutions that empower businesses and institutions to thrive in the digital age."
      ],
      yearsExperience: "10+",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    },
    vision: {
      title: "Our Vision",
      content: "To be the global leader in providing innovative and efficient ERP solutions that set new standards in user experience and operational excellence.",
      points: ["Global Reach", "Technological Innovation", "User-Centric Design"]
    },
    mission: {
      title: "Our Mission",
      content: "Our mission is to make life Safe, Secure & Easy through technology. We strive to empower educational institutions and businesses with tools that simplify complexity.",
      points: ["Child Security First", "Operational Efficiency", "Scalable Solutions"]
    },
    values: [
      { id: 1, title: "Innovation", description: "Constantly pushing boundaries to create better solutions." },
      { id: 2, title: "Integrity", description: "Building trust through transparency and ethical practices." },
      { id: 3, title: "Excellence", description: "Striving for the highest quality in everything we do." },
      { id: 4, title: "Security", description: "Ensuring the safety and privacy of data for all users." }
    ]
  },
  products: [
    {
      id: 1,
      title: "eSmart School",
      enabled: true,
      href: "/products/esmart-school",
      iconName: "GraduationCap",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      bgAccent: "bg-blue-500/10",
      textAccent: "text-blue-600 dark:text-blue-400",
      description: "A complete ERP solution for schools & educational institutes.",
      heroTitle: "Smart Management for Modern Schools",
      heroSubtitle: "A complete ecosystem that connects parents, teachers, and students. Streamline operations while keeping child security as the prime focus.",
      features: [
        {
          id: 10,
          title: "Centralized Dashboard",
          description: "A comprehensive view for parents, teachers, and admins. Get real-time updates on attendance, circulars, and academic progress at a glance.",
          iconName: "Monitor",
          details: ["Real-time Notifications", "Daily Event Summary", "Quick Action Shortcuts"],
          color: "bg-blue-500",
          textAccent: "text-blue-600"
        },
        {
          id: 11,
          title: "Smart Attendance",
          description: "Say goodbye to manual registers. Teachers can mark attendance via the app, triggering instant notifications to parents for absentees.",
          iconName: "Calendar",
          details: ["Instant Parent Alerts", "Monthly Reports", "Leave Management"],
          color: "bg-green-500",
          textAccent: "text-green-600"
        },
        {
          id: 12,
          title: "Fee Management",
          description: "Automated fee reminders and secure online payment gateway. Parents can view invoices, pay fees, and download receipts instantly.",
          iconName: "CreditCard",
          details: ["Secure Gateway", "Auto-Receipt Generation", "Due Date Reminders"],
          color: "bg-orange-500",
          textAccent: "text-orange-600"
        },
        {
          id: 13,
          title: "Live Bus Tracking",
          description: "GPS-enabled transport management ensures child safety. Parents can track the school bus in real-time and receive proximity alerts.",
          iconName: "Bus",
          details: ["Real-time Map View", "ETA Notifications", "Driver Details"],
          color: "bg-purple-500",
          textAccent: "text-purple-600"
        },
        {
          id: 14,
          title: "Result & Analysis",
          description: "Detailed performance reports and analytics. Visualize student progress over time with graphical representations of grades.",
          iconName: "BarChart3",
          details: ["Performance Graphs", "Term-wise Comparison", "Downloadable Report Cards"],
          color: "bg-red-500",
          textAccent: "text-red-600"
        }
      ],
      modules: [
        { title: "Admission Management", iconName: "Users" },
        { title: "Library Management", iconName: "Library" },
        { title: "HR & Payroll", iconName: "Users" },
        { title: "Inventory", iconName: "FileText" },
        { title: "Homework & Assignments", iconName: "BookOpen" },
        { title: "Communication Center", iconName: "Bell" }
      ],
      stats: [
        { label: "Schools Onboarded", value: "500+" },
        { label: "Parents Connected", value: "1M+" },
        { label: "Uptime Guaranteed", value: "99.9%" }
      ]
    },
    {
      id: 2,
      title: "eSmart Track",
      enabled: true,
      href: "/products/esmart-track",
      iconName: "Truck",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-orange-400 via-amber-500 to-yellow-600",
      bgAccent: "bg-orange-500/10",
      textAccent: "text-orange-600 dark:text-orange-400",
      description: "Advanced fleet management and logistics tracking.",
      heroTitle: "Total Control Over Your Fleet",
      heroSubtitle: "Optimize routes, reduce fuel costs, and ensure vehicle security with our advanced GPS tracking and fleet management ERP.",
      features: [
        {
          id: 1,
          title: "Real-time Fleet Tracking",
          description: "Monitor your entire fleet's location live on a map. Get instant updates on vehicle status, speed, and direction with pinpoint accuracy.",
          iconName: "MapPin",
          details: ["Live GPS Coordinates", "Route Playback", "Traffic Overlays"],
          color: "bg-blue-600",
          textAccent: "text-blue-600"
        },
        {
          id: 20,
          title: "Fuel Management",
          description: "Drastically reduce operational costs by monitoring fuel consumption patterns. Detect fuel theft and abnormal drops instantly.",
          iconName: "Fuel",
          details: ["Consumption Reports", "Theft Alerts", "Refill Logs"],
          color: "bg-amber-600",
          textAccent: "text-amber-600"
        },
        {
          id: 21,
          title: "Driver Behavior Analysis",
          description: "Ensure safety and reduce wear and tear. Our system scores drivers based on harsh braking, rapid acceleration, and over-speeding.",
          iconName: "Users",
          details: ["Driver Scorecards", "Safety Violations", "Training Needs"],
          color: "bg-emerald-600",
          textAccent: "text-emerald-600"
        },
        {
          id: 22,
          title: "Geofencing & Alerts",
          description: "Create virtual boundaries for your vehicles. Receive instant push notifications when a vehicle enters or leaves a designated zone.",
          iconName: "Navigation",
          details: ["Zone Entry/Exit", "Route Deviation", "Unauthorized Usage"],
          color: "bg-indigo-600",
          textAccent: "text-indigo-600"
        },
        {
          id: 23,
          title: "Smart Reporting",
          description: "Comprehensive analytics at your fingertips. Generate detailed trip reports, idle time summaries, and distance traveled logs.",
          iconName: "BarChart3",
          details: ["Daily Trip Summary", "Idle Time Reports", "Export to PDF/Excel"],
          color: "bg-violet-600",
          textAccent: "text-violet-600"
        }
      ],
      modules: [
        { title: "Trip Management", iconName: "Route" },
        { title: "Vehicle Maintenance", iconName: "Settings" },
        { title: "Expense Manager", iconName: "Activity" },
        { title: "Document Wallet", iconName: "ShieldCheck" },
        { title: "Driver App", iconName: "Smartphone" },
        { title: "SOS & Emergency", iconName: "AlertTriangle" }
      ],
      stats: [
        { label: "Average Fuel Savings", value: "20%" },
        { label: "Vehicles Tracked", value: "15k+" },
        { label: "Increased Efficiency", value: "30%" }
      ]
    },
    {
      id: 3,
      title: "eSmart Health",
      enabled: true,
      href: "/products/esmart-health",
      iconName: "Activity",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      bgAccent: "bg-emerald-500/10",
      textAccent: "text-emerald-600 dark:text-emerald-400",
      description: "A comprehensive, paperless solution for hospitals and clinics. Enhance patient care, optimize resources, and streamline administration.",
      features: [
        {
          id: 30,
          title: "Patient Management",
          description: "Streamline the entire patient journey from registration to discharge. Manage appointments, bed allocation, and patient history effortlessly.",
          iconName: "Users",
          details: ["Online Appointments", "Real-time Bed Status", "Discharge Summary"],
          color: "bg-emerald-500",
          textAccent: "text-emerald-600"
        },
        {
          id: 31,
          title: "Doctor's Workbench",
          description: "Empower doctors with a dedicated digital workspace. Access electronic medical records (EMR), write prescriptions, and view lab reports instantly.",
          iconName: "Stethoscope",
          details: ["E-Prescriptions", "Patient History", "Diagnosis Tools"],
          color: "bg-teal-500",
          textAccent: "text-teal-600"
        }
      ],
      modules: [
        { title: "EMR / EHR", iconName: "Activity" },
        { title: "OT Management", iconName: "Monitor" },
        { title: "Pharmacy Management", iconName: "Database" }
      ],
      stats: [
        { label: "Wait Time Reduction", value: "40%" },
        { label: "Paperless Operations", value: "100%" },
        { label: "Support", value: "24/7" }
      ]
    },
    {
      id: 4,
      title: "eSmart Restaurant",
      enabled: true,
      href: "/products/esmart-restaurant",
      iconName: "Utensils",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-rose-400 via-pink-500 to-orange-600",
      bgAccent: "bg-rose-500/10",
      textAccent: "text-rose-600 dark:text-rose-400",
      description: "Digitize your restaurant operations from kitchen to customer. Enhance service speed, reduce wastage, and increase profitability.",
      features: [
        {
          id: 40,
          title: "Digital Menu & Ordering",
          description: "Provide a seamless contactless experience. Customers can scan QR codes to view vivid menus and place orders directly.",
          iconName: "QrCode",
          details: ["Contactless Ordering", "Dynamic Menu Updates", "Upselling Prompts"],
          color: "bg-rose-500",
          textAccent: "text-rose-600"
        },
        {
          id: 41,
          title: "Kitchen Display System",
          description: "Streamline your kitchen operations. Replace noisy printers with smart screens that route orders to specific stations.",
          iconName: "Monitor",
          details: ["Station-wise Routing", "Color-coded Status", "Prep Time Tracking"],
          color: "bg-orange-500",
          textAccent: "text-orange-600"
        }
      ],
      modules: [
        { title: "Table Reservation", iconName: "Layers" },
        { title: "Waitlist Management", iconName: "Coffee" },
        { title: "Billing & POS", iconName: "CreditCard" }
      ],
      stats: [
        { label: "Table Turnover", value: "+30%" },
        { label: "Food Cost Reduction", value: "15%" },
        { label: "Order Errors", value: "0%" }
      ]
    },
    {
      id: 5,
      title: "emart Queue",
      enabled: true,
      href: "/products/emart-queue",
      iconName: "Timer",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-violet-400 via-fuchsia-500 to-pink-600",
      bgAccent: "bg-violet-500/10",
      textAccent: "text-violet-600 dark:text-violet-400",
      description: "Eliminate physical queues with smart slot booking and QR-based entry for banks, hospitals, post offices, temples, and more.",
      heroTitle: "End Queues. Start Living.",
      heroSubtitle: "A next-generation slot-booking platform that connects citizens to any service provider, replacing waiting lines with mobile bookings and contactless QR-code entry.",
      features: [
        {
          id: 50,
          title: "Smart Slot Booking",
          description: "End users select date, time, and service provider from the mobile app. Instant availability check and confirmation in under 60 seconds.",
          iconName: "Calendar",
          details: ["Date & Time Selection", "Real-time Availability", "Instant Confirmation"],
          color: "bg-violet-600",
          textAccent: "text-violet-600"
        },
        {
          id: 51,
          title: "QR Code Entry Pass",
          description: "A unique encrypted QR code is generated on slot confirmation. Users present it at the entry scanner for contactless, queue-free access.",
          iconName: "QrCode",
          details: ["Encrypted QR Generation", "Tap-to-Show on Mobile", "Contactless Entry"],
          color: "bg-indigo-600",
          textAccent: "text-indigo-600"
        }
      ],
      modules: [
        { title: "User Mobile App", iconName: "Smartphone" },
        { title: "Admin Dashboard", iconName: "BarChart3" },
        { title: "QR Scanner Portal", iconName: "QrCode" },
        { title: "Push Notifications", iconName: "Bell" },
        { title: "Analytics", iconName: "TrendingUp" },
        { title: "Multi-branch", iconName: "Building2" }
      ],
      stats: [
        { label: "Wait Time Reduction", value: "70%" },
        { label: "Service Categories", value: "50+" },
        { label: "Physical Queues", value: "Zero" }
      ]
    },
    {
      id: 6,
      title: "eSmart Team",
      enabled: true,
      href: "/products/esmart-team",
      iconName: "Briefcase",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
      bgAccent: "bg-violet-500/10",
      textAccent: "text-violet-600 dark:text-violet-400",
      description: "Empower your team with a unified platform for attendance, tasks, and collaboration.",
      heroTitle: "Maximize Productivity, Minimize Chaos",
      heroSubtitle: "Empower your team with a unified platform for attendance, tasks, and collaboration. Built for both office and remote workforce.",
      features: [
        {
          id: 60,
          title: "Task Management",
          description: "Assign tasks, track progress, and collaborate in real-time. Ensure your team stays aligned.",
          iconName: "CheckSquare",
          details: ["Kanban Boards", "Task Reminders", "File Sharing"],
          color: "bg-violet-500",
          textAccent: "text-violet-600"
        },
        {
          id: 61,
          title: "Smart Attendance",
          description: "Geo-fenced and biometric attendance systems tailored for office and field staff.",
          iconName: "Calendar",
          details: ["Geo-Tagging", "Selfie Attendance", "Shift Management"],
          color: "bg-purple-500",
          textAccent: "text-purple-600"
        }
      ],
      modules: [
        { title: "HRIS Core", iconName: "Users" },
        { title: "Payroll Processing", iconName: "DollarSign" },
        { title: "Recruitment", iconName: "Briefcase" }
      ],
      stats: [
        { label: "Productivity Boost", value: "25%" },
        { label: "Time Saved/Week", value: "10hrs" },
        { label: "Transparency", value: "100%" }
      ]
    },
    {
      id: 7,
      title: "eSmart Society",
      enabled: true,
      href: "/products/esmart-society",
      iconName: "Building2",
      appStoreLink: "#",
      playStoreLink: "#",
      gradient: "from-indigo-500 via-blue-600 to-cyan-700",
      bgAccent: "bg-indigo-500/10",
      textAccent: "text-indigo-600 dark:text-indigo-400",
      description: "A comprehensive platform to manage housing societies and gated communities.",
      heroTitle: "Smart Living, Secure Community",
      heroSubtitle: "A comprehensive platform to manage housing societies, apartments, and gated communities. Connect residents effortlessly.",
      features: [
        {
          id: 70,
          title: "Visitor Management",
          description: "Secure your premises with a digital gate pass system. Pre-approve guests instantly.",
          iconName: "Users",
          details: ["Digital Gate Pass", "IVR Notifications", "Staff Attendance"],
          color: "bg-indigo-500",
          textAccent: "text-indigo-600"
        },
        {
          id: 71,
          title: "Billing & Accounting",
          description: "Automate society maintenance bills and payments. Residents can pay online via the app.",
          iconName: "CreditCard",
          details: ["Auto-Invoicing", "Payment Gateway", "Expense Tracking"],
          color: "bg-blue-500",
          textAccent: "text-blue-600"
        }
      ],
      modules: [
        { title: "Admin Dashboard", iconName: "Building2" },
        { title: "Guard App", iconName: "ShieldCheck" },
        { title: "Resident App", iconName: "Smartphone" }
      ],
      stats: [
        { label: "Unauth. Entries", value: "Zero" },
        { label: "Digital Payments", value: "100%" },
        { label: "Complaint Res.", value: "24h" }
      ]
    }
  ],
  gallerySettings: {
    enabled: true
  }
};
