import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: "AIzaSyDQJBY13gQJqSvFvUCy4PxFW4esfqEljHA",
  authDomain: "efficacious-website-live.firebaseapp.com",
  projectId: "efficacious-website-live",
  storageBucket: "efficacious-website-live.firebasestorage.app",
  messagingSenderId: "10659375666",
  appId: "1:10659375666:web:06c31981b177025d896a2b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionsToInspect = [
  'contact_inquiries',
  'career_applications',
  'websiteContent',
  'chatbot_qa',
  'chat_sessions'
];

async function run() {
  console.log("Connecting to Firestore...");
  const exportData = {};

  for (const colName of collectionsToInspect) {
    try {
      const snap = await getDocs(collection(db, colName));
      console.log(`Collection: ${colName} -> Count: ${snap.size}`);
      exportData[colName] = [];
      snap.forEach(doc => {
        exportData[colName].push({
          id: doc.id,
          ...doc.data()
        });
      });
    } catch (err) {
      console.error(`Error querying ${colName}:`, err.message);
    }
  }

  const outPath = path.join(process.cwd(), 'firestore_export.json');
  fs.writeFileSync(outPath, JSON.stringify(exportData, null, 2));
  console.log(`Saved Firestore export to ${outPath}`);
}

run().catch(console.error);

