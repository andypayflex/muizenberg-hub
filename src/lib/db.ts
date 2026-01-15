import Database from "better-sqlite3";
import path from "path";
import bcrypt from "bcryptjs";

const dbPath = path.join(process.cwd(), "data", "community.db");

// Ensure data directory exists
import fs from "fs";
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

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
  );

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
  );

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
  );

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
  );
`);

// Helper to generate IDs
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// User functions
export function createUser(email: string, password: string, name: string, role = "user") {
  const id = generateId();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare("INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)");
  stmt.run(id, email, hashedPassword, name, role);
  return id;
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email) as { id: string; email: string; password: string; name: string; role: string } | undefined;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

// Business functions
export function getAllBusinesses() {
  const stmt = db.prepare("SELECT * FROM businesses WHERE approved = 1 ORDER BY created_at DESC");
  return stmt.all();
}

export function createBusiness(data: {
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  rating?: number;
  reviews?: number;
  website?: string;
}) {
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO businesses (id, name, category, address, phone, hours, description, rating, reviews, website)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, data.name, data.category, data.address, data.phone, data.hours, data.description, data.rating || null, data.reviews || null, data.website || null);
  return id;
}

export function deleteBusiness(id: string) {
  const stmt = db.prepare("DELETE FROM businesses WHERE id = ?");
  return stmt.run(id);
}

export function updateBusiness(id: string, data: Partial<{
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  rating: number;
  reviews: number;
  website: string;
  approved: number;
}>) {
  const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
  const values = Object.values(data);
  const stmt = db.prepare(`UPDATE businesses SET ${fields} WHERE id = ?`);
  return stmt.run(...values, id);
}

// Job functions
export function getAllJobs() {
  const stmt = db.prepare("SELECT * FROM jobs WHERE approved = 1 ORDER BY created_at DESC");
  return stmt.all();
}

export function createJob(data: {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  contact: string;
}) {
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO jobs (id, title, company, location, type, salary, description, contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, data.title, data.company, data.location, data.type, data.salary, data.description, data.contact);
  return id;
}

export function deleteJob(id: string) {
  const stmt = db.prepare("DELETE FROM jobs WHERE id = ?");
  return stmt.run(id);
}

// Post functions
export function getAllPosts() {
  const stmt = db.prepare("SELECT * FROM posts WHERE approved = 1 ORDER BY created_at DESC");
  return stmt.all();
}

export function createPost(data: {
  type: string;
  title: string;
  content: string;
  author: string;
}) {
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO posts (id, type, title, content, author)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(id, data.type, data.title, data.content, data.author);
  return id;
}

export function deletePost(id: string) {
  const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
  return stmt.run(id);
}

// Marketplace functions
export function getAllMarketplaceItems() {
  const stmt = db.prepare("SELECT * FROM marketplace_items WHERE approved = 1 AND sold = 0 ORDER BY created_at DESC");
  return stmt.all();
}

export function createMarketplaceItem(data: {
  title: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  description: string;
  seller: string;
  contact: string;
  emoji?: string;
}) {
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO marketplace_items (id, title, price, category, condition, location, description, seller, contact, emoji)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, data.title, data.price, data.category, data.condition, data.location, data.description, data.seller, data.contact, data.emoji || "📦");
  return id;
}

export function deleteMarketplaceItem(id: string) {
  const stmt = db.prepare("DELETE FROM marketplace_items WHERE id = ?");
  return stmt.run(id);
}

// Admin functions - get everything including unapproved
export function adminGetAllBusinesses() {
  const stmt = db.prepare("SELECT * FROM businesses ORDER BY created_at DESC");
  return stmt.all();
}

export function adminGetAllJobs() {
  const stmt = db.prepare("SELECT * FROM jobs ORDER BY created_at DESC");
  return stmt.all();
}

export function adminGetAllPosts() {
  const stmt = db.prepare("SELECT * FROM posts ORDER BY created_at DESC");
  return stmt.all();
}

export function adminGetAllMarketplaceItems() {
  const stmt = db.prepare("SELECT * FROM marketplace_items ORDER BY created_at DESC");
  return stmt.all();
}

// Seed initial data
export function seedDatabase() {
  // Check if admin exists
  const admin = getUserByEmail("andy@muizenberghub.co.za");
  if (!admin) {
    createUser("andy@muizenberghub.co.za", "muizenberg2024", "Andy", "admin");
    console.log("✅ Admin user created");
  }

  // Check if we have businesses
  const businesses = getAllBusinesses();
  if (businesses.length === 0) {
    const seedBusinesses = [
      {
        name: "Byte and Bean",
        category: "Food & Coffee",
        address: "Muizenberg",
        phone: "021-788-0000",
        hours: "Check with business",
        description: "Tech meets coffee culture in Muizenberg. Your local spot for great coffee and digital community vibes.",
        rating: 5.0,
        reviews: 0,
      },
      {
        name: "Empire Cafe",
        category: "Food & Coffee",
        address: "11 York Road, Muizenberg",
        phone: "021-788-1250",
        hours: "7am - 4pm daily",
        description: "Beloved local cafe serving excellent breakfasts. A Muizenberg institution.",
        rating: 4.5,
        reviews: 812,
      },
      {
        name: "Tiger's Milk Muizenberg",
        category: "Food & Coffee",
        address: "Beach Road, Muizenberg",
        phone: "021-788-1860",
        hours: "11am - late",
        description: "The original Tiger's Milk. Burgers, cocktails, and celebrating Muizenberg.",
        rating: 4.3,
        reviews: 1200,
      },
      {
        name: "Surf Emporium",
        category: "Surf & Beach",
        address: "72 Beach Road, Surfer's Corner",
        phone: "021-788-8687",
        hours: "8am - 6pm daily",
        description: "South Africa's most popular surf destination. 20+ years experience.",
        rating: 4.7,
        reviews: 271,
      },
      {
        name: "Gary's Surf School",
        category: "Surf & Beach",
        address: "34 Beach Road",
        phone: "021-788-9839",
        hours: "8am - 5pm daily",
        description: "The first surf school in Cape Town! 35+ years of stoke.",
        rating: 4.7,
        reviews: 117,
      },
    ];

    for (const biz of seedBusinesses) {
      createBusiness(biz);
    }
    console.log(`✅ Seeded ${seedBusinesses.length} businesses`);
  }

  // Seed posts if empty
  const posts = getAllPosts();
  if (posts.length === 0) {
    createPost({
      type: "event",
      title: "Beach Cleanup Saturday 8am 🏖️",
      content: "Join us at Surfer's Corner for our monthly beach cleanup!",
      author: "Muizenberg Beach Keepers",
    });
    createPost({
      type: "alert",
      title: "Shark Spotted - Red Flag 🦈",
      content: "Beach currently has RED flag. Stay out of the water until all-clear.",
      author: "Shark Spotters",
    });
    console.log("✅ Seeded posts");
  }

  // Seed jobs if empty
  const jobs = getAllJobs();
  if (jobs.length === 0) {
    createJob({
      title: "Barista",
      company: "Empire Cafe",
      location: "York Road",
      type: "Part-time",
      salary: "R90/hour",
      description: "Join our beloved cafe team.",
      contact: "021-788-1250",
    });
    console.log("✅ Seeded jobs");
  }
}

export default db;
