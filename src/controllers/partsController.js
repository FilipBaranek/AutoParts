const partsService = require('../services/partsService.js');


exports.parts = async (req, res, next) => {
    try
    {
        req.parts = await partsService.carParts(req.partData);

        req.parts.push({ search: req.partData.search });
        if (req.partData.search === "car")
        {
            req.parts.push({searchItem: req.parts[0].subcategory });
        }
        else
        {
            req.parts.push({ searchItem: req.partData.code });
        }

        next();
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
        const brands = await partsService.partBrands(req.body);

        return res.status(200).json(brands);
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
        let parts;
        if (!req.body.code)
        {
            parts = await partsService.sortParts(req.body);
        }
        else
        {
            parts = await partsService.sortPartsByCode(req.body);
        }

        return res.status(200).json(parts);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}
