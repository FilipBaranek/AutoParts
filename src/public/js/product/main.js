import { errorMessage } from "../middlewares/error.js";
import { loadHTMLContent } from "./loadContent.js";


document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionStorage.getItem('partNumber')) 
    {
        window.location.href = '/';
        return;
    }

    try 
    {
        loadHTMLContent();
    }
    catch (err)
    {
        errorMessage();
    }
});