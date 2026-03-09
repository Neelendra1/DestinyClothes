import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DESTINY_DB_PATH || "destiny.db";
const db = new Database(DB_PATH);

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    minQuantity INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    orders_count INTEGER DEFAULT 0,
    is_admin INTEGER DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
  CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
`);

// Seed initial data if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const initialProducts = [
    ['t1', 'Regular Fit 180 GSM Plain Tee', 'Round Neck', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', '180 GSM 100% Cotton. Double Bio-Washed. Clean, structured look.', 10],
    ['t2', 'Oversized 220 GSM Plain Tee', 'Round Neck', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', 'Premium 220 GSM 100% Cotton. Double Bio-Washed. Classic Oversized Fit.', 10],
    ['t3', 'Oversized 240 GSM French Terry Tee', 'Round Neck', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800', '240 GSM 100% Cotton French Terry. Heavyweight comfort and premium drape.', 10],
    ['p1', 'Polo 220 GSM Matty Tee', 'Polos', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800', '220 GSM Matty 100% Cotton. Ideal for corporate branding.', 10]
  ];
  const insert = db.prepare("INSERT INTO products (id, name, category, image, description, minQuantity, price) VALUES (?, ?, ?, ?, ?, ?, 0)");
  for (const p of initialProducts) {
    insert.run(...p);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  app.use(
    cors(
      allowedOrigin
        ? {
            origin: allowedOrigin,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          }
        : {},
    ),
  );

  app.use(express.json({ limit: "1mb" }));

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { id, name, price, category, image, description, minQuantity } = req.body;
    if (!name || !category || !image || typeof price !== "number") {
      return res.status(400).json({ error: "Invalid product payload" });
    }
    try {
      db.prepare("INSERT INTO products (id, name, price, category, image, description, minQuantity) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(id || Math.random().toString(36).substr(2, 9), name, price, category, image, description, minQuantity);
      res.status(201).json({ message: "Product created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/products/:id", (req, res) => {
    const { name, price, category, image, description, minQuantity } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing product id" });
    }
    try {
      db.prepare("UPDATE products SET name = ?, price = ?, category = ?, image = ?, description = ?, minQuantity = ? WHERE id = ?")
        .run(name, price, category, image, description, minQuantity, id);
      res.json({ message: "Product updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM products WHERE id = ?").run(id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // User Routes
  app.post("/api/users", (req, res) => {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    try {
      const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      if (existing) {
        res.json(existing);
      } else {
        const isAdmin = email === 'neelendra1destiny@gmail.com' ? 1 : 0;
        const result = db.prepare("INSERT INTO users (email, name, is_admin) VALUES (?, ?, ?)").run(email, name, isAdmin);
        res.json({ id: result.lastInsertRowid, email, name, orders_count: 0, is_admin: isAdmin });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/orders", (req, res) => {
    const { userId } = req.body;
    try {
      db.prepare("UPDATE users SET orders_count = orders_count + 1 WHERE id = ?").run(userId);
      const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
      res.json({ message: "Order placed successfully", user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
