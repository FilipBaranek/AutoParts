import { apiFetch } from '../api.js';

async function fetchRatings(part)
{
    const req = { code: part.code };
    const res = await apiFetch(req, "api/ratings");
    const rating = await res.json();

    return rating;
}

async function getRatings(part)
{
    const rating = await fetchRatings(part);

    let ratingValue = 0;
    let ratingCount = 0;

    if (rating !== null && rating.length > 0) 
    {
        ratingValue = parseInt(rating[0].value);
        ratingCount = rating[0].count;
    }
    const ratingPercentage = 100 - ratingValue;

    return { ratingValue: ratingValue, ratingCount: ratingCount, ratingPercentage: ratingPercentage };
}

function descriptionHTML(part)
{
    const compatibleCodes = part.compatible_codes.split(',');

    let descriptionInnerHTML = "<p>" + part.description + "<br><b>Kompatibilné kódy dielov:</b>";
    for (const compatibleCode of compatibleCodes) 
    {
        descriptionInnerHTML += `<br>- ${compatibleCode}`;
    }
    descriptionInnerHTML += "</p>"

    return descriptionInnerHTML;
}

async function partsInnerHTML(index, part)
{
    const descriptionInnerHTML = await descriptionHTML(part);
    const rating = await getRatings(part);

    const innerHTMLContent = `
            <div class="part-card d-flex align-items-center mb-4" id="div${index}">
                <img class="img-thumbnail" src="${part.image}" alt="${part.name}" style="width: 150px; height: 150px; margin-right: 20px;">
                <div style="flex: 2; text-align: left;">
                    <h5>${part.brand}</h5>
                    <p class="text-muted">${part.availability}</p>
                    <p class="fw-bold text-danger">${part.price}€</p>
                </div>
                <div style="flex: 3; text-align: center;">
                    ${descriptionInnerHTML}
                </div>
                <div class="rating-container">
                    <div style="position: relative; margin-left: 15px; width: 150px; height: 30px; overflow: hidden;">
                        <img src="/views/images/rating/rating-empty.png" alt="Rating" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;">
                        <img src="/views/images/rating/rating-full.png" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; clip-path: inset(0 ${rating.ratingPercentage}% 0 0); object-fit: contain;">
                    </div>
                    <p class="fw-bold">${rating.ratingValue}%</p>
                    <p class="text-muted">Produkt hodnotilo ${rating.ratingCount} ľudí</p>
                    <button class="btn btn-danger">Pridať do košíka</button>
                </div>             
            </div>`;

    return innerHTMLContent;
}

export async function displayParts(parts)
{
    partSubcategory.textContent = sessionStorage.getItem('part');

    if (parts === null || parts.length <= 0)
    {
        partsContainer.innerHTML = `<p class="fw-bold text-danger">Ľutujeme, tento diel nie je aktuálne dostupný</p>`;        
    }
    else
    {
        let index = 1;
        let innerHTML = '';

        for (const part of parts) 
        {
            innerHTML += await partsInnerHTML(index, part);

            index++;
        }

        partsContainer.innerHTML = innerHTML;
    }
}