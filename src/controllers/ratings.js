const database = require('../routes/database-config');


const ratings = async (req, res) => {
    const code = req.body.code;

    database.query('SELECT * FROM ratings WHERE code = ?', [code], (err, result) => {
        if (err)
        {
            return res.status(500).json({ error: "Chyba na strane servera" });
        }
        else 
        {
            return res.json(result);
        }
     });
}

module.exports = ratings;