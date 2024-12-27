import { fetchData } from "./fetchData.js";
import { checkRegister, response } from "./validators.js";

form.addEventListener("submit", async () => {
    if (checkRegister(username.value, email.value, password.value, confirmPassword.value))
    {
        const req = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }

        const res = await fetchData(req, "register");

        response(res, "/login");
    }
});