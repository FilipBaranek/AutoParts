const ratingsService = require('../services/ratingsService.js');


exports.ratings = async (req, res) => {
    try
    {
        const result = await ratingsService.productRating(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};

exports.userRating = async (req, res, next) => {
    try
    {
        req.rating = await ratingsService.userRating(req.body);

        next();
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}