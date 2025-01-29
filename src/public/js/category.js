import { errorMessage } from "./middlewares/error.js";

const subcatLength = subcategories.getAttribute('data-length');

function getUrl(categoryName)
{
    const urlParams = new URLSearchParams(window.location.search);
    const engine = urlParams.get('engine');

    return `/parts?search=car&subcat=${categoryName}&engine=${engine}`;
}

function setupListeners()
{
    for (let i = 1; i <= subcatLength; i++)
    {
        const subcat = document.getElementById(i.toString());
        
        subcat.addEventListener('click', () => {
            window.location.href = getUrl(subcat.getAttribute('data-url-name'));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { 
    try
    {
        setupListeners();
    }
    catch (err)
    {
        errorMessage();
    }
});