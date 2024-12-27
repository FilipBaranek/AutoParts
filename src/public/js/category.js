import { fetchData } from "./fetchData.js";


let subcatCount = 0;

async function loadContent()
{
    const req = { category: sessionStorage.getItem('partCategory') };
    const subcats = await fetchData(req, "category");

    subcategories.innerHTML = "";
    for (const subcat of subcats)
    {
        subcatCount++;

        subcategories.innerHTML += `
            <div class="col">
                <div class="part-card" id=${subcatCount.toString()}>
                    <img class="img-fluid" src=${subcat.image} alt=${subcat.partname}>
                    <p class="text-danger fw-bold mt-3">${subcat.partname}</p>
                </div>
            </div>
        `;
    }
}

function setupListeners()
{
    for (let i = 1; i <= subcatCount; i++)
    {
        const subcat = document.getElementById(i.toString());

        subcat.addEventListener('click', () => {
            sessionStorage.setItem('part', subcat.querySelector('p').textContent);
            sessionStorage.setItem('search', "engine");
            window.location.href = "/parts";
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionStorage.getItem('partCategory') || !sessionStorage.getItem('engine'))
    {
        window.location.href = '/';
    }
    else
    {
        await loadContent();            //await kvôli subcatCount
        setupListeners();
    }
});
