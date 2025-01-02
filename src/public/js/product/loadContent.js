import { getRatingValue, getRatingStatistics } from "../middlewares/ratings.js";
import { getRating, getUsersRating } from "./ratingEventHandler.js";

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

async function loadUIContent(productCode)
{
    const usersData =  JSON.parse(user.getAttribute('data-user'));
    const usersRatingData = usersData ? await getUsersRating(productCode, usersData.id) : null;
    if (usersRatingData)
    {
        createButton.style.display = "none";

        for (let i = 1; i <= 5; i++) 
        {
            const ratingStar = document.getElementById('star' + i);
            ratingStar.checked = i === usersRatingData[0].value ? true : false;
            ratingStar.disabled = true;
        }
    }
    else
    {
        if (usersData)
        {
            removeButton.style.display = "none";

            for (let i = 1; i <= 5; i++) 
            {
                const ratingStar = document.getElementById('star' + i);
                ratingStar.checked = false;
                ratingStar.disabled = false;
            }
        }
    }
}

export async function loadRatingHTMLContent(productCode)
{
    const rating = await getRating(productCode);
    const ratingValues = getRatingValue(rating);

    ratingImage.style.clipPath = `inset(0 ${ratingValues.ratingPercentage}% 0 0)`;
    ratingPercentage.textContent = ratingValues.ratingValue;
    ratingCount.textContent = "Priemer z " + ratingValues.ratingCount + " hodnotení";

    const ratingStatistics = rating ? getRatingStatistics(rating) : [0, 0, 0, 0, 0];
    for (let i = 1; i <= 5; i++)
    {
        document.getElementById('star' + i + 'Percentage').textContent = `${6 - i}⭐${ratingStatistics[5 - i]}%`;
        document.getElementById('starGraph' + i).style.clipPath = `inset(0 ${100 - ratingStatistics[5 - i]}% 0 0)`;
    }

    loadUIContent(productCode);
    
}

export async function loadHTMLContent()
{
    const product = JSON.parse(main.getAttribute('data-product'));

    loadPartHTMLContent(product[0]);
    loadRatingHTMLContent(product[2].searchItem);
}