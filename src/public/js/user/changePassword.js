import { apiFetch } from "../api.js";
import { apiUserResponse } from "../api.js";
import { checkChangePasswordFormElements } from "../middlewares/validator.js";

form.addEventListener("submit", async () => {
    const errorMessage = checkChangePasswordFormElements(oldpassword.value, newpassword.value, newpasswordConfirm.value);

    if (errorMessage !== null) 
    {
        failure.style.display = "block";
        failure.innerText = errorMessage;
        return;
    }

    try
    {
        const req = {
            oldpassword: oldpassword.value,
            newpassword: newpassword.value,
            newpasswordConfirm: newpasswordConfirm.value
        }

        const res = await apiFetch(req, "api/changepassword");

        apiUserResponse(res, "/profile");
    }
    catch (error)
    {
        failure.style.display = "block";
        failure.innerText = error.message;
    }
});