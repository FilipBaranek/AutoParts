const uploadService = require('../services/uploadService.js')

exports.uploadPicture = async (req, res) => {
    try
    {
        const uploadData = { file: req.file, userId: req.user.id };
        const result = await uploadService.changeUsersProfilePicture(uploadData);
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