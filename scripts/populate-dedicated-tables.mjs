import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dbPath = path.join(process.cwd(), 'backend', 'Efficacious.Api', 'Efficacious.db');

function escapeSql(val) {
  if (val === null || val === undefined) return "''";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

// 1. Fetch current WebsiteContents from SQLite
const rawContents = execSync(`sqlite3 "${dbPath}" "SELECT Key, DataJson FROM WebsiteContents;"`, { encoding: 'utf8' });
const contentsMap = {};

for (const line of rawContents.split('\n')) {
  if (!line.trim()) continue;
  const firstPipe = line.indexOf('|');
  if (firstPipe === -1) continue;
  const key = line.substring(0, firstPipe);
  const jsonStr = line.substring(firstPipe + 1);
  try {
    const parsed = JSON.parse(jsonStr);
    contentsMap[key] = parsed.data !== undefined ? parsed.data : parsed;
  } catch (e) {
    contentsMap[key] = jsonStr;
  }
}

let sql = "BEGIN TRANSACTION;\n";

// 1. Blogs
const blogs = Array.isArray(contentsMap.blogs) && contentsMap.blogs.length > 0 
  ? contentsMap.blogs 
  : [
    {
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
        { heading: "Why School Data Security Matters", body: "Educational institutions handle a goldmine of sensitive data..." }
      ]
    },
    {
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
        { heading: "Redefining the Classroom", body: "The global EdTech market is projected to surpass $400 billion by 2028..." }
      ]
    },
    {
      title: "How eSmart Health Cuts Hospital Wait Times",
      excerpt: "A deep dive into how OPD queue management, automated billing, and EMR integration cut patient wait times by 40% at top multi-specialty hospitals.",
      category: "Healthcare",
      author: "Dr. Anjali Desai",
      authorRole: "Medical Director & Advisor",
      date: "Apr 18, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      color: "emerald",
      tags: ["Healthcare IT", "Hospital ERP", "Patient Flow"],
      content: [
        { heading: "The OPD Bottleneck", body: "Long queues at reception and registration desks..." }
      ]
    }
  ];

sql += "DELETE FROM Blogs;\n";
for (const b of blogs) {
  sql += `INSERT INTO Blogs (Title, Excerpt, Category, Author, AuthorRole, Date, ReadTime, Image, Color, TagsJson, ContentJson, CreatedAt)
VALUES (${escapeSql(b.title)}, ${escapeSql(b.excerpt)}, ${escapeSql(b.category)}, ${escapeSql(b.author)}, ${escapeSql(b.authorRole || '')}, ${escapeSql(b.date)}, ${escapeSql(b.readTime || '')}, ${escapeSql(b.image)}, ${escapeSql(b.color || '')}, ${escapeSql(JSON.stringify(b.tags || []))}, ${escapeSql(JSON.stringify(b.content || []))}, ${escapeSql(new Date().toISOString())});\n`;
}

// 2. Careers
const careers = Array.isArray(contentsMap.careers) ? contentsMap.careers : [];
sql += "DELETE FROM Careers;\n";
for (const c of careers) {
  sql += `INSERT INTO Careers (Title, Department, Type, Experience, Location, Description, CriteriaJson, CreatedAt)
VALUES (${escapeSql(c.title)}, ${escapeSql(c.department)}, ${escapeSql(c.type)}, ${escapeSql(c.experience)}, ${escapeSql(c.location || 'Mumbai (On-site)')}, ${escapeSql(c.description)}, ${escapeSql(JSON.stringify(c.criteria || []))}, ${escapeSql(new Date().toISOString())});\n`;
}

// 3. Galleries
const gallery = Array.isArray(contentsMap.gallery) ? contentsMap.gallery : [];
sql += "DELETE FROM Galleries;\n";
for (const g of gallery) {
  sql += `INSERT INTO Galleries (Caption, Category, Url, IsActive, CreatedAt)
VALUES (${escapeSql(g.caption)}, ${escapeSql(g.category)}, ${escapeSql(g.url)}, ${g.isActive !== false ? 1 : 0}, ${escapeSql(new Date().toISOString())});\n`;
}

// 4. CompanyContacts
const contact = contentsMap.contact || {};
sql += "DELETE FROM CompanyContacts;\n";
sql += `INSERT INTO CompanyContacts (Office, Email, Phone, Website, SocialsJson, UpdatedAt)
VALUES (${escapeSql(contact.office)}, ${escapeSql(contact.email)}, ${escapeSql(contact.phone || '+91 8454943806')}, ${escapeSql(contact.website || 'https://efficacious.co.in')}, ${escapeSql(JSON.stringify(contact.socials || {}))}, ${escapeSql(new Date().toISOString())});\n`;

// 5. NewsArticles
const news = Array.isArray(contentsMap.news) && contentsMap.news.length > 0 
  ? contentsMap.news 
  : [
    {
      category: "Product Launch",
      date: "March 15, 2024",
      title: "Introducing AI Analytics for eSmart School",
      excerpt: "Revolutionizing education management with predictive insights and student performance tracking powered by advanced AI algorithms.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      category: "Events",
      date: "April 10, 2024",
      title: "Global Education Summit 2024",
      excerpt: "Join us at the annual summit where we showcase our latest innovations in educational technology and campus security systems.",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      category: "Awards",
      date: "February 28, 2024",
      title: "Best Education ERP Provider 2023",
      excerpt: "Efficacious has been recognized as the leading ERP provider for educational institutions in the Maharashtra region.",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
      color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400"
    }
  ];

sql += "DELETE FROM NewsArticles;\n";
for (const n of news) {
  sql += `INSERT INTO NewsArticles (Title, Category, Date, Excerpt, Image, Color, ContentJson, CreatedAt)
VALUES (${escapeSql(n.title)}, ${escapeSql(n.category)}, ${escapeSql(n.date)}, ${escapeSql(n.excerpt)}, ${escapeSql(n.image)}, ${escapeSql(n.color || '')}, ${escapeSql(JSON.stringify(n.content || []))}, ${escapeSql(new Date().toISOString())});\n`;
}

// 6. Partners
const partnersList = (contentsMap.partners && Array.isArray(contentsMap.partners.items)) ? contentsMap.partners.items : [
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
    email: "sandip.agarwal@efficacious.co.in",
    phone: "+91 9830024471 / 9330058866",
    color: "emerald"
  }
];

sql += "DELETE FROM Partners;\n";
for (const p of partnersList) {
  sql += `INSERT INTO Partners (Region, Name, Address, Email, Phone, Color, CreatedAt)
VALUES (${escapeSql(p.region)}, ${escapeSql(p.name)}, ${escapeSql(p.address)}, ${escapeSql(p.email)}, ${escapeSql(p.phone)}, ${escapeSql(p.color || '')}, ${escapeSql(new Date().toISOString())});\n`;
}

// 7. Portfolios
const portfolioList = Array.isArray(contentsMap.portfolio) && contentsMap.portfolio.length > 0 
  ? contentsMap.portfolio 
  : [
    {
      title: "EuroSchool ERP Implementation",
      category: "Education",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
      description: "A comprehensive ERP solution managing 5000+ students.",
      stats: ["5000+ Students", "98% Efficiency", "Paperless"],
      tags: ["ERP", "Mobile App", "GPS"]
    },
    {
      title: "Apollo City Hospital",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
      description: "Digital transformation of a multi-specialty hospital with 200+ beds using eSmart Health.",
      stats: ["40% Wait Reduction", "100% Paperless", "200+ Beds"],
      tags: ["Hospital ERP", "EMR", "Inventory"]
    },
    {
      title: "Orchid Residency",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
      description: "Smart society management for a premium gated community of 500+ apartments.",
      stats: ["500+ Apartments", "Zero Unauth. Entry", "100% Digital"],
      tags: ["Society ERP", "Visitor Mgmt", "Billing"]
    },
    {
      title: "SwiftLogistics Fleet",
      category: "Logistics",
      image: "https://images.unsplash.com/photo-1519003722824-192d99a24bb1?auto=format&fit=crop&q=80&w=1000",
      description: "Real-time fleet tracking and fuel monitoring for a logistics fleet of 100+ heavy vehicles.",
      stats: ["100+ Trucks", "20% Fuel Saved", "30% Efficiency"],
      tags: ["GPS Tracking", "Fleet Mgmt", "Logistics"]
    }
  ];

sql += "DELETE FROM Portfolios;\n";
for (const pf of portfolioList) {
  sql += `INSERT INTO Portfolios (Title, Category, Image, Description, StatsJson, TagsJson, CreatedAt)
VALUES (${escapeSql(pf.title)}, ${escapeSql(pf.category)}, ${escapeSql(pf.image)}, ${escapeSql(pf.description)}, ${escapeSql(JSON.stringify(pf.stats || []))}, ${escapeSql(JSON.stringify(pf.tags || []))}, ${escapeSql(new Date().toISOString())});\n`;
}

// 8. Services
const servicesList = Array.isArray(contentsMap.services) ? contentsMap.services : [];
sql += "DELETE FROM Services;\n";
for (const s of servicesList) {
  sql += `INSERT INTO Services (Title, Href, Description, IconName, Color, DeliverablesJson, CreatedAt)
VALUES (${escapeSql(s.title)}, ${escapeSql(s.href)}, ${escapeSql(s.description)}, ${escapeSql(s.iconName || '')}, ${escapeSql(s.color || '')}, ${escapeSql(JSON.stringify(s.deliverables || []))}, ${escapeSql(new Date().toISOString())});\n`;
}

// 9. TeamMembers
const teamList = Array.isArray(contentsMap.team) ? contentsMap.team : [];
sql += "DELETE FROM TeamMembers;\n";
for (let i = 0; i < teamList.length; i++) {
  const t = teamList[i];
  sql += `INSERT INTO TeamMembers (Name, Role, Image, Description, OrderIndex, CreatedAt)
VALUES (${escapeSql(t.name)}, ${escapeSql(t.role)}, ${escapeSql(t.image)}, ${escapeSql(t.description)}, ${i + 1}, ${escapeSql(new Date().toISOString())});\n`;
}

// 10. AboutContents
const aboutObj = contentsMap.about || {};
sql += "DELETE FROM AboutContents;\n";
sql += `INSERT INTO AboutContents (HeroTitle, HeroSubtitle, HeroImage, VisionPointsJson, MissionPointsJson, ValuesJson, StoryHtml, UpdatedAt)
VALUES (${escapeSql(aboutObj.hero?.title || 'About Us')}, ${escapeSql(aboutObj.hero?.subtitle || '')}, ${escapeSql(aboutObj.hero?.image || '')}, ${escapeSql(JSON.stringify(aboutObj.vision?.points || []))}, ${escapeSql(JSON.stringify(aboutObj.mission?.points || []))}, ${escapeSql(JSON.stringify(aboutObj.values || []))}, ${escapeSql(aboutObj.story || '')}, ${escapeSql(new Date().toISOString())});\n`;

sql += "COMMIT;\n";

const popFile = path.join(process.cwd(), 'scripts', 'temp_pop.sql');
fs.writeFileSync(popFile, sql, 'utf8');
execSync(`sqlite3 "${dbPath}" < "${popFile}"`);
fs.unlinkSync(popFile);
console.log("Populated all dedicated tables successfully!");

