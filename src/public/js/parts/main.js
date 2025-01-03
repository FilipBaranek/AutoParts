import { apiFetch } from '../api.js';
import { displayTitle, displayParts } from './displayParts.js';
import { setupEventListeners } from './listeners.js';
import { loadUI } from './ui.js';
import { errorMessage } from '../middlewares/error.js';


document.addEventListener('DOMContentLoaded', async () => {
    try 
    {
        const partData = await JSON.parse(partsContainer.getAttribute('data-parts'));
        const parts = partData ? await partData.filter(part => part.hasOwnProperty('price')) : null;

        await displayParts(parts);

        if (parts)
        {
            let req = {};
            if (partData[partData.length - 2].search === "code") 
            {
                req.code = partData[partData.length - 1].searchItem;
                req.search = "code";
            }
            else if (partData[partData.length - 2].search === "car") 
            {
                req.subcat = partData[0].subcategory;
                req.engine = partData[0].engine;
                req.search = "car";
            }
            const res = await apiFetch(req, "api/parts/brands");
            const brands = await res.json();
        
            displayTitle(partData[partData.length - 1].searchItem);
            await loadUI(parts, brands);
            setupEventListeners(parts.length);
        }
    }
    catch (err)
    {
        errorMessage();
    }
});