import { apiFetch } from "../api.js";
import { userResponse, userErrorResponse } from "./userResponse.js";
import { checkAccountDeleteFormElements } from "../middlewares/validator.js";

form.addEventListener("submit", async () => {
    const errorMessage = checkAccountDeleteFormElements(password.value, confirmpassword.value);

    if (errorMessage !== null) 
    {
        failure.style.display = "block";
        failure.innerText = errorMessage;
        return;
    }

    try
    {
        const req = {
            password: password.value,
            confirmpassword: confirmpassword.value
        }

        const res = await apiFetch(req, "api/deleteaccount");
        userResponse(res, "/");
    }
    catch (error)
    {
        userErrorResponse();
    }
});