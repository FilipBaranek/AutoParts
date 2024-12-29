import { apiFetch } from "../api.js";
import { apiUserResponse } from "../api.js";
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

        apiUserResponse(res, "/");
    }
    catch (error)
    {
        failure.style.display = "block";
        failure.innerText = error.message;
    }
});