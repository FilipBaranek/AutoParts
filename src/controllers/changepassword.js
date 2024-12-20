const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");

const changepassword = async (req, res) => {
    const { oldpassword, newpassword: Npassword, newpasswordConfirm } = req.body;

    if (!oldpassword || !Npassword || !newpasswordConfirm) {
        return res.json({ status: "error", error: "Zadaj svoje staré heslo, nové heslo a potvrď ho" });
    }

    if (Npassword !== newpasswordConfirm) {
        return res.json({ status: "error", error: "Heslá sa nezhodujú" });
    }

    const passwordPattern = /.{8,}/;
    if (!passwordPattern.test(Npassword))
    {
        return res.json({ status: "error", error: "Príliš slabé nové heslo, zadajte aspoň 8 charakterov" });
    }

    const userId = req.user.id;

    database.query('SELECT password FROM users where id = ?', [userId], async (error, rslt) => {
        if (error) {
            return res.json({ status: "error", error: "Chyba na strane servera." });
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
                    return res.json({ status: "error", error: "Chyba na strane servera." });
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
