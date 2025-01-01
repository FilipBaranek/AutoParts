

export async function userResponse(res, redirectPath)
{
    const status =  res.status;
    const data = await res.json();

    if (status === 400)
    {
        success.style.display = "none";
        failure.style.display = "block";
        failure.innerText = data.message;
    }
    else if (status === 200 || status === 201)
    {
        failure.style.display = "none";
        success.style.display = "block";
        success.innerText = data.message;

        setTimeout(() => {
            window.location.href = redirectPath;
        }, 500);
    }
}

export function userErrorResponse()
{
    success.style.display = "none";
    failure.style.display = "block";
    failure.innerText = "Niečo sa pokazilo. Skúste to znova neskôr.";
}