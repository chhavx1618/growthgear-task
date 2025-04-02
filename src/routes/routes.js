const express  = require("express");
const db = require("../models/db");
const {nlToSql } = require("../models/queryEng");
const authMiddleware = require("../auth/auth");


const router = express.Router();

router.use(authMiddleware)


// router.post("/query", (req, res) => {
//     const { question } = req.body;
//     const sqlQuery = nlToSql(question);

//     if (!sqlQuery) return res.status(400).json({ error: "Query not supported." });

//     db.all(sqlQuery, [], (err, rows) => {
//         if (err) return res.status(500).json({ error: "Database error" });
//         db.run("INSERT INTO history (question, sqlQuery) VALUES (?, ?)", [question, sqlQuery]);

//         res.json({ result: rows });
//     });
// });

router.post("/query", (req, res) => {
    const { question } = req.body;
    const { sql, explanation } = nlToSql(question);

    if (!sql) return res.status(400).json({ error: "Query not supported." });

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }

        // Insert history after successful execution
        db.run("INSERT INTO history (question, sqlQuery) VALUES (?, ?)", [question, sql], (insertErr) => {
            if (insertErr) console.error("Error saving history:", insertErr.message);
        });

        res.json({ result: rows || "empty" });
    });
});


router.post("/explain", (req,res) => {
    const { question } = req.body;
    const sqlQuery = nlToSql(question);
    const explanation = nlToSql(question);

    if (!sqlQuery) return res.status(400).json({error: "query not supported."});

 res.json({ explanation });

});

router.post("/validate", (req,res) => {
    const { question } = req.body;
    const sqlQuery = nlToSql(question);

   // if (!sqlQuery) return res.status(400).json({error: "query not supported."});

   res.json({ checkValid: !!sqlQuery, sqlQuery});
});


router.get("/history", (req,res) => {
    db.all("SELECT * FROM history ORDER BY timestamp DESC", [], (err, rows) => {
        if(err) {
            return res.status(500).json({error: err.message });
        }
        res.json({history: rows});
    })
})

module.exports = router;