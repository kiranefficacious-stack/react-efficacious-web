
export const initialData = {
  news: [],
  contact: {
    office: "Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6, Sector-1, New Panvel, Raigad, Maharashtra - 410206.",
    email: "info@efficacious.co.in",
    phone: "+91 8454943806",
    website: "https://efficacious.co.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/efficacious-india-limited-9aaa87287/",
      twitter: "",
      facebook: "https://www.facebook.com/efficacioustech",
      instagram: "https://www.instagram.com/esmart_efficacious"
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
      description: "Visionary leader and core finance professional with a passion for innovative IT solutions.",
      linkedin: "https://www.linkedin.com/in/kamal-agrawal-9414182a/"
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
  testimonials: [
    {
      id: 1,
      name: "Rajesh Gupta",
      role: "Principal",
      company: "St. Xavier's International School",
      text: "Efficacious transformed how we manage our school. The parent communication module and real-time attendance alone have saved us countless administrative hours.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      id: 2,
      name: "Dr. Anjali Desai",
      role: "Medical Director",
      company: "City Care Super-Specialty Hospital",
      text: "The eSmart Health system is intuitive and robust. It seamlessly scaled as our patient flow doubled. Billing, appointments, and medical records are all unified.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      id: 3,
      name: "Vikram Malhotra",
      role: "Managing Director",
      company: "Urban Spice Hospitality Group",
      text: "eSmart Restaurant streamlined our kitchen operations and table billing. Order turnaround time reduced by 35% and customer satisfaction is at an all-time high.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      id: 4,
      name: "Pooja Sharma",
      role: "Chief Operating Officer",
      company: "Apex Citizen Services & Banking",
      text: "eSmart Queue replaced chaotic physical waiting lines with smart mobile slot bookings and contactless QR entry. Our branches are calmer and far more productive.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      rating: 5
    }
  ],
  clients: [
    {
      id: 1,
      name: "St. Xavier's School",
      category: "Education",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 2,
      name: "City Care Hospital",
      category: "Healthcare",
      logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 3,
      name: "EuroSchool International",
      category: "Education",
      logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 4,
      name: "Urban Spice Group",
      category: "Hospitality",
      logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 5,
      name: "Apex Financial",
      category: "Banking & Public Sector",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 6,
      name: "Apollo Healthcare Network",
      category: "Healthcare",
      logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300"
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
      location: "Mumbai (On-site)",
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
      comingSoon: false,
      href: "/products/esmart-school/",
      newTab: true,
      iconName: "GraduationCap",
      appStoreLink: "https://apps.apple.com/in/app/e-smart-school/id6448924052",
      playStoreLink: "https://play.google.com/store/apps/details?id=net.esmarts.app.esmart&hl=en_IN",
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
          title: "Homework & Assignments",
          description: "Easy creation and submission of assignments. Teachers can post homework, study materials, and assignments directly, and students can submit their work online.",
          iconName: "BookOpen",
          details: ["Digital Homework Submissions", "Attachment Uploads (PDFs/Images)", "Teacher Grading & Feedback"],
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
        { label: "Schools Onboarded", value: "50+" },
        { label: "Parents Connected", value: "1M+" },
        { label: "Uptime Guaranteed", value: "99.9%" }
      ],
      testimonials: [
        {
          id: 1,
          name: "Mrs. Sunita Sen",
          role: "Principal",
          school: "Delhi Public School, Sector 45",
          organization: "Delhi Public School, Sector 45",
          quote: "eSMARTs has completely transformed how we manage our daily operations. The automated attendance and real-time GPS tracking for transport give our parents immense peace of mind.",
          avatar: "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=",
          stars: 5
        },
        {
          id: 2,
          name: "Dr. Anil Deshmukh",
          role: "School Administrator",
          school: "St. Xavier's High School, Mumbai",
          organization: "St. Xavier's High School, Mumbai",
          quote: "The dashboards provide incredible visibility into student performance and financials. It's an all-in-one platform that saves our administrative staff hours of work every single day.",
          avatar: "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=",
          stars: 5
        },
        {
          id: 3,
          name: "Mrs. Priya Iyer",
          role: "Head of Operations",
          school: "Pinnacle International School, Bengaluru",
          organization: "Pinnacle International School, Bengaluru",
          quote: "Implementation was seamless, and the mobile app is a game-changer. Our teachers can now communicate with parents instantly, fostering a much stronger school community.",
          avatar: "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=",
          stars: 5
        }
      ]
    },

    {
      id: 2,
      title: "eSmart Health",
      enabled: true,
      comingSoon: false,
      href: "https://www.e-smarthealth.co.in/",
      newTab: true,
      iconName: "Activity",
      appStoreLink: "https://apps.apple.com/in/app/e-smart-health/id6756566627",
      playStoreLink: "https://play.google.com/store/apps/details?id=com.efficacious.esmarthealth&hl=en",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      bgAccent: "bg-emerald-500/10",
      textAccent: "text-emerald-600 dark:text-emerald-400",
      description: "Your secure personal health manager. Store medical records, track prescriptions, and find trusted healthcare providers nearby.",
      features: [
        {
          id: 3,
          title: "Your Health Manager",
          description: "Securely store, organize, and manage medical records—including lab reports, vaccination certificates, prescriptions, and hospital visits—in one safe, unified digital vault.",
          iconName: "FolderHeart",
          details: ["Secure PDF/Image Uploads", "Categorized Diagnostic Reports", "Digital Prescriptions Log"],
          color: "bg-emerald-500",
          textAccent: "text-emerald-600"
        },
        {
          id: 40,
          title: "Manage Health & Prescriptions",
          description: "Track doctor visits, follow complex prescription schedules, set timely medication pill reminders, and manage overall wellness for your family.",
          iconName: "Clock",
          details: ["Smart Pill Reminders", "Doctor Visit Schedules", "Adherence Tracking"],
          color: "bg-teal-500",
          textAccent: "text-teal-600"
        }
      ],
      modules: [
        { title: "Health Records", iconName: "FolderHeart" },
        { title: "Pill Reminders", iconName: "Bell" },
        { title: "Care Search", iconName: "Search" }
      ],
      stats: [
        { label: "Secure Storage", value: "100%" },
        { label: "Specialties Covered", value: "10+" },
        { label: "Health Records Access", value: "24/7" }
      ]
    },
    {
      id: 3,
      title: "eSmart Restaurant",
      enabled: true,
      comingSoon: false,
      href: "/products/esmart-restaurant/",
      newTab: true,
      iconName: "Utensils",
      appStoreLink: "https://apps.apple.com/co/app/e-smart-restaurant/id6762969059?l=en-GB",
      playStoreLink: "https://play.google.com/store/apps/details?id=com.efficacious.new_esmartrestaurant",
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
      ],
      testimonials: [
        {
          id: 1,
          name: "Rohit Sharma",
          role: "Owner",
          restaurant: "The Spice Route",
          organization: "The Spice Route",
          city: "Pune",
          category: "finedine",
          quote: "We used to struggle during weekend rushes — wrong orders, lost KOTs, billing errors. Since switching to e-Smart Restaurant our table turnover time has dropped by 20 minutes and billing mistakes are almost zero.",
          stars: 5,
          metric: "20 Min Faster Tables",
          initials: "RS",
          gradient: "from-orange-400 to-red-500"
        },
        {
          id: 2,
          name: "Meera Nair",
          role: "Founder",
          restaurant: "The Daily Bean Cafe",
          organization: "The Daily Bean Cafe",
          city: "Bengaluru",
          category: "cafe",
          quote: "Our staff loves how intuitive the POS is. Training a new steward takes less than 10 minutes. The split billing and UPI integration have made our checkout process incredibly smooth and error-free.",
          stars: 5,
          metric: "10-Min Staff Training",
          initials: "MN",
          gradient: "from-teal-400 to-secondary"
        },
        {
          id: 3,
          name: "Vikram Rathore",
          role: "Managing Director",
          restaurant: "Royal Biryani House",
          organization: "Royal Biryani House",
          city: "Hyderabad",
          category: "chain",
          quote: "Managing inventory across 14 outlets was a nightmare. With e-Smart's central dashboard, I can track real-time stock levels, check consolidated sales reports, and update menus across all outlets with one click.",
          stars: 5,
          metric: "14 Outlets Synced",
          initials: "VR",
          gradient: "from-blue-500 to-indigo-600"
        },
        {
          id: 4,
          name: "Ananya Sen",
          role: "Owner",
          restaurant: "Sweet Treats Bakery",
          organization: "Sweet Treats Bakery",
          city: "Kolkata",
          category: "qsr",
          quote: "The advanced menu management and pre-order tracking features have changed how we operate. We can track custom cake orders, advance payments, and deliveries without any manual errors or paperwork.",
          stars: 5,
          metric: "Zero Missed Orders",
          initials: "AS",
          gradient: "from-purple-400 to-pink-500"
        },
        {
          id: 5,
          name: "Rajesh Patel",
          role: "Founder",
          restaurant: "Spice Kitchen Express",
          organization: "Spice Kitchen Express",
          city: "Ahmedabad",
          category: "chain",
          quote: "Our online orders from Zomato, Swiggy, and our own website now land directly on the POS screen. No more manual entry from three separate tablets. Kitchen efficiency is up by 40% and dispatch is super fast.",
          stars: 5,
          metric: "+40% Kitchen Speed",
          initials: "RP",
          gradient: "from-amber-400 to-orange-500"
        }
      ]
    },
    {
      id: 4,
      title: "eSmart Queue",
      enabled: true,
      comingSoon: false,
      href: "/products/emart-queue/",
      newTab: true,
      iconName: "Timer",
      appStoreLink: "https://apps.apple.com/ph/app/e-smart-queue/id6784201811",
      playStoreLink: "https://play.google.com/store/apps/details?id=com.efficacious.esmartqueue",
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
      ],
      testimonials: [
        {
          id: 1,
          name: "Sarah Jenkins",
          author: "Sarah Jenkins",
          role: "Branch Manager, Metro Financial",
          organization: "Metro Financial",
          quote: "Implementing E-Smart Queue completely transformed our branch. Lobby congestion is down by 80%, and our tellers can actually prepare for specialized consultations before the client even walks through the doors.",
          avatar: "https://i.pravatar.cc/150?u=sarah",
          stars: 5
        },
        {
          id: 2,
          name: "Marcus Chen",
          author: "Marcus Chen",
          role: "Hub Coordinator, Apex Logistics",
          organization: "Apex Logistics",
          quote: "Managing dock doors used to be a nightmare of idle trucks and angry drivers. Now, carriers book their slots in real-time, scan their QR code at the gate, and keep the supply chain moving smoothly.",
          avatar: "https://i.pravatar.cc/150?u=marcus",
          stars: 5
        },
        {
          id: 3,
          name: "Elena Rodriguez",
          author: "Elena Rodriguez",
          role: "Everyday User",
          organization: "Everyday Citizen User",
          quote: "I used to take half a day off work just to renew my license or visit the clinic. With this app, I book my slot, show up exactly at my time, scan my code, and I'm instantly next in line. It's a lifesaver.",
          avatar: "https://i.pravatar.cc/150?u=elena",
          stars: 5
        }
      ]
    }
  ],
  gallerySettings: {
    enabled: true
  }
};
