const API_KEY = "this_is_secure_enough,right?"; // Replace with a strong key

function authMiddleware(req, res, next) {
    const userKey = req.headers["authorization"];

    if (!userKey || userKey !== `Bearer ${API_KEY}`) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
    }

    next(); // Proceed if authenticated
}

module.exports = authMiddleware;
