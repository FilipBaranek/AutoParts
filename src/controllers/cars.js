const database = require('../routes/database-config');


const brands = async (req, res) => {
    database.query(`SELECT DISTINCT brand FROM cars`, (err, result) => {
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


const models = async (req, res) => {
    const brand = req.body.brand;

    database.query(`SELECT DISTINCT model FROM cars WHERE brand = ?`, [brand], (err, result) => {
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

const engines = async (req, res) => {
    const brand = req.body.brand;
    const model = req.body.model;

    database.query(`SELECT DISTINCT engine FROM cars WHERE brand = ? AND model = ?`, [brand, model], (err, result) => {
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
    brands,
    models,
    engines
};