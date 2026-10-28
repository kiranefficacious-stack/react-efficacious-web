#!/usr/bin/env node
const crypto = require('crypto');

const MASTER_SECRET = process.env.EMAIL_ENCRYPTION_SECRET || 'Efficacious@Secure2026!Key#9876';

function getEncryptionKey(secret) {
  return crypto.createHash('sha256').update(secret).digest();
}

function encrypt(text, secret = MASTER_SECRET) {
  const iv = crypto.randomBytes(12);
  const key = getEncryptionKey(secret);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `enc:v1:${iv.toString('hex')}:${authTag}:${encrypted}`;
}

const inputPass = process.argv[2];

if (!inputPass) {
  console.log('Usage: node scripts/encryptPassword.js <your_password>');
  process.exit(1);
}

const encrypted = encrypt(inputPass);
console.log('\n🔒 Encrypted AES-256-GCM Password:\n');
console.log(encrypted);
console.log('\nYou can safely paste this encrypted string into Firestore under system_secrets/email_credentials -> pass\n');
