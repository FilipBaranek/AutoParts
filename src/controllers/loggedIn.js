const database = require("../routes/database-config");
const jwt = require("jsonwebtoken");

const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered)
    {
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        database.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (err || !result.length)
            {
                req.user = null;
                return next();
            }
            req.user = result[0];
            return next();
        })
    } catch (err) {
        if (err)
        {
            console.error("Verification error:", err.message);
            req.user = null;
            return next();
        }
    }
}

module.exports = loggedIn;