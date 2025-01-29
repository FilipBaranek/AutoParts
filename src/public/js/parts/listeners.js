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

function setupPartsListener(partsCount)
{
    for (let i = 1; i <= partsCount; i++)
    {
        const part = document.getElementById('div' + i);
        
        part.addEventListener('click', () => {
            const code = document.getElementById('partCode' + i).textContent;
            
            window.location.href = '/product?code=' + code;
        });
    }
}

export function setupEventListeners(partsCount)
{
    setupPriceSlidebarListener();
    setupBrandSelectListener();
    setupAvailabilitySelectListener();
    setupPriceSelectListener();
    setupPartsListener(partsCount); 
}