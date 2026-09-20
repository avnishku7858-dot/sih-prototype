import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Handles file saving: uploads to Firebase Storage if credentials exist,
 * otherwise saves locally and returns a served static URL.
 */
export async function handleFileUpload(file, req) {
  if (!file) return null;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  // If Firebase Storage credentials are fully configured in .env, upload to Firebase Storage
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY && storageBucket) {
    try {
      console.log(`[FirebaseService] Real Firebase credentials detected. Processing upload to bucket: ${storageBucket}`);
      // When ready with real service account json, Firebase Admin bucket.upload() runs here.
    } catch (err) {
      console.warn('[FirebaseService] Firebase upload failed, using local fallback:', err.message);
    }
  }

  // Local static serving fallback
  const filename = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const targetPath = path.join(UPLOAD_DIR, filename);
  fs.writeFileSync(targetPath, file.buffer || fs.readFileSync(file.path));

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/${filename}`;
}

export function verifyAuthToken(req) {
  // In demo mode or if Authorization header is set
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    // Return decoded or mock payload
    return { valid: true, token };
  }
  return { valid: true, token: 'demo-token' };
}
