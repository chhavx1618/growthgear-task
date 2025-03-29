require("dotenv").config();

const API_KEY = process.env.API_KEY; 

function authMiddleware(req, res, next) {
    const userKey = req.headers["authorization"];

    if (!userKey || userKey !== `Bearer ${API_KEY}`) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
    }

    next(); //proceeding only for authenticated requests
}

module.exports = authMiddleware;
