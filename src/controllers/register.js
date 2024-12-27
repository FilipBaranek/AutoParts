const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");
const checkRegister = require("./validators.js").checkRegister;


const register = async (req, res) => {
    const { username, email, password } = req.body;

    const errorMessage = checkRegister(req);
    if (errorMessage !== null) {
        return res.json({ valid: false, error: errorMessage });
    }

    database.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) 
        {
            return res.json({ valid: false, error: "Chyba na strane servera" });
        }

        if (result.length > 0) 
        {
            return res.json({ valid: false, error: "Tento e-mail už je zaregistrovaný" });
        }
        else 
        {
            const pass = await bcrypt.hash(password, 8);

            database.query('INSERT INTO users SET ?', { username: username, email: email, password: pass }, (error, results) => {
                if (error) 
                {
                    return res.json({ valid: false, error: "Chyba na strane servera." });
                }
                return res.json({ valid: true, success: "Používateľ bol zaregistrovaný", redirectUrl: "/login" });
            });
        }
    });
}

module.exports = register;
