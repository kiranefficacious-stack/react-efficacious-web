import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dbPath = path.join(process.cwd(), 'backend', 'Efficacious.Api', 'Efficacious.db');

// Read initialData from data.ts
const dataTsPath = path.join(process.cwd(), 'data.ts');
let initialData = {};
try {
  // Extract json or parse data.ts
  const content = fs.readFileSync(dataTsPath, 'utf8');
  // Match export const initialData = { ... }
} catch (e) {}

// Read current data from WebsiteContents table via sqlite3
function queryDb(sql) {
  return execSync(`sqlite3 "${dbPath}" "${sql.replace(/"/g, '\\"')}"`, { encoding: 'utf8' }).trim();
}

function escapeSql(val) {
  if (val === null || val === undefined) return "''";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

const createTablesSql = `
CREATE TABLE IF NOT EXISTS Blogs (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Excerpt TEXT,
    Category TEXT,
    Author TEXT,
    AuthorRole TEXT,
    Date TEXT,
    ReadTime TEXT,
    Image TEXT,
    Color TEXT,
    TagsJson TEXT,
    ContentJson TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Careers (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Department TEXT,
    Type TEXT,
    Experience TEXT,
    Location TEXT,
    Description TEXT,
    CriteriaJson TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Galleries (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Caption TEXT,
    Category TEXT,
    Url TEXT NOT NULL,
    IsActive INTEGER DEFAULT 1,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS CompanyContacts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Office TEXT,
    Email TEXT,
    Phone TEXT,
    Website TEXT,
    SocialsJson TEXT,
    UpdatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS NewsArticles (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Category TEXT,
    Date TEXT,
    Excerpt TEXT,
    Image TEXT,
    Color TEXT,
    ContentJson TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Partners (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Region TEXT,
    Name TEXT,
    Address TEXT,
    Email TEXT,
    Phone TEXT,
    Color TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Portfolios (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Category TEXT,
    Image TEXT,
    Description TEXT,
    StatsJson TEXT,
    TagsJson TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Services (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Href TEXT,
    Description TEXT,
    IconName TEXT,
    Color TEXT,
    DeliverablesJson TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS TeamMembers (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Role TEXT NOT NULL,
    Image TEXT,
    Description TEXT,
    OrderIndex INTEGER DEFAULT 0,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS AboutContents (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    HeroTitle TEXT,
    HeroSubtitle TEXT,
    HeroImage TEXT,
    VisionPointsJson TEXT,
    MissionPointsJson TEXT,
    ValuesJson TEXT,
    StoryHtml TEXT,
    UpdatedAt TEXT NOT NULL
);
`;

const dumpSqlFile = path.join(process.cwd(), 'scripts', 'temp_create_tables.sql');
fs.writeFileSync(dumpSqlFile, createTablesSql, 'utf8');
execSync(`sqlite3 "${dbPath}" < "${dumpSqlFile}"`);
fs.unlinkSync(dumpSqlFile);
console.log("Dedicated tables created successfully!");

