const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password: Npassword, confirmPassword } = req.body;

    // Check if email, password, and confirmPassword are provided
    if (!username || !email || !Npassword || !confirmPassword) {
        return res.json({ status: "error", error: "Zadaj svoje meno a heslo a potvrď ho." });
    }

    // Check if the password and confirmPassword match
    if (Npassword !== confirmPassword) {
        return res.json({ status: "error", error: "Heslá sa nezhodujú." });
    }

    // Check if email already exists in the database
    database.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            throw err;
        }

        // If the email already exists, return an error
        if (result[0]) {
            return res.json({ status: "error", error: "Tento e-mail už je zaregistrovaný" });
        } else {
            // Hash the password and save the new user
            const password = await bcrypt.hash(Npassword, 8);

            // Insert the new user into the database
            database.query('INSERT INTO users SET ?', { username: username, email: email, password: password }, (error, results) => {
                if (error) {
                    throw error;
                }
                return res.json({ status: "success", success: "Používateľ bol zaregistrovaný" });
            });
        }
    });
}

module.exports = register;
