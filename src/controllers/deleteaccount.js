const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");
const logout = require("../controllers/logout")

const deleteaccount = async (req, res) => {
    const { password, confirmpassword } = req.body;

    if (!password || !confirmpassword) {
        return res.json({ status: "error", error: "Zadajte heslo a potvrďte ho" });
    }

    if (password !== confirmpassword) {
        return res.json({ status: "error", error: "Heslá sa nezhodujú" });
    }

    const userId = req.user.id;

    database.query('SELECT password FROM users where id = ?', [userId], async (error, rslt) => {
        if (error)
        {
            return res.json({ status: "error", error: "Chyba na strane servera" });
        }
        const hashedPassword = rslt[0].password;
        const correctPassword = await bcrypt.compare(password, hashedPassword);
        if (!correctPassword)
        {
            return res.json({ status: "error", error: "Nesprávne heslo" });
        }
        else 
        {
            database.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
                if (err) {
                    return res.json({ status: "error", error: "Chyba na strane servera" });
                }
                return res.json({ status: "success", success: "Účet bol odstránený", logout });
            });
        }
    })
}

module.exports = deleteaccount;
