import { apiFetch } from "../api.js";
import { getRatingValue, getRatingStatistics } from "../middlewares/ratings.js";


async function fetchRating(code)
{
    const req = { code: code };

    const res = await apiFetch(req, "api/ratings");
    const ratingData = await res.json();

    return ratingData;
}

function loadDescriptionHTMLContent(partDescription, productCode, compatibleCodesInLine)
{
    description.innerHTML = `
        ${partDescription}
        <br><b>Kód produktu: ${productCode}</b>
        <br>Kompatibilné kódy dielov:
    `;

    const compatibleCodes = compatibleCodesInLine.split(',');
    for (const compatibleCode of compatibleCodes) 
    {
        description.innerHTML += `<br>- ${compatibleCode}`;
    }
}

async function loadPartHTMLContent(product)
{
    productImage.src = product.image;
    productName.textContent = product.brand.toUpperCase();
    
    loadDescriptionHTMLContent(product.description, product.code, product.compatible_codes);

    price.textContent = product.price;
    availability.textContent = product.availability;

    if (product.availability === "Vypredané")
    {
        addToCartButton.style.display = "none";
    }
}

async function loadRatingHTMLContent(productCode)
{
    const rating = await fetchRating(productCode);
    const ratingValues = getRatingValue(rating);

    ratingImage.style.clipPath = `inset(0 ${ratingValues.ratingPercentage}% 0 0)`;
    ratingPercentage.textContent = ratingValues.ratingValue;
    ratingCount.textContent = "Priemer z " + ratingValues.ratingCount + " hodnotení";

    if (rating && rating.length > 0)
    {
        const ratingStatistics = getRatingStatistics(rating);
        for (let i = 1; i <= 5; i++)
        {
            document.getElementById('star' + i + 'Percentage').textContent = `${6 - i}⭐${ratingStatistics[5 - i]}%`;
            document.getElementById('starGraph' + i).style.clipPath = `inset(0 ${100 - ratingStatistics[5 - i]}% 0 0)`;
        }
    }
}

export function loadHTMLContent()
{
    const product = JSON.parse(main.getAttribute('data-product'));

    loadPartHTMLContent(product[0]);
    loadRatingHTMLContent(product[2].searchItem);
}