const express  = require("express");
const db = require("./db");
const {nlToSql } = require("./queryEng");
const authMiddleware = require("./auth");


const router = express.Router();

router.use(authMiddleware)

router.post("/query", (req,res) => {
    const { question } = req.body;
    const sqlQuery = nlToSql(question);

    if (!sqlQuery) return res.status(400).json({error: "query not supported."});

    db.all(sqlQuery, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ result: rows });
    });
});

router.post("/explain", (req,res) => {
    const { question } = req.body;
    const sqlQuery = nlToSql(question);

    if (!sqlQuery) return res.status(400).json({error: "query not supported."});

    res.json({ explanation : `your query is translated to: ${sqlQuery}`});


});

router.post("/validate", (req,res) => {
    const { question } = req.body;
    const sqlQuery = nlToSql(question);

   // if (!sqlQuery) return res.status(400).json({error: "query not supported."});

   res.json({ checkValid: !!sqlQuery, sqlQuery});
});

module.exports = router;