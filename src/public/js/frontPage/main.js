import { setupListeners } from "./ui.js";
import { errorMessage } from "../middlewares/error.js";

document.addEventListener('DOMContentLoaded', async () => {
    try 
    {
        setupListeners();
    }
    catch (err)
    {
        errorMessage();
    }
});