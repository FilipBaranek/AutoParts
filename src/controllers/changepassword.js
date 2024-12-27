const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");
const checkPasswordChange = require('./validators.js').checkPasswordChange;

const changepassword = async (req, res) => {
    const { oldpassword, newpassword } = req.body;

    const errorMessage = checkPasswordChange(req);
    if (errorMessage !== null)
    {
        return res.json({ valid: false, error: errorMessage });
    }

    const userId = req.user.id;

    database.query('SELECT password FROM users where id = ?', [userId], async (error, rslt) => {
        if (error) {
            return res.json({ valid: false, error: "Chyba na strane servera." });
        }
        const passwordhash = rslt[0].password;
        const correctOldPassword = await bcrypt.compare(oldpassword, passwordhash);
        if (!correctOldPassword)
        {
            return res.json({ valid: false, error: "Nesprávne staré heslo" });
        }
        else 
        {
            const password = await bcrypt.hash(newpassword, 8);
            database.query('UPDATE users SET password = ? WHERE id = ?', [password, userId], async (err, result) => {
                if (err) {
                    return res.json({ valid: false, error: "Chyba na strane servera." });
                }
                if (result.affectedRows === 0) {
                    return res.json({ valid: false, error: "Heslo sa neopdarilo zmeniť" });
                } else {
                    return res.json({ valid: true, success: "Heslo bolo zmenené", redirectUrl: "/profile" });
                }
            });
        }
    })
}

module.exports = changepassword;
