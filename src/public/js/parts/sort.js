import { displayParts } from './displayParts.js';
import { apiFetch } from '../api.js';


export async function sort(brandSort, availabilitySort, priceSort)
{
    const parts = JSON.parse(partsContainer.getAttribute('data-parts'));
    let req = {};

    if (parts[parts.length - 2] === "code")
    {
        req.code = parts[parts.length - 1].searchItem;
    }
    else
    {
        req.partName = parts[0].subcategory;
        req.engineName = parts[0].engine;
    }
    
    if (brandSort === true)
    {
        req.brand = brandSelect.options[brandSelect.selectedIndex].textContent;
    }
    if (availabilitySort === true)
    {
        req.availability = availabilitySelect.value === "inStock" ? "Skladom" : "Na objednávku";
    }
    if (priceSort === true)
    {
        req.price = priceSelect.value;
    }
    req.maxPrice = maxPriceSlidebar.value;

    const res = await apiFetch(req, "api/parts/sort");
    const sortedParts = await res.json();
    
    displayParts(sortedParts);
}