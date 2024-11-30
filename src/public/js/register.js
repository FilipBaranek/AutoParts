form.addEventListener("submit", () => {
    const usernamePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!username.value || !email.value || !password.value || !confirmPassword.value)
    {
        error.style.display = "block";
        error.innerText = "Vyplňte všetky polia";
        return;
    }
    else if (!usernamePattern.test(username.value)) {
        error.style.display = "block";
        error.innerText = "Meno môže obsahovať iba písmená";
        return;
    }

    else if (!emailPattern.test(email.value)) {
        error.style.display = "block";
        error.innerText = "Neplatný e-mail";
        return;
    }
    else if (password.value !== confirmPassword.value) {
        error.style.display = "block";
        error.innerText = "Heslá sa nezhodujú";
        return;
    }

    else if (password.value.length < 8) {
        error.style.display = "block";
        error.innerText = "Heslo musí obsahovať aspoň 8 znakov";
        return;
    }
    else 
    {
        const register = {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
        }
        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(register),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.status == "error") {
                    success.style.display = "none"
                    error.style.display = "block"
                    error.innerText = data.error
                }
                else {
                    error.style.display = "none"
                    success.style.display = "block"
                    success.innerText = data.success

                    setTimeout(() => {
                        window.location.href = data.redirectUrl || "/";
                    }, 500);
                }
            })
    }
});