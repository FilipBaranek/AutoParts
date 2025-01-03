const ratingsService = require('../services/ratingsService.js');


exports.ratings = async (req, res) => {
    try
    {
        const rating = await ratingsService.productRating(req.body);
        return res.status(200).json(rating);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
};

exports.postUserRating = async (req, res) => {
    try
    {
        const rating = await ratingsService.userRating(req.body);
        return res.status(200).json(rating);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}

exports.getUserRating = async (req, res, next) => {
    try
    {
        req.rating = await ratingsService.userRating(req.ratingData);

        next();
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}

exports.createRating = async (req, res) => {
    try
    {
        await ratingsService.createUsersRating(req.body);
        return res.status(201).json(true);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}

exports.removeRating = async (req, res) => 
{
    try
    {
        await ratingsService.removeUsersRating(req.body);
        return res.status(204).json(true);
    }
    catch (err)
    {
        console.error(err.message);
        return res.status(500).json("Chyba na strane servera");
    }
}
