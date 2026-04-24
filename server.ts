import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { appendToSheet } from './src/lib/sheets.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, 'subscriptions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Helper to save data
const saveData = (file: string, data: any) => {
  let existingData = [];
  if (fs.existsSync(file)) {
    try {
      existingData = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      console.error(`Error reading ${file}:`, e);
    }
  }
  existingData.push({ ...data, timestamp: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(existingData, null, 2));
};

// Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', timestamp: new Date().toISOString() });
});

app.post('/api/contact', (req, res) => {
  const { name, email, goal } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  console.log(`[CONTACT] New submission from ${name} (${email}) - Goal: ${goal}`);
  saveData(CONTACTS_FILE, { name, email, goal });
  appendToSheet('Contacts!A1', [name, email, goal, new Date().toISOString()]);
  
  res.status(200).json({ message: 'Target acquired. Welcome to the elite.' });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  console.log(`[SUBSCRIBE] New subscriber: ${email}`);
  saveData(SUBSCRIPTIONS_FILE, { email });
  appendToSheet('Subscribers!A1', [email, new Date().toISOString()]);

  res.status(200).json({ message: 'Logged into the grid.' });
});

app.listen(port, () => {
  console.log(`[SERVER] Volt Fitness Backend listening at http://localhost:${port}`);
});
