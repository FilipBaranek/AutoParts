const jwt = require("jsonwebtoken");
const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
    {
        return res.json({ status: "error", error: "Zadajte e-mail a heslo" });
    }
    else 
    {
        database.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
            if (err)
            {
                return res.json({ status: "error", error: "Chyba na strane servera." });
            }
            if (!result.length || !await bcrypt.compare(password, result[0].password))
            {
                return res.json({ status: "error", error: "Nesprávny e-mail alebo heslo" });
            }
            else
            {
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                
                return res.json({ status: "success", success: "Použivatel bol prihlásený", redirectUrl: "/"});
            }
        });
    }
}

module.exports = login;