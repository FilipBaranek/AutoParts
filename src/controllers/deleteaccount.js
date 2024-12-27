const database = require("../routes/database-config");
const bcrypt = require("bcryptjs");
const logout = require("../controllers/logout");
const checkAccountDelete = require('./validators.js').checkAccountDelete;

const deleteaccount = async (req, res) => {
    const password = req.body.password;

    const errorMessage = checkAccountDelete(req);
    if (errorMessage !== null) 
    {
        return res.json({ valid: false, error: errorMessage });
    }

    const userId = req.user.id;

    database.query('SELECT password FROM users where id = ?', [userId], async (error, rslt) => {
        if (error)
        {
            return res.json({ valid: false, error: "Chyba na strane servera" });
        }
        const hashedPassword = rslt[0].password;
        const correctPassword = await bcrypt.compare(password, hashedPassword);
        if (!correctPassword)
        {
            return res.json({ valid: false, error: "Nesprávne heslo" });
        }
        else 
        {
            database.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
                if (err) {
                    return res.json({ valid: false, error: "Chyba na strane servera" });
                }
                return res.json({ valid: true, success: "Účet bol odstránený", logout });
            });
        }
    })
}

module.exports = deleteaccount;
