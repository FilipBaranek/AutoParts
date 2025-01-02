import { errorMessage } from "../middlewares/error.js";
import { setupListeners } from "./listeners.js";
import { loadHTMLContent } from "./loadContent.js";


document.addEventListener('DOMContentLoaded', async () => {
    try 
    {
        loadHTMLContent();
        setupListeners();
    }
    catch (err)
    {
        errorMessage();
    }
});