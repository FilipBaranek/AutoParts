const partsService = require('../services/partsService.js');


exports.parts = async (req, res) => {
    try
    {
        const result = await partsService.carParts(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};

exports.brands = async (req, res) => {
    try
    {
        const result = await partsService.partBrands(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};

exports.sort = async (req, res) => {
    try
    {
        const result = await partsService.sortParts(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}
