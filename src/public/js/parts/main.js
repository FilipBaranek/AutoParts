import { fetchData } from '../fetchData.js';
import { displayParts } from './displayparts.js';
import { setupEventListeners } from './ui.js';


document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionStorage.getItem('code') && (!sessionStorage.getItem('part') || !sessionStorage.getItem('engine')))
    {
        window.location.href = '/';
        return;
    }
    
    let parts;
    let req;
    if (sessionStorage.getItem('search') === "code")
    {
        const code = sessionStorage.getItem('code');
        req = { code: code };

        parts = await fetchData(req, "parts/code");

        sessionStorage.removeItem('search');
    }
    else if (sessionStorage.getItem('search') === "engine")
    {
        const part = sessionStorage.getItem('part');
        const engine = sessionStorage.getItem('engine');
        req = { partName: part, engineName: engine };

        parts = await fetchData(req, "parts");
    } 
    const brands = await fetchData(req, "parts/brandSelect");

    displayParts(parts);
    setupEventListeners(parts, brands);
});