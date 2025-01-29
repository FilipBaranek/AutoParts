
export function errorMessage()
{
    failure.style.display = "block";
    failure.innerText = "Chyba pri prenose dát, skúste to znova neskôr";
}

export async function reviewErrorMessage(message)
{
    setTimeout(() => {
        reviewFailure.style.display = "block";
        reviewFailure.innerText = message;
    }, 500);
}