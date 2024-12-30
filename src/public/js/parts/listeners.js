import { sort } from './sort.js';

let brandSort = false;
let availabilitySort = false;
let priceSort = false;


function setupPriceSlidebarListener()
{
    maxPriceSlidebar.addEventListener('change', () => {
        price.textContent = maxPriceSlidebar.value;
        sort(brandSort, availabilitySort, priceSort);
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
        sort(brandSort, availabilitySort, priceSort);
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
        sort(brandSort, availabilitySort, priceSort);
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
        sort(brandSort, availabilitySort, priceSort);
    });
}

export function setupEventListeners()
{
    setupPriceSlidebarListener();
    setupBrandSelectListener();
    setupAvailabilitySelectListener();
    setupPriceSelectListener();    
}