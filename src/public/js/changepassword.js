import { fetchData } from './fetchData.js';
import { checkPasswordChange, response } from './validators.js';


form.addEventListener("submit", async () => {
    if (checkPasswordChange(oldpassword.value, newpassword.value, newpasswordConfirm.value))
    {
        const req = {
            oldpassword: oldpassword.value,
            newpassword: newpassword.value,
            newpasswordConfirm: newpasswordConfirm.value,
        }

        const res = await fetchData(req, "changepassword");

        response(res, "/profile");
    }
});