

document.addEventListener('DOMContentLoaded', () => { 
    logoutBtn.addEventListener("click", () => {
        window.location.href = "/logout";
    });

    changePasswordBtn.addEventListener("click", () => {
        window.location.href = "/changepassword";
    });

    changeProfilePictureBtn.addEventListener("click", () => {
        window.location.href = "/profilepicture";
    });

    deleteAccountBtn.addEventListener("click", () => {
        window.location.href = "/deleteaccount";
    });
});
