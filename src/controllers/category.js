const database = require('../routes/database-config');


const category = async (req, res) => {
    const category = req.body.category;

    database.query('SELECT * FROM categories WHERE categoryname = ?', [category], (err, result) => {
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

module.exports = category;