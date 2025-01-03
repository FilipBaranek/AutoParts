import { getRatingValue, getRatingStatistics } from "../middlewares/ratings.js";
import { getRating, getUsersRating } from "./ratingEventHandler.js";
import { findReviews } from "./reviewEventHandler.js";
import { setupDeleteButtonsListener, setupEditButtonsListener, setupReviewSubmitButtonListener } from "./listeners.js"


let userOwnReviewsCount = 0;

function loadInnerReviewHTML(reviewData, usersData)
{
    const reviewText = reviewData.review.replace(/\n/g, '<br>');
    const date = new Date(reviewData.date);
    const formatedDate = date.toLocaleDateString('sk-SK');

    if (usersData && (usersData.id === reviewData.user_id) || usersData.role === "admin")
    {
        userOwnReviewsCount++;
        return `
            <div class="review">
            <div class="review-header">
                    <span class="reviewer-name">${reviewData.username}</span>
                    <div>
                        <button class="review-button" id="deleteReviewButton${userOwnReviewsCount}" data-id="${reviewData.id}">
                            <img src="/views/images/reviews/deleteReview.png" alt="Delete review">
                        </button>
                        <button class="review-button" id="editReviewButton${userOwnReviewsCount}" data-review="${reviewData.review}" data-id="${reviewData.id}">
                            <img src="/views/images/reviews/editReview.png" alt="Edit review">
                        </button>
                    <span class="review-date">${formatedDate}</span>
                    </div>
                </div>
                <div class="review-text">
                    <p>${reviewText}</p>
                </div>
            </div>
        `;
    }
    return `
        <div class="review">
            <div class="review-header">
                <span class="reviewer-name">${reviewData.username}</span>
                <span class="review-date">${formatedDate}</span>
            </div>
            <div class="review-text">
                <p>${reviewText}</p>
            </div>
        </div>
    `;
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

function loadPartHTMLContent(product)
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

async function loadUIContent(productCode, usersData)
{
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

export async function loadRatingHTMLContent(productCode, usersData)
{
    const rating = await getRating(productCode);
    const ratingValues = getRatingValue(rating);

    ratingImage.style.clipPath = `inset(0 ${ratingValues.ratingPercentage}% 0 0)`;
    ratingPercentage.textContent = ratingValues.ratingValue + "%";
    ratingCount.textContent = "Priemer z " + ratingValues.ratingCount + " hodnotení";

    const ratingStatistics = rating ? getRatingStatistics(rating) : [0, 0, 0, 0, 0];
    for (let i = 1; i <= 5; i++)
    {
        document.getElementById('star' + i + 'Percentage').textContent = `${6 - i}⭐${ratingStatistics[5 - i]}%`;
        document.getElementById('starGraph' + i).style.clipPath = `inset(0 ${100 - ratingStatistics[5 - i]}% 0 0)`;
    }

    loadUIContent(productCode, usersData);
    
}

async function loadReviews(reviewsData, usersData)
{
    reviews.innerHTML = "<h2>Produkt zatial nemá žiadné hodnotenie</h2>";
    if (reviewsData && reviewsData.length > 0)
    {
        reviews.innerHTML = '<h2>Hodnotenia použivatelov</h2>';

        for (let i = 0; i < reviewsData.length; i++)
        {
            reviews.innerHTML += loadInnerReviewHTML(reviewsData[i], usersData);
        }
    }
}

async function loadReviewUI()
{
    reviewForm.innerHTML = `
            <h3>Podelte sa o svoju skúsenosť</h3>
            <form id="reviewFormSubmit" class="review-form" onsubmit="return false;">
                <label for="review-text">Vaša recenzia:</label>
                <textarea id="reviewText" name="review-text" rows="4" required placeholder="Napíšte svoju receniu sem"></textarea>
                <div class="alert alert-danger" role="alert" id="reviewFailure" style="display: none;"></div>
                <button type="submit">Odoslať recenziu</button>
            </form>
            <button class="cancel-button" id="cancelButton" style="display: none">Zrušiť</button>
        `;
}

export async function loadReviewHTMLContent(productCode, usersData)
{

    const reviewsData = await findReviews(productCode);
    userOwnReviewsCount = 0;

    await loadReviews(reviewsData, usersData);

    if (!usersData)
    {
        reviewForm.innerHTML = `<h3>Prihláste sa a podelte sa o svoju skúsenosť</h3>`;
    }
    else
    {
        await loadReviewUI();

        setupReviewSubmitButtonListener(productCode, usersData);
        setupDeleteButtonsListener(productCode, usersData, userOwnReviewsCount);
        setupEditButtonsListener(productCode, usersData, userOwnReviewsCount);
    }
}

export function loadHTMLContent()
{
    const product = JSON.parse(main.getAttribute('data-product'));
    const usersData =  JSON.parse(user.getAttribute('data-user'));

    loadPartHTMLContent(product[0]);
    loadRatingHTMLContent(product[2].searchItem, usersData);
    loadReviewHTMLContent(product[2].searchItem, usersData);
}