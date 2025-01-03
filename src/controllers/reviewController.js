const reviewService = require('../services/reviewService.js');


exports.submit = async (req, res) => {
    try
    {
        const result = await reviewService.createReview(req.body);
        if (!result.success)
        {
            return res.status(400).json(result);
        }
        
        return res.status(201).json(result);
    }
    catch (err)
    {
        return res.status(500).json({ message: "Chyba na strane servera" });
    }
};

exports.find = async (req, res) => {
    try
    {
        const result = await reviewService.findReviews(req.body);
        return res.status(200).json(result);
    }
    catch (err)
    {
        return res.status(500).json({ message: "Chyba na strane servera" });
    }
};

exports.delete = async (req, res) => {
    try
    {
        const result = await reviewService.deleteReview(req.body);
        if (!result.success)
        {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    }
    catch (err)
    {
        return res.status(500).json({ message: "Chyba na strane servera" });
    }
}

exports.edit = async (req, res) => {
    try
    {
        const result = await reviewService.editReview(req.body);
        if (!result.success)
        {
            return res.status(400).json(result);
        }
        
        return res.status(200).json(result);
    }
    catch (err)
    {
        return res.status(500).json({ message: "Chyba na strane servera" });
    }
}
