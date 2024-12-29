const authService = require('../services/authService.js');
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    try
    {
        const result = await authService.registerUser(req.body);
        return res.status(201).json(result);
    }
    catch (err)
    {
        return res.status(400).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try
    {
        const result = await authService.loginUser(req.body);

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
        return res.status(400).json({ success: false, message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try
    {
        const result = await authService.changeUsersPassword(req);
        return res.status(200).json(result);
    }  
    catch (err)
    {
        return res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try
    {
        const result = await authService.removeUsersAccount(req);
        return res.status(200).json(result);
    }
    catch (err)
    {
        return res.status(400).json({ success: false, message: err.message }); 
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
        console.error("Verification error:", err.message);
        
        req.user = null;

        return next();
    }
}

exports.logout = (req, res) => {
    res.clearCookie("user_registered");
    res.redirect("/");
}


