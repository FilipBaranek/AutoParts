form.addEventListener("submit", () => {
    const deleteaccount = {
        password: password.value,
        confirmpassword: confirmpassword.value
    }
    fetch("/api/deleteaccount", {
        method: "POST",
        body: JSON.stringify(deleteaccount),
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

                setTimeout(() => {
                    window.location.href = data.redirectUrl || "/";
                }, 500); 
            }
        })
});