const database = require('../routes/database-config');


const parts = async (req, res) => {
    const partName = req.body.partName;
    const engine = req.body.engineName;

    database.query('SELECT * FROM parts WHERE subcategory = ? AND engine = ?', [partName, engine], (err, result) => {
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

const partsByCode = async (req, res) => {
    const code = req.body.code;

    database.query('SELECT * FROM parts WHERE code = ?', [code], (err, result) => {
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


const brandsFilterSelect = async (req, res) => {
    const partName = req.body.partName;
    const engine = req.body.engineName;

    database.query('SELECT DISTINCT brand FROM parts WHERE subcategory = ? AND engine = ?', [partName, engine], (err, result) => {
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

module.exports = {
    parts,
    brandsFilterSelect,
    partsByCode
};