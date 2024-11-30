const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password: Npassword, confirmPassword } = req.body;

    if (!username || !email || !Npassword || !confirmPassword) {
        return res.json({ status: "error", error: "Zadaj svoje meno a heslo a potvrď ho" });
    }

    if (Npassword !== confirmPassword) {
        return res.json({ status: "error", error: "Heslá sa nezhodujú" });
    }

    const passwordPattern = /.{8,}/;
    if (!passwordPattern.test(Npassword))
    {
        return res.json({ status: "error", error: "Heslo musí obsahovať aspoň 8 znakov" });
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email))
    {
        return res.json({ status: "error", error: "Neplatný e-mail" });
    }

    const usernamePattern = /^[A-Za-z]+$/;
    if (!usernamePattern.test(username))
    {
        return res.json( {status: "error", error: "Nesprávne zadané meno" } );
    }

    database.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            return res.json({ status: "error", error: "Chyba na strane servera" });
        }

        if (result[0]) {
            return res.json({ status: "error", error: "Tento e-mail už je zaregistrovaný" });
        } else {
            const password = await bcrypt.hash(Npassword, 8);

            database.query('INSERT INTO users SET ?', { username: username, email: email, password: password }, (error, results) => {
                if (error) {
                    return res.json({ status: "error", error: "Chyba na strane servera." });
                }
                return res.json({ status: "success", success: "Používateľ bol zaregistrovaný", redirectUrl: "/" });
            });
        }
    });
}

module.exports = register;
