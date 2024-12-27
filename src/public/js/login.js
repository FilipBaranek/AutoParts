import { fetchData } from "./fetchData.js";
import { checkLogin, response } from "./validators.js";

form.addEventListener("submit", async () => {
    if (checkLogin(email.value, password.value))
    {
        const req = {
            email: email.value,
            password: password.value
        }

        const res = await fetchData(req, "login");

        response(res, "/")
    }
});