const categoryService = require('../services/categoryService.js');


exports.categories = async (req, res) => {
    try
    {
        const result = await categoryService.partCategories(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};