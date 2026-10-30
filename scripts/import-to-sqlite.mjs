import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const exportPath = path.join(process.cwd(), 'firestore_export.json');
const dbPath = path.join(process.cwd(), 'backend', 'Efficacious.Api', 'Efficacious.db');

if (!fs.existsSync(exportPath)) {
  console.error("firestore_export.json not found!");
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(exportPath, 'utf8'));

function escapeSql(val) {
  if (val === null || val === undefined) return "''";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

let sql = `
CREATE TABLE IF NOT EXISTS ContactInquiries (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL,
    Mobile TEXT,
    Address TEXT,
    Subject TEXT,
    Message TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS CareerApplications (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL,
    Mobile TEXT,
    Address TEXT,
    Position TEXT,
    Message TEXT,
    ResumeName TEXT,
    ResumeSize TEXT,
    CreatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS WebsiteContents (
    Key TEXT PRIMARY KEY,
    DataJson TEXT NOT NULL,
    UpdatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ChatSessions (
    Id TEXT PRIMARY KEY,
    CustomerName TEXT,
    Email TEXT,
    Mobile TEXT,
    Status TEXT,
    LastMessage TEXT,
    LastMessageTime TEXT,
    MessagesJson TEXT
);

BEGIN TRANSACTION;
`;

// 1. Contact Inquiries
for (const inq of (rawData.contact_inquiries || [])) {
  const name = inq.name || '';
  const email = inq.email || '';
  const mobile = inq.mobile || '';
  const address = inq.address || '';
  const subject = inq.subject || '';
  const message = inq.message || '';
  const createdAt = inq.submittedAt || (inq.createdAt?.seconds ? new Date(inq.createdAt.seconds * 1000).toISOString() : new Date().toISOString());

  sql += `INSERT INTO ContactInquiries (Name, Email, Mobile, Address, Subject, Message, CreatedAt)
VALUES (${escapeSql(name)}, ${escapeSql(email)}, ${escapeSql(mobile)}, ${escapeSql(address)}, ${escapeSql(subject)}, ${escapeSql(message)}, ${escapeSql(createdAt)});\n`;
}

// 2. Career Applications
for (const car of (rawData.career_applications || [])) {
  const name = car.name || '';
  const email = car.email || '';
  const mobile = car.mobile || '';
  const address = car.address || '';
  const position = car.position || '';
  const message = car.message || '';
  const resumeName = car.resumeName || '';
  const resumeSize = car.resumeSize || '';
  const createdAt = car.submittedAt || (car.createdAt?.seconds ? new Date(car.createdAt.seconds * 1000).toISOString() : new Date().toISOString());

  sql += `INSERT INTO CareerApplications (Name, Email, Mobile, Address, Position, Message, ResumeName, ResumeSize, CreatedAt)
VALUES (${escapeSql(name)}, ${escapeSql(email)}, ${escapeSql(mobile)}, ${escapeSql(address)}, ${escapeSql(position)}, ${escapeSql(message)}, ${escapeSql(resumeName)}, ${escapeSql(resumeSize)}, ${escapeSql(createdAt)});\n`;
}

// 3. Website Contents
for (const doc of (rawData.websiteContent || [])) {
  const key = doc.id;
  const data = { ...doc };
  delete data.id;
  const dataJson = JSON.stringify(data);
  sql += `INSERT OR REPLACE INTO WebsiteContents (Key, DataJson, UpdatedAt)
VALUES (${escapeSql(key)}, ${escapeSql(dataJson)}, ${escapeSql(new Date().toISOString())});\n`;
}

// 4. Chat Sessions
for (const chat of (rawData.chat_sessions || [])) {
  const id = chat.id;
  const name = chat.userName || chat.customerName || '';
  const email = chat.userEmail || chat.email || '';
  const mobile = chat.userMobile || chat.mobile || '';
  const status = chat.status || 'open';
  const lastMessage = chat.lastMessage || '';
  const lastMessageTime = chat.lastMessageTime?.seconds ? new Date(chat.lastMessageTime.seconds * 1000).toISOString() : new Date().toISOString();
  const messagesJson = JSON.stringify(chat.messages || []);

  sql += `INSERT OR REPLACE INTO ChatSessions (Id, CustomerName, Email, Mobile, Status, LastMessage, LastMessageTime, MessagesJson)
VALUES (${escapeSql(id)}, ${escapeSql(name)}, ${escapeSql(email)}, ${escapeSql(mobile)}, ${escapeSql(status)}, ${escapeSql(lastMessage)}, ${escapeSql(lastMessageTime)}, ${escapeSql(messagesJson)});\n`;
}

sql += "COMMIT;\n";

const sqlFile = path.join(process.cwd(), 'migrate_dump.sql');
fs.writeFileSync(sqlFile, sql, 'utf8');
console.log(`Generated SQL dump at ${sqlFile}`);

execSync(`sqlite3 "${dbPath}" < "${sqlFile}"`);
console.log(`Imported all data successfully into ${dbPath}`);
