import { displayParts } from './displayparts.js';
import { apiFetch } from '../api.js';


export async function sort(brandSort, availabilitySort, priceSort)
{
    let req = { partName: sessionStorage.getItem('part'), engineName: sessionStorage.getItem('engine') };
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
    const parts = await res.json();

    displayParts(parts);
}