
function setupBrands(brands)
{
    brands.forEach((brand, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = brand.brand;
        brandSelect.appendChild(option);
    });
}

function setupSlidebar(parts)
{
    const prices = parts.map(part => parseFloat(part.price));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    maxPriceSlidebar.min = minPrice;
    maxPriceSlidebar.max = maxPrice;
    maxPriceSlidebar.value = maxPrice;
    price.textContent = maxPrice;
}

export function loadUI(parts, brands)
{
    if (!parts || parts.length <= 1)
    {
        availabilitySelect.disabled = true;
        priceSelect.disabled = true;
        brandSelect.disabled = true;
        maxPriceSlidebar.disabled = true;
        return;
    }

    setupSlidebar(parts);
    setupBrands(brands);
}