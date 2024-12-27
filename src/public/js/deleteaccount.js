import { fetchData } from "./fetchData.js"
import { checkAccountDelete, response } from "./validators.js";


form.addEventListener("submit", async () => {
    if (checkAccountDelete(password.value, confirmpassword.value))
    {
        const req = {
            password: password.value,
            confirmpassword: confirmpassword.value
        }

        const res = await fetchData(req, "deleteaccount");

        response(res, "/");
    }
});