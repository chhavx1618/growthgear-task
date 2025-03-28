const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":mem:"); 

db.serialize(() => {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='sales'", (err, row) => {
        if (!row) {
            db.run("CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY, product TEXT, revenue INTEGER)", (err) => {
                if (err) console.error("Error creating table:", err);
                
              
                db.run("INSERT INTO sales (product, revenue) VALUES ('Laptop', 5000), ('Phone', 3000)");
            });
        }
    });
});

module.exports = db;
