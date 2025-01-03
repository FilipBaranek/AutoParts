const authService = require('../services/authService.js');
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    try
    {
        const result = await authService.registerUser(req.body);
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

exports.login = async (req, res) => {
    try
    {
        const result = await authService.loginUser(req.body);

        if (!result.success)
        {
            return res.status(400).json(result);
        }

        const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
            httpOnly: true
        }

        res.cookie("user_registered", token, cookieOptions);

        return res.status(200).json(result);
    }
    catch (err)
    {
        return res.status(500).json({ message: "Chyba na strane servera" });
    }
};

exports.changePassword = async (req, res) => {
    try
    {
        const result = await authService.changeUsersPassword(req);

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
};

exports.deleteAccount = async (req, res) => {
    try
    {
        const result = await authService.removeUsersAccount(req);

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

exports.loggedIn = async (req, res, next) => {
    try
    {
        req.user = await authService.loggedInUser(req.cookies.user_registered);

        next();
    }
    catch (err)
    {
        req.user = null;

        return next();
    }
}

exports.logout = (req, res) => {
    res.clearCookie("user_registered");
    res.redirect("/");
}


