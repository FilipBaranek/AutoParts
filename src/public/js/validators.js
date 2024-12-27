
export function checkRegister(username, email, password, confirmPassword)
{
    const usernamePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,}$/;
    if (!username || !email || !password || !confirmPassword)
    {
        error.style.display = "block";
        error.innerText = "Vyplňte všetky polia";
        return false;
    }
    else if (!usernamePattern.test(username)) {
        error.style.display = "block";
        error.innerText = "Meno môže obsahovať iba písmená";
        return false;
    }
    else if (!emailPattern.test(email)) {
        error.style.display = "block";
        error.innerText = "Neplatný e-mail";
        return false;
    }
    else if (password !== confirmPassword) {
        error.style.display = "block";
        error.innerText = "Heslá sa nezhodujú";
        return false;
    }

    else if (password.length < 8) {
        error.style.display = "block";
        error.innerText = "Heslo musí obsahovať aspoň 8 znakov";
        return false;
    }
    return true;
}

export function checkLogin(email, password)
{
    if (!email || !password)
    {
        error.style.display = "block";
        error.innerText = "Vyplňte všetky polia";
        return false;
    }
    return true;
}

export function checkAccountDelete(password, confirmpassword)
{
    if (!password || !confirmpassword) 
    {
        error.style.display = "block";
        error.innerText = "Zadajte heslo a potvrďte ho";
        return false;
    }
    else if (password !== confirmpassword) 
    {
        error.style.display = "block";
        error.innerText = "Heslá sa nezhodujú";
        return false;
    }
    return true;
}

export function checkPasswordChange(oldpassword, newpassword, newpasswordConfirm)
{
    if (!oldpassword || !newpassword || !newpasswordConfirm)
        {
        error.style.display = "block";
        error.innerText = "Zadaj svoje staré heslo, nové heslo a potvrď ho";
        return false;
    }
    else if (newpassword !== newpasswordConfirm) 
    {
        error.style.display = "block";
        error.innerText = "Heslá sa nezhodujú";
        return false;
    }
    else if (newpassword === oldpassword)
    {
        error.style.display = "block";
        error.innerText = "Nové a staré heslo sa zhoduje";
        return false;
    }
    else if (newpassword.length < 8) 
    {
        error.style.display = "block";
        error.innerText = "Nové heslo musí obsahovať aspoň 8 znakov";
        return false;
    }
    return true;
}

export function response(res, redirectPath)
{
    if (res.valid === false) 
    {
        success.style.display = "none"
        error.style.display = "block"
        error.innerText = res.error
    }
    else 
    {
        error.style.display = "none"
        success.style.display = "block"
        success.innerText = res.success

        setTimeout(() => {
            window.location.href = res.redirectUrl || redirectPath;
        }, 500);
    }
}