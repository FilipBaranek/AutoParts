
export function errorMessage()
{
    success.style.display = "none";
    failure.style.display = "block";
    failure.innerText = "Chyba pri načítaní dát, skúste to znova neskôr";
}