const partsService = require('../services/partsService.js');


exports.parts = async (req, res, next) => {
    try
    {
        if (req.partData.search === "car" || req.partData.search === "code")
        {
            req.parts = await partsService.carParts(req.partData);

            if (req.parts !== null)
            {
                req.parts.push({ search: req.partData.search });

                if (req.partData.search === "car") 
                {
                    req.parts.push({ searchItem: req.parts[0].subcategory });
                }
                else if (req.partData.search === "code") 
                {
                    req.parts.push({ searchItem: req.partData.code });
                }
            }
        }
        else
        {
            req.parts = null;
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
