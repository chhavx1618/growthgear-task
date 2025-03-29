const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Database connected successfully.");
    }
});

// Ensure tables exist before any queries run
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY, 
        product TEXT, 
        category TEXT, 
        revenue INTEGER, 
        date TEXT, 
        customer_id INTEGER, 
        employee TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        question TEXT, 
        sqlQuery TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert enough sales data for meaningful queries
    db.run(`INSERT INTO sales (product, category, revenue, date, customer_id, employee) VALUES 
        ('Laptop', 'Electronics', 5000, '2024-03-01', 101, 'Alice'),
        ('Phone', 'Electronics', 3000, '2024-03-02', 102, 'Bob'),
        ('Tablet', 'Electronics', 2000, '2024-03-03', 103, 'Charlie'),
        ('Headphones', 'Accessories', 1500, '2024-03-04', 101, 'Alice'),
        ('Smartwatch', 'Accessories', 1800, '2024-03-05', 104, 'David'),
        ('Monitor', 'Electronics', 4000, '2024-03-06', 105, 'Eve'),
        ('Keyboard', 'Accessories', 1200, '2024-03-07', 106, 'Frank'),
        ('Mouse', 'Accessories', 900, '2024-03-08', 107, 'Grace'),
        ('Printer', 'Office Supplies', 3500, '2024-03-09', 108, 'Henry'),
        ('Scanner', 'Office Supplies', 2800, '2024-03-10', 109, 'Isla'),
        ('Desk Chair', 'Furniture', 4200, '2024-03-11', 110, 'Jack'),
        ('Desk Lamp', 'Furniture', 1600, '2024-03-12', 111, 'Kate'),
        ('Laptop', 'Electronics', 5200, '2024-03-13', 112, 'Laura'),
        ('Phone', 'Electronics', 3200, '2024-03-14', 113, 'Mike'),
        ('Headphones', 'Accessories', 1400, '2024-03-15', 114, 'Nina')
    `);
});


module.exports = db;
