import { displayParts } from './displayparts.js';

export function sort(parts, brandSort, availabilitySort, priceSort)
{
    if (brandSort === true)
    {
        parts = sortByBrand(parts);
    }
    if (availabilitySort === true)
    {
        parts = sortByAvailability(parts);
    }
    if (priceSort === true)
    {
        parts = sortByPrice(parts);
    }
    parts = sortByMaxLimit(parts);

    displayParts(parts);
}

function sortByPrice(parts)
{
    if (priceSelect.value === "lowest")
    {
        parts.sort((a, b) => a.price - b.price);
    }
    else if (priceSelect.value === "highest") 
    {
        parts.sort((a, b) => b.price - a.price);
    }
    return parts;
}

function sortByAvailability(parts)
{
    if (availabilitySelect.value === "inStock")
    {
        return parts.filter(part => part.availability === "Skladom");
    }
    else if (availabilitySelect.value === "order")
    {
        return parts.filter(part => part.availability === "Na objednávku");
    }
    return parts;
}

function sortByBrand(parts)
{
    const selectedBrand = brandSelect.options[brandSelect.selectedIndex].textContent;
    
    return parts.filter(part => part.brand === selectedBrand);
}

function sortByMaxLimit(parts)
{
    const maxLimit = parseFloat(maxPriceSlidebar.value);

    return parts.filter(part => parseFloat(part.price) <= maxLimit);
}