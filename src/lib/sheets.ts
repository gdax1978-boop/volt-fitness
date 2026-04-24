import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spreadsheetId = process.env.SPREADSHEET_ID;
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '../../credentials/service-account.json');

export async function appendToSheet(range: string, values: any[]) {
  if (!spreadsheetId) {
    console.warn('[SHEETS] No SPREADSHEET_ID configured. Skipping...');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });
    
    console.log(`[SHEETS] Data appended to ${range}`);
  } catch (error: any) {
    console.error('[SHEETS] Error:', error.message);
  }
}
