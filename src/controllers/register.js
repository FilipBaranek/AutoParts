const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password: Npassword, confirmPassword } = req.body;

    if (!username || !email || !Npassword || !confirmPassword) {
        return res.json({ status: "error", error: "Zadaj svoje meno a heslo a potvrď ho." });
    }

    if (Npassword !== confirmPassword) {
        return res.json({ status: "error", error: "Heslá sa nezhodujú." });
    }

    database.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            throw err;
        }

        if (result[0]) {
            return res.json({ status: "error", error: "Tento e-mail už je zaregistrovaný" });
        } else {
            const password = await bcrypt.hash(Npassword, 8);

            database.query('INSERT INTO users SET ?', { username: username, email: email, password: password }, (error, results) => {
                if (error) {
                    throw error;
                }
                return res.json({ status: "success", success: "Používateľ bol zaregistrovaný", redirectUrl: "/" });
            });
        }
    });
}

module.exports = register;
