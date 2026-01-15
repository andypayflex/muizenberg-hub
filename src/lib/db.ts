import { createClient, Client } from "@libsql/client";
import bcrypt from "bcryptjs";

// Use Turso in production, local SQLite for dev
let db: Client;

if (process.env.TURSO_DATABASE_URL) {
  db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
} else {
  db = createClient({
    url: "file:data/community.db",
  });
}

// Initialize tables
async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS businesses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      hours TEXT NOT NULL,
      description TEXT NOT NULL,
      rating REAL,
      reviews INTEGER,
      website TEXT,
      approved INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT NOT NULL,
      salary TEXT NOT NULL,
      description TEXT NOT NULL,
      contact TEXT NOT NULL,
      approved INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      comments INTEGER DEFAULT 0,
      approved INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS marketplace_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      price TEXT NOT NULL,
      category TEXT NOT NULL,
      condition TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT NOT NULL,
      seller TEXT NOT NULL,
      contact TEXT NOT NULL,
      emoji TEXT DEFAULT '📦',
      approved INTEGER DEFAULT 1,
      sold INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    await initDb();
    dbInitialized = true;
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// User functions
export async function createUser(email: string, password: string, name: string, role = "user") {
  await ensureDb();
  const id = generateId();
  const hashedPassword = bcrypt.hashSync(password, 10);
  await db.execute("INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)", [id, email, hashedPassword, name, role]);
  return id;
}

export async function getUserByEmail(email: string) {
  await ensureDb();
  const result = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (!result.rows[0]) return undefined;
  const row = result.rows[0];
  return { id: String(row.id), email: String(row.email), password: String(row.password), name: String(row.name), role: String(row.role) };
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

// Business functions
export async function getAllBusinesses() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM businesses WHERE approved = 1 ORDER BY created_at DESC");
  return result.rows;
}

export async function createBusiness(data: { name: string; category: string; address: string; phone: string; hours: string; description: string; rating?: number; reviews?: number; website?: string }) {
  await ensureDb();
  const id = generateId();
  await db.execute("INSERT INTO businesses (id, name, category, address, phone, hours, description, rating, reviews, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, data.name, data.category, data.address, data.phone, data.hours, data.description, data.rating || null, data.reviews || null, data.website || null]);
  return id;
}

export async function deleteBusiness(id: string) {
  await ensureDb();
  await db.execute("DELETE FROM businesses WHERE id = ?", [id]);
}

export async function updateBusiness(id: string, data: Record<string, string | number | null>) {
  await ensureDb();
  const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
  const values = [...Object.values(data), id];
  await db.execute(`UPDATE businesses SET ${fields} WHERE id = ?`, values);
}

// Job functions
export async function getAllJobs() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM jobs WHERE approved = 1 ORDER BY created_at DESC");
  return result.rows;
}

export async function createJob(data: { title: string; company: string; location: string; type: string; salary: string; description: string; contact: string }) {
  await ensureDb();
  const id = generateId();
  await db.execute("INSERT INTO jobs (id, title, company, location, type, salary, description, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, data.title, data.company, data.location, data.type, data.salary, data.description, data.contact]);
  return id;
}

export async function deleteJob(id: string) {
  await ensureDb();
  await db.execute("DELETE FROM jobs WHERE id = ?", [id]);
}

// Post functions
export async function getAllPosts() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM posts WHERE approved = 1 ORDER BY created_at DESC");
  return result.rows;
}

export async function createPost(data: { type: string; title: string; content: string; author: string }) {
  await ensureDb();
  const id = generateId();
  await db.execute("INSERT INTO posts (id, type, title, content, author) VALUES (?, ?, ?, ?, ?)",
    [id, data.type, data.title, data.content, data.author]);
  return id;
}

export async function deletePost(id: string) {
  await ensureDb();
  await db.execute("DELETE FROM posts WHERE id = ?", [id]);
}

// Marketplace functions
export async function getAllMarketplaceItems() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM marketplace_items WHERE approved = 1 AND sold = 0 ORDER BY created_at DESC");
  return result.rows;
}

export async function createMarketplaceItem(data: { title: string; price: string; category: string; condition: string; location: string; description: string; seller: string; contact: string; emoji?: string }) {
  await ensureDb();
  const id = generateId();
  await db.execute("INSERT INTO marketplace_items (id, title, price, category, condition, location, description, seller, contact, emoji) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, data.title, data.price, data.category, data.condition, data.location, data.description, data.seller, data.contact, data.emoji || "📦"]);
  return id;
}

export async function deleteMarketplaceItem(id: string) {
  await ensureDb();
  await db.execute("DELETE FROM marketplace_items WHERE id = ?", [id]);
}

// Admin functions
export async function adminGetAllBusinesses() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM businesses ORDER BY created_at DESC");
  return result.rows;
}

export async function adminGetAllJobs() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM jobs ORDER BY created_at DESC");
  return result.rows;
}

export async function adminGetAllPosts() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM posts ORDER BY created_at DESC");
  return result.rows;
}

export async function adminGetAllMarketplaceItems() {
  await ensureDb();
  const result = await db.execute("SELECT * FROM marketplace_items ORDER BY created_at DESC");
  return result.rows;
}

// Seed database
export async function seedDatabase() {
  await ensureDb();
  
  const admin = await getUserByEmail("andy@muizenberghub.co.za");
  if (!admin) {
    await createUser("andy@muizenberghub.co.za", "muizenberg2024", "Andy", "admin");
    
    await createBusiness({ name: "Byte and Bean", category: "Food & Coffee", address: "Muizenberg", phone: "021-788-0000", hours: "Check with business", description: "Tech meets coffee culture in Muizenberg.", rating: 5.0, reviews: 0 });
    await createBusiness({ name: "Empire Cafe", category: "Food & Coffee", address: "11 York Road", phone: "021-788-1250", hours: "7am - 4pm", description: "Beloved local cafe. A Muizenberg institution.", rating: 4.5, reviews: 812 });
    await createBusiness({ name: "Tiger's Milk", category: "Food & Coffee", address: "Beach Road", phone: "021-788-1860", hours: "11am - late", description: "Burgers, cocktails, and Muizenberg vibes.", rating: 4.3, reviews: 1200 });
    await createBusiness({ name: "Surf Emporium", category: "Surf & Beach", address: "72 Beach Road", phone: "021-788-8687", hours: "8am - 6pm", description: "SA's most popular surf destination.", rating: 4.7, reviews: 271 });
    await createBusiness({ name: "Gary's Surf School", category: "Surf & Beach", address: "34 Beach Road", phone: "021-788-9839", hours: "8am - 5pm", description: "First surf school in Cape Town! 35+ years.", rating: 4.7, reviews: 117 });

    await createPost({ type: "event", title: "Beach Cleanup Saturday 8am 🏖️", content: "Join us at Surfer's Corner!", author: "Beach Keepers" });
    await createPost({ type: "alert", title: "Shark Spotted - Red Flag 🦈", content: "Stay out of water until all-clear.", author: "Shark Spotters" });

    await createJob({ title: "Barista", company: "Empire Cafe", location: "York Road", type: "Part-time", salary: "R90/hour", description: "Join our cafe team!", contact: "021-788-1250" });
  }
}

export default db;
