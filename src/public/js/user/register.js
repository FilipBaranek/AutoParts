import { apiFetch } from "../api.js";
import { userResponse, userErrorResponse } from "./userResponse.js";
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
        userResponse(res, "/login");
    }
    catch (error)
    {
        userErrorResponse();
    }
});