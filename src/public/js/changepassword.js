form.addEventListener("submit", () => {
    const changepassword = {
        oldpassword: oldpassword.value,
        newpassword: newpassword.value,
        newpasswordConfirm: newpasswordConfirm.value,
    }
    fetch("/api/changepassword", {
        method: "POST",
        body: JSON.stringify(changepassword),
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
                    window.location.href = data.redirectUrl || "/profile";
                }, 500); 
            }
        })
});