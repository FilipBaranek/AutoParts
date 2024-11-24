const database = require('../routes/database-config');

const cars = async (req, res) => {
    database.query('SELECT * FROM cars', async (err, result) => {
        if (err)
        {
            throw err;
        }
        else
        {
            return res.json(result);
        }
    })
}

module.exports = cars;