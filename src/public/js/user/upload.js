import { apiFetchFile } from "../api.js";
import { userResponse, userErrorResponse } from "./userResponse.js";

form.addEventListener("submit", async () => {
    try
    {
        const res = await apiFetchFile(file.files[0], "api/upload");
        userResponse(res, res.redirectUrl || "/profile");
    }
    catch (error)
    {
        userErrorResponse();
    }
});