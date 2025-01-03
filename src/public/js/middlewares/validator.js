
export function checkRegisterFormElements(username, email, password, confirmPassword)
{
    const usernamePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,}$/;

    if (!username || !email || !password || !confirmPassword)
    {
        return "Vyplňte všetky polia";
    }
    else if (!usernamePattern.test(username))
    {
        return "Meno môže obsahovať iba písmená";
    }
    else if (!emailPattern.test(email))
    {
        return "Neplatný e-mail";
    }
    else if (password !== confirmPassword) {
        return "Heslá sa nezhodujú";
    }
    else if (password.length < 8) {
        return "Heslo musí obsahovať aspoň 8 znakov";
    }
    return null;
}

export function checkLoginFormElements(email, password)
{
    if (!email || !password)
    {
        return "Zadajte E-mail a heslo";
    }
    return null;
}

export function checkChangePasswordFormElements(oldpassword, newpassword, newpasswordConfirm)
{
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
}

export function checkAccountDeleteFormElements(password, confirmpassword)
{
    if (!password || !confirmpassword) 
    {
        return "Zadajte heslo a potvrďte ho";
    }
    else if (password !== confirmpassword) 
    {
        return "Heslá sa nezhodujú";
    }
    return null;
}

export function checkUsersReviewInput(reviewText)
{
    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim() === '') 
    {
        return "Recenzia nemôže byť prázdna";
    }
    if (reviewText.length > 1000) 
    {
        return "Recenzia môže obsahovať maximálnne 1000 znakov";
    }
    return null;
}

