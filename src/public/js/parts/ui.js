import { sort } from './sort.js';

let brandSort = false;
let availabilitySort = false;
let priceSort = false;
let parts = null;

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
    document.getElementById('price').textContent = maxPrice;
}

function setupPriceSlidebarListener()
{
    maxPriceSlidebar.addEventListener('change', () => {
        price.textContent = maxPriceSlidebar.value;
        sort(parts, brandSort, availabilitySort, priceSort);
    });
}

function setupBrandSelectListener()
{
    brandSelect.addEventListener('change', () => {
        if (brandSelect.value !== '' && brandSelect.value !== "0")
        {
            brandSort = true;
        }
        else
        {
            brandSort = false;
        }
        sort(parts, brandSort, availabilitySort, priceSort);
    });
}

function setupAvailabilitySelectListener()
{
    availabilitySelect.addEventListener('change', () => {
        if (availabilitySelect.value === "inStock" || availabilitySelect.value === "order")
        {
            availabilitySort = true;
        }
        else
        {
            availabilitySort = false;
        }
        sort(parts, brandSort, availabilitySort, priceSort);
    });
}

function setupPriceSelectListener()
{
    priceSelect.addEventListener('change', () => {
        if (priceSelect.value === "lowest" || priceSelect.value === "highest")
        {
            priceSort = true;
        }
        else
        {
            priceSort = false;
        }
        sort(parts, brandSort, availabilitySort, priceSort);
    });
}

export function setupEventListeners(loadedParts, brands)
{
    parts = loadedParts;
    
    if (!parts || parts.length <= 1)
    {
        availabilitySelect.disabled = true;
        priceSelect.disabled = true;
        brandSelect.disabled = true;
        maxPriceSlidebar.disabled = true;
        return;
    }

    setupBrands(brands);
    setupSlidebar(parts);
    setupPriceSlidebarListener();
    setupBrandSelectListener();
    setupAvailabilitySelectListener();
    setupPriceSelectListener();    
}