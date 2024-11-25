const database = require('../routes/database-config');


const cars = async (req, res) => {
    if (req.body.paramType === "paramType")
    {
        return res.json(await findParamTypeInDatabase(req.body.param));
    }
    else if (req.body.paramType === "selectCar")
    {
        return res.json(await selectCar(req.body.param));
    }
    else
    {
        return res.json(await findParamInDatabase(req.body.paramType, req.body.param, req.body.searchParam));
    }
}


function findParamTypeInDatabase(paramType)
{
    return new Promise((resolve, reject) => {
        database.query(`SELECT DISTINCT ${paramType} FROM cars`, (err, res) => {
            if (err)
            {
                return reject(err);
            }
            else 
            {
                resolve(res);
            }
        });
    });
}

function findParamInDatabase(paramType, param, searchParam)
{
    return new Promise((resolve, reject) => {
        database.query(`SELECT DISTINCT ${paramType} FROM cars WHERE ${param} = ?`, [searchParam], (err, res) => {
            if (err)
            {
                return reject(err);
            }
            else 
            {
                resolve(res);
            }
        });
    });
}

function selectCar(param)
{
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM cars WHERE engine = ?`, [param], (err, res) => {
            if (err)
            {
                return reject(err);
            }
            else 
            {
                resolve(res);
            }
        });
    });
}

module.exports = cars;