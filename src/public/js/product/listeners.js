import { loadRatingHTMLContent } from "./loadContent.js";
import { removeRating, createRating } from "./ratingEventHandler.js";

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
    createButton.addEventListener('click', () => {
        if (rating > 0)
        {
            createRating(code, userId, rating);

            loadRatingHTMLContent(code);

            user.textContent = "Vaše hodnotenie";
            removeButton.style.display = "block";
            createButton.style.display = "none";
        }
    });
}

function setupRemoveButtonListener(code, userId)
{
    removeButton.addEventListener('click', () => {
        removeRating(code, userId);

        loadRatingHTMLContent(code);

        user.textContent = "Ohodnoťte produkt vy";
        removeButton.style.display = "none";
        createButton.style.display = "block";
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