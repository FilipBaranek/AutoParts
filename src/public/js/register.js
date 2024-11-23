form.addEventListener("submit", () => {
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
            if (data.status == "error")
            {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            }
            else
            {
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
            }
        })
});