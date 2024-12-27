
const checkRegister = (req) => {
    const { username, email, password, confirmPassword } = req.body;

    const usernamePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,}$/;

    if (!username || !email || !password || !confirmPassword) {
        return "Zadaj svoje meno a heslo a potvrď ho";
    }
    else if (!usernamePattern.test(username))
    {
        return "Nesprávne zadané meno";
    }
    else if (!emailPattern.test(email))
    {
        return "Neplatný e-mail";
    }
    else if (password.length < 8)
    {
        return "Heslo musí obsahovať aspoň 8 znakov";
    }
    else if (password !== confirmPassword) {
        return "Heslá sa nezhodujú";
    }
    return null;
};

const checkLogin = (req) => {
    const { email, password } = req.body;

    if (!email || !password)
    {
        return "Zadajte e-mail a heslo";
    }
    return null;
};

const checkAccountDelete = (req) => {
    const { password, confirmpassword } = req.body;

    if (!password || !confirmpassword) {
        return "Zadajte heslo a potvrďte ho";
    }
    else if (password !== confirmpassword) {
        return "Heslá sa nezhodujú";
    }
    return null;

};

const checkPasswordChange = (req) => {
    const { oldpassword, newpassword, newpasswordConfirm } = req.body;

    if (!oldpassword || !newpassword || !newpasswordConfirm) {
        return "Zadaj svoje staré heslo, nové heslo a potvrď ho";
    }
    else if (newpassword !== newpasswordConfirm) {
        return "Heslá sa nezhodujú";
    }
    else if (newpassword === oldpassword)
    {
        return "Staré a nové heslo sa zhoduje";
    }
    else if (newpassword.length < 8)
    {
        return "Príliš slabé nové heslo, zadajte aspoň 8 charakterov";
    }
    return null;
};

module.exports = {
    checkPasswordChange,
    checkAccountDelete,
    checkLogin,
    checkRegister
};