import { apiFetch } from "../api.js";

export async function getRating(code)
{
    const req = { code: code };

    const res = await apiFetch(req, "api/ratings");
    const ratingData = await res.json();

    return ratingData;
}

export async function getUsersRating(code, userId)
{
    const req = { code: code, userId: userId };

    const res = await apiFetch(req, "api/ratings/user");
    const ratingData = await res.json();

    return ratingData;
}

export async function createRating(code, userId, value)
{
    const req = { code: code, userId: userId, value: value };

    await apiFetch(req, "api/ratings/create");
}

export async function removeRating(code, userId)
{
    const req = { code: code, userId: userId };

    await apiFetch(req, "api/ratings/delete");
}
