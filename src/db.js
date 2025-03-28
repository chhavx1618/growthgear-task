const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":mem:");

// db.serialize(() => {
//     db.run("CREATE TABLE sales (id INTEGER PRIMARY KEY, product TEXT, revenue INTEGER)");
//     db.run("INSERT INTO sales (product, revenue) VALUES ('Laptop', 5000), ('Phone', 3000)");
// });


module.exports = db;