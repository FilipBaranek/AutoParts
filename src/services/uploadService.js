const validator = require('../middlewares/validator.js');
const User = require('../models/userModel.js');
const fs = require('fs');


exports.changeUsersProfilePicture = async (uploadData) => {
    if (!uploadData.file)
    {
        return { success: false, message: "Pred odoslaním vyhľadajte súbor" };
    }

    const isValid = await validator.isValidImage(uploadData.file.path);
    if (!isValid)
    {
        fs.unlinkSync(uploadData.file.path);

        return { success: false, message: "Nesprávny typ súboru" };
    }

    const hasProfilePicture = await User.getProfilePicture(uploadData.userId);
    if (hasProfilePicture !== "/uploads/defaultProfilePicture.png")
    {
        fs.unlinkSync("/app/src" + hasProfilePicture);
    }

    const filePath = uploadData.file.path.replace("/app/src", "");

    const upload = await User.changeProfilePicture(filePath, uploadData.userId);
    if (!upload)
    {
        return { success: false, message: "Obrázok sa nepodarilo nahrať" };
    }

    return { success: true, message: "Obrázok bol zmenený", redirectUrl: "/profile" };
}