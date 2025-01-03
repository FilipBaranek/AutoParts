import { loadRatingHTMLContent, loadReviewHTMLContent } from "./loadContent.js";
import { removeRating, createRating } from "./ratingEventHandler.js";
import { deleteReview, submitReview, editReview } from "./reviewEventHandler.js";
import { checkUsersReviewInput } from "../middlewares/validator.js";
import { reviewErrorMessage } from "../middlewares/error.js";


let reviewId;
let inEdit = false;
let rating = -1;

function setupRadioButtonsListener()
{
    for (let i = 1; i <= 5; i++)
    {
        const star = document.getElementById('star' + i);

        star.addEventListener('change', () => {
            if (star.checked)
            {
                rating = i;
            }
        });

    }
}

function setupCreateButtonListener(code, userId)
{
    createButton.addEventListener('click', async () => {
        if (rating > 0)
        {
            await createRating(code, userId, rating);
            loadRatingHTMLContent(code);

            user.textContent = "Vaše hodnotenie";
            removeButton.style.display = "block";
            createButton.style.display = "none";
        }
    });
}

function setupRemoveButtonListener(code, userId)
{
    removeButton.addEventListener('click', async () => {
        await removeRating(code, userId);
        loadRatingHTMLContent(code);

        user.textContent = "Ohodnoťte produkt vy";
        removeButton.style.display = "none";
        createButton.style.display = "block";
    });
}

export function setupEditButtonsListener(code, usersData, buttonsCount)
{
    for (let i = 1; i <= buttonsCount; i++)
    {
        const button = document.getElementById('editReviewButton' + i);

        button.addEventListener('click', async () => {
            reviewText.value = button.dataset.review;
            reviewId = button.dataset.id;
            
            cancelButton.style.display = "block";
            
            inEdit = true;

            cancelButton.addEventListener('click', () => {
                inEdit = false;
                cancelButton.style.display = "none";
                reviewText.value = "";
                reviewText.placeholder = "Napíšte svoju recenziu sem";
            })
        });
    }
}

export function setupDeleteButtonsListener(code, usersData, buttonsCount)
{
    for (let i = 1; i <= buttonsCount; i++)
    {
        const button = document.getElementById('deleteReviewButton' + i);

        button.addEventListener('click', async () => {
            await deleteReview(button.dataset.id);
            loadReviewHTMLContent(code, usersData);
        });
    }
}

export function setupReviewSubmitButtonListener(code, usersData)
{
    reviewFormSubmit.addEventListener("submit", async () => {
        const error = checkUsersReviewInput(reviewText.value);
        if (error)
        {
            reviewErrorMessage(error);
            return;
        }

        if (!inEdit)
        {
            await submitReview(reviewText.value, usersData.id, code, usersData.username);
            loadReviewHTMLContent(code, usersData);
        }
        else
        {
            await editReview(reviewText.value, reviewId);
            loadReviewHTMLContent(code, usersData);
            inEdit = false;
            reviewId = -1;
        }
    });
}

 export function setupListeners()
 {
    const usersData = JSON.parse(user.getAttribute('data-user'));
    const product = JSON.parse(main.getAttribute('data-product'));

    if (usersData)
    {
        setupRadioButtonsListener();
        setupCreateButtonListener(product[0].code, usersData.id);
        setupRemoveButtonListener(product[0].code, usersData.id);
    }
 }