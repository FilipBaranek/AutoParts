import { apiFetch } from '../api.js';
import { displayParts } from './displayParts.js';
import { setupEventListeners } from './listeners.js';
import { loadUI } from './ui.js';
import { errorMessage } from '../middlewares/error.js';


document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionStorage.getItem('code') && (!sessionStorage.getItem('part') || !sessionStorage.getItem('engine'))) 
    {
        window.location.href = '/';
        return;
    }
    
    try 
    {
        let req;
        if (sessionStorage.getItem('search') === "code") 
        {
            const code = sessionStorage.getItem('code');

            req = { code: code };
        }
        else if (sessionStorage.getItem('search') === "engine") 
        {
            const part = sessionStorage.getItem('part');
            const engine = sessionStorage.getItem('engine');

            req = { partName: part, engineName: engine };
        }
        const res = await apiFetch(req, "api/parts");
        const brandRes = await apiFetch(req, "api/parts/brands");

        const parts = await res.json();
        const brands = await brandRes.json();


        displayParts(parts);
        loadUI(parts, brands);
        setupEventListeners(parts, brands);
    }
    catch (err)
    {
        errorMessage();
    }
});