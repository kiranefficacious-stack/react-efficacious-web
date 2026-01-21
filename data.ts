
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
    { id: 1, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", caption: "Main Office" },
    { id: 2, url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200", caption: "Conference Room" }
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
    }
    // ...
  ],
  blogs: [
    {
      id: 1,
      title: "5 Ways to Secure Your School Data",
      excerpt: "In the digital age, securing student data is paramount.",
      category: "Security",
      author: "Tech Team",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      color: "blue"
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
    }
    // ...
  ]
};
