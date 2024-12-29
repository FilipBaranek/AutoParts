const User = require('../models/userModel.js');
const validator = require('../middlewares/validator.js'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.registerUser = async (userData) => {
    const error = await validator.checkRegisterFormElements(userData.username, userData.email, userData.password, userData.confirmPassword);
    if (error !== null)
    {
        throw new Error(error);
    }

    const existingUser = await User.findByEmail(userData.email);
    if (existingUser !== null) 
    {
        throw new Error("Tento E-mail už je zaregistrovaný");
    }

    const password = await bcrypt.hash(userData.password, 8);

    const newUser = await User.createUser(userData.username, userData.email, password);
    if (!newUser)
    {
        throw new Error("Použivatela sa nepodarilo zaregistrovať");
    }
    return { success: true, message: "Použivatel bol zaregistrovaný" };
};

exports.loginUser = async (userData) => {
    const error = await validator.checkLoginFormElements(userData.email, userData.password);
    if (error !== null)
    {
        throw new Error(error);
    }

    const user = await User.findByEmail(userData.email);
    if (user === null || !await bcrypt.compare(userData.password, user.password))
    {
        throw new Error("Nesprávny E-mail alebo heslo");
    }

    return {
        success: true,
        message: "Použivatel bol prihlásený",
        redirectUrl: "/",
        id: user.id
    };
};

exports.changeUsersPassword = async (userData) => {
    const error = await validator.checkChangePasswordFormElements(userData.body.oldpassword, userData.body.newpassword, userData.body.newpasswordConfirm);
    if (error !== null)
    {
        throw new Error(error);
    }

    const password = await User.getPassword(userData.user.id);
    
    if (!await bcrypt.compare(userData.body.oldpassword, password))
    {
        throw new Error("Nesprávne staré heslo");
    }
    
    const newPassword = await bcrypt.hash(userData.body.newpassword, 8);
    const user = await User.changePassword(newPassword, userData.user.id);
    if (!user) 
    {
        throw new Error("Heslo sa nepodarilo zmeniť");
    }

    return { success: true, message: "Heslo bolo zmenené", redirectUrl: "/profile" };
}

exports.removeUsersAccount = async (userData) => {
    const error = await validator.checkAccountDeleteFormElements(userData.body.password, userData.body.confirmpassword);
    if (error !== null)
    {
        throw new Error(error);
    }

    const password = await User.getPassword(userData.user.id);

    if (!await bcrypt.compare(userData.body.password, password))
    {
        throw new Error("Nesprávne staré heslo");
    }

    const deletedUser = await User.deleteUser(userData.user.id);
    if (!deletedUser)
    {
        throw new Error("Účet sa nepodarilo odstrániť");
    }

    return { success: true, message: "Účet bol odstránený", redirectUrl: "/" };
}

exports.loggedInUser = async (cookie) => {
    try
    {
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        return user;
    }
    catch (err)
    {
        return null;
    }
}


