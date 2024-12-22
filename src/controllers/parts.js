const database = require('../routes/database-config');


const part = async (req, res) => {
    const partName = req.body.part;
    const engine = req.body.engine;

    if (req.body.function === "selectParts")
    {
        return res.json(await selectParts(partName, engine));
    }
    else if (req.body.function === "selectBrands")
    {
        return res.json(await selectBrands(partName, engine));
    }
    else if (req.body.function === "sortByBrand")
    {
        return res.json(await sortByBrand(partName, engine, req.body.brand));
    }
}

function selectParts(partName, engine)
{
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM parts WHERE subcategory = ? AND engine = ?', [partName, engine], (err, result) => {
            if (err)
            {
                return reject(err);
            }
            else 
            {
                 resolve(result);
            }
         });
    });
}

function selectBrands(partName, engine)
{
    return new Promise((resolve, reject) => {
        database.query('SELECT DISTINCT brand FROM parts WHERE subcategory = ? AND engine = ?', [partName, engine], (err, result) => {
            if (err)
            {
                return reject(err);
            }
            else 
            {
                resolve(result);
            }
         });
    });
}

function sortFromLowest()
{

}

function sortFromHighest()
{

}

function sortByBrand(partName, engine, brand)
{
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM parts WHERE subcategory = ? AND engine = ? and brand = ?', [partName, engine, brand], (err, result) => {
            if (err)
            {
                return reject(err);
            }
            else 
            {
                resolve(result);
            }
         });
    });
}

module.exports = part;