const carsService = require('../services/carsService.js');


exports.brands = async (req, res) => {
    try
    {
        const result = await carsService.carBrands();
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};

exports.models = async (req, res) => {
    try
    {
        const result = await carsService.carModels(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};

exports.engines = async (req, res) => {
    try
    {
        const result = await carsService.carEngines(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};
