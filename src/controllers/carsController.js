const carsService = require('../services/carsService.js');


exports.brands = async (req, res) => {
    try
    {
        const result = await carsService.carBrands();
        return res.status(201).json(result);
    }
    catch (err)
    {
        const result = null;
        return res.status(400).json(result);
    }
};

exports.models = async (req, res) => {
    try
    {
        const result = await carsService.carModels(req);
        return res.status(201).json(result);
    }
    catch (err)
    {
        const result = null;
        return res.status(400).json(result);
    }
};

exports.engines = async (req, res) => {
    try
    {
        const result = await carsService.carEngines(req);
        return res.status(201).json(result);
    }
    catch (err)
    {
        const result = null;
        return res.status(400).json(result);
    }
};
