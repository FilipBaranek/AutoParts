import { apiFetch } from "../api.js";
import { userResponse, userErrorResponse } from "./userResponse.js";
import { checkLoginFormElements } from "../middlewares/validator.js";

form.addEventListener("submit", async () => {
    const errorMessage = checkLoginFormElements(email.value, password.value);

    if (errorMessage !== null) 
    {
        failure.style.display = "block";
        failure.innerText = errorMessage;
        return;
    }

    try
    {
        const req = {
            email: email.value,
            password: password.value,
        }

        const res = await apiFetch(req, "api/login");
        userResponse(res, "/");
    }
    catch (error)
    {
        userErrorResponse();
    }
});