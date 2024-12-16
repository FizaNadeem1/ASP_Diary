import initSqlJs from 'sql.js';

// Initialize SQLite database
export async function initDatabase() {
  const SQL = await initSqlJs(); // Load sql.js
  const db = new SQL.Database(); // Create an in-memory database

  // Create a table to store images
  db.run(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      data BLOB
    );
  `);

  return db;
}

// Insert an image into the database
export function insertImage(db, imageName, imageBlob) {
  const stmt = db.prepare("INSERT INTO images (name, data) VALUES (?, ?)");
  stmt.run([imageName, imageBlob]);
  stmt.free(); // Free statement to avoid memory leaks
}

// Get all images from the database
export function getAllImages(db) {
  const stmt = db.prepare("SELECT * FROM images");
  const images = [];

  while (stmt.step()) {
    const row = stmt.getAsObject();
    images.push({
      id: row.id,
      name: row.name,
      data: row.data,
    });
  }
  stmt.free(); // Free statement
  return images;
}
