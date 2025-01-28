const User = require('../models/userModel.js');
const validator = require('../middlewares/validator.js'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fs = require('fs');

exports.registerUser = async (userData) => {
    const error = await validator.checkRegisterFormElements(userData.username, userData.email, userData.password, userData.confirmPassword);
    if (error !== null)
    {
        return { success: false, message: error };
    }

    const existingUser = await User.findByEmail(userData.email);
    if (existingUser !== null) 
    {
        return { success: false, message: "Tento E-mail už je zaregistrovaný" };
    }

    const password = await bcrypt.hash(userData.password, 8);

    const newUser = await User.createUser(userData.username, userData.email, password);
    if (!newUser)
    {
        return { success: false, message: "Použivatela sa nepodarilo zaregistrovať" };
    }
    return { success: true, message: "Použivatel bol zaregistrovaný" };
};

exports.loginUser = async (userData) => {
    const error = await validator.checkLoginFormElements(userData.email, userData.password);
    if (error !== null)
    {
        return { success: false, message: error };
    }

    const user = await User.findByEmail(userData.email);
    if (user === null || !await bcrypt.compare(userData.password, user.password))
    {
        return { success: false, message: "Nesprávny E-mail alebo heslo" };
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
        return { success: false, message: error };
    }

    const password = await User.getPassword(userData.user.id);
    
    if (!await bcrypt.compare(userData.body.oldpassword, password))
    {
        return { success: false, message: "Nesprávne staré heslo" };
    }
    
    const newPassword = await bcrypt.hash(userData.body.newpassword, 8);
    const user = await User.changePassword(newPassword, userData.user.id);
    if (!user) 
    {
        return { success: false, message: "Heslo sa nepodarilo zmeniť" };
    }

    return { success: true, message: "Heslo bolo zmenené", redirectUrl: "/profile" };
}

exports.removeUsersAccount = async (userData) => {
    const error = await validator.checkAccountDeleteFormElements(userData.body.password, userData.body.confirmpassword);
    if (error !== null)
    {
        return { success: false, message: error };
    }

    const password = await User.getPassword(userData.user.id);
    if (!await bcrypt.compare(userData.body.password, password))
    {
        return { success: false, message: "Nesprávne heslo" };
    }

    const hasProfilePicture = await User.getProfilePicture(userData.user.id);
    if (hasProfilePicture !== "/uploads/defaultProfilePicture.png") 
    {
        fs.unlinkSync("/app/src" + hasProfilePicture);
    }
    
    const deletedUser = await User.deleteUser(userData.user.id);
    if (!deletedUser)
    {
        return { success: false, message: "Účet sa nepodarilo odstrániť" };
    }

    return { success: true, message: "Účet bol odstránený", redirectUrl: "/" };
}

exports.loggedInUser = async (cookie) => {
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    return user;
}


