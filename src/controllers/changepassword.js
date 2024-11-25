const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");

const changepassword = async (req, res) => {
    const { oldpassword, newpassword: Npassword, newpasswordConfirm } = req.body;

    if (!oldpassword || !Npassword || !newpasswordConfirm) {
        return res.json({ status: "error", error: "Zadaj svoje staré heslo, nové heslo a potvrď ho." });
    }

    if (Npassword !== newpasswordConfirm) {
        return res.json({ status: "error", error: "Nové heslo sa nezhoduje." });
    }

    const userId = req.user.id;

    database.query('SELECT password FROM users where id = ?', [userId], async (error, rslt) => {
        if (error)
        {
            throw error;
        }
        const passwordhash = rslt[0].password;
        const correctOldPassword = await bcrypt.compare(oldpassword, passwordhash);
        if (!correctOldPassword)
        {
            return res.json({ status: "error", error: "Nesprávne staré heslo" });
        }
        else 
        {
            const password = await bcrypt.hash(Npassword, 8);
            database.query('UPDATE users SET password = ? WHERE id = ?', [password, userId], async (err, result) => {
                if (err) {
                    throw err;
                }
                if (result.affectedRows === 0) {
                    return res.json({ status: "error", error: "Heslo sa neopdarilo zmeniť" });
                } else {
                    return res.json({ status: "success", success: "Heslo bolo zmenené", redirectUrl: "/profile" });
                }
            });
        }
    })
}

module.exports = changepassword;
