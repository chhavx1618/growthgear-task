const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":mem:"); 
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY, product TEXT, revenue INTEGER)");

    db.get("SELECT COUNT(*) AS count FROM sales", (err, row) => {
        if (row.count === 0) {
            db.run("INSERT INTO sales (product, revenue) VALUES ('Laptop', 5000), ('Phone', 3000)");
        }
    });

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS history (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         question TEXT,
    //         sqlQuery TEXT,
    //         timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    //     )
    // `);

    db.get("SELECT COUNT(*) AS count FROM sales", (err, row) => {
        if (err) {
            console.error("Error checking sales data:", err);
            return;
        }

        if (row.count === 0) {
            const insertSales = db.prepare(`
                INSERT INTO sales (product, category, revenue, date, customer_id, employee) VALUES (?, ?, ?, ?, ?, ?)
            `);

            const salesData = [
                ['Laptop', 'Electronics', 5000, '2024-03-20', 101, 'Alice'],
                ['Phone', 'Electronics', 3000, '2024-03-18', 102, 'Bob'],
                ['Tablet', 'Electronics', 2000, '2024-03-15', 103, 'Charlie'],
                ['Headphones', 'Accessories', 500, '2024-03-10', 104, 'Alice'],
                ['Smartwatch', 'Accessories', 1500, '2024-03-05', 105, 'Bob'],
                ['TV', 'Electronics', 7000, '2024-02-25', 106, 'Charlie'],
                ['Gaming Console', 'Electronics', 4000, '2024-02-20', 107, 'Alice'],
                ['Monitor', 'Accessories', 2500, '2024-02-18', 108, 'Bob'],
                ['Keyboard', 'Accessories', 300, '2024-02-15', 109, 'Charlie'],
                ['Mouse', 'Accessories', 200, '2024-02-10', 110, 'Alice']
            ];

            db.run("BEGIN TRANSACTION");
            salesData.forEach((row) => insertSales.run(row));
            db.run("COMMIT");

            insertSales.finalize();
        };
    });
});

module.exports = db;
