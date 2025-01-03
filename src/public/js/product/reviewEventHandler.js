import { apiFetch } from "../api.js";
import { reviewErrorMessage } from "../middlewares/error.js"

function deleteAlert()
{
    reviewFailure.style.display = "none";
}

export async function submitReview(review, userId, productCode, username)
{
    const req = { review: review, userId: userId, username: username, productCode: productCode };
    
    const res = await apiFetch(req, "api/review/create");
    const reviewRes = await res.json();

    if (!reviewRes.success)
    {
        await reviewErrorMessage(reviewRes.message);
    }
    else
    {
        deleteAlert();
    }
}

export async function findReviews(productCode)
{
    const req = { productCode: productCode };

    const res = await apiFetch(req, "api/review/find");
    const reviews = await res.json();

    return reviews;
}

export async function deleteReview(review)
{
    const req = { reviewId: review };
    
    const res = await apiFetch(req, "api/review/delete");
    const reviewRes = await res.json();

    if (!reviewRes.success)
    {
        await reviewErrorMessage(reviewRes.message);
    }
    else
    {
        deleteAlert();
    }
}

export async function editReview(review, reviewId)
{
    const req = { review: review, id: reviewId };
    
    const res = await apiFetch(req, "api/review/edit");
    const reviewRes = await res.json();

    if (!reviewRes.success)
    {
        reviewErrorMessage(reviewRes.message);
    }
    else
    {
        deleteAlert();
    }
}
