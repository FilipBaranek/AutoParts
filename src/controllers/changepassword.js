const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const changepassword = async (req, res) => {
    const { oldpassword, newpassword: Npassword, newpasswordConfirm } = req.body;

    if (!oldpassword || !Npassword || !newpasswordConfirm) {
        return res.json({ status: "error", error: "Zadaj svoje staré heslo, nové heslo a potvrď ho." });
    }

    if (Npassword !== newpasswordConfirm) {
        return res.json({ status: "error", error: "Nové heslo sa nezhoduje." });
    }

    const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);

    database.query('SELECT password FROM users where id = ?', [decoded.id], async (error, rslt) => {
        if (error)
        {
            throw error;
        }
        const storedPasswordHash = rslt[0].password;
        const isOldPasswordCorrect = await bcrypt.compare(oldpassword, storedPasswordHash);
        if (!isOldPasswordCorrect)
        {
            return res.json({ status: "error", error: "Nesprávne staré heslo" });
        }
        else 
        {
            const password = await bcrypt.hash(Npassword, 8);
            database.query('UPDATE users SET password = ? WHERE id = ?', [password, decoded.id], async (err, result) => {
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
