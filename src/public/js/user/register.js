import { apiFetch } from "../api.js";
import { apiUserResponse } from "../api.js";
import { checkRegisterFormElements } from "../middlewares/validator.js";

form.addEventListener("submit", async () => {
    const errorMessage = checkRegisterFormElements(username.value, email.value, password.value, confirmPassword.value);

    if (errorMessage !== null) 
    {
        failure.style.display = "block";
        failure.innerText = errorMessage;
        return;
    }

    try
    {
        const req = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }

        const res = await apiFetch(req, "api/register");

        apiUserResponse(res, "/login");
    }
    catch (error)
    {
        failure.style.display = "block";
        failure.innerText = error.message;
    }
});