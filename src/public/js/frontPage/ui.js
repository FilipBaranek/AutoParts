import { apiFetch } from "../api.js";
import { clearAlert, selectCarAlert, selectBrandAlert, selectModelAlert, selectEngineAlert, carIsSelectedAlert } from "./alerts.js";


let carIsSelected = false;

function clearOptions(select)
{
    while (select.options.length > 1) {
        select.remove(1);
    }
}

function disableAndClear(select)
{
    clearOptions(select);
    select.disabled = true;
}

function setupSelect(select, data, param)
{
    let index = 1;
    for (const carParam of data)
    {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = carParam[param];
        select.appendChild(option);

        index++;
    }
    select.disabled = false;
}

async function setupBrands()
{
    const res = await apiFetch({}, "api/cars/brands");
    const brands = await res.json();
    setupSelect(brandSelect, brands, "brand");

    brandSelect.addEventListener('change', async () => {
        disableAndClear(modelSelect);
        disableAndClear(engineSelect);

        if (brandSelect.value !== "0" && brandSelect.value !== '')
        {
            const req = { brand: brandSelect.options[brandSelect.selectedIndex].textContent };
            const res = await apiFetch(req, "api/cars/models");
            const models = await res.json();

            setupSelect(modelSelect, models, "model");
            clearAlert();
        }
    });
}

async function setupModels()
{
    modelSelect.addEventListener('change', async () => {
        disableAndClear(engineSelect);

        if (modelSelect.value !== "0" && modelSelect.value !== '')
        {
            const req = {
                brand: brandSelect.options[brandSelect.selectedIndex].textContent,
                model: modelSelect.options[modelSelect.selectedIndex].textContent
            };
            const res = await apiFetch(req, "api/cars/engines");
            const engines = await res.json();

            setupSelect(engineSelect, engines, "engine");
            clearAlert();
        }
    });
}

async function setupEngines()
{
    engineSelect.addEventListener('change', () => {
        clearAlert();
    });
}

function setupSelectButton()
{
    selectButton.addEventListener('click', () => {
        if (engineSelect.disabled === false && engineSelect.value !== "0" && engineSelect.value !== '')
        {
            carIsSelectedAlert();

            const value = engineSelect.options[engineSelect.selectedIndex].text;
            sessionStorage.setItem('engine', value);
            carIsSelected = true;
        }
        else if (engineSelect.disabled === true || modelSelect.value === "0" || engineSelect.value === '')
        {
            selectModelAlert();
        }
        else if (brandSelect.value === "0" || brandSelect.value === '')
        {
            selectBrandAlert();
        }
        else
        {
            selectEngineAlert();
        }
    });
}

function setupCategories()
{
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(category => {
        category.addEventListener('click', () => {
            if (!carIsSelected)
            {
                selectCarAlert();
            }
            else
            {
                sessionStorage.setItem('partCategory', category.querySelector('img').alt);
                window.location.href = "/category";
            }
        });
    });
}

export function setupListeners()
{
    setupBrands();
    setupModels();
    setupEngines();
    setupSelectButton();
    setupCategories();
}