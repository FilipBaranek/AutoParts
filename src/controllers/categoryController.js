const categoryService = require('../services/categoryService.js');


exports.categories = async (req, res, next) => {
    try
    {
        req.subcat = await categoryService.partCategories(req.catData);
        
        next();
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};