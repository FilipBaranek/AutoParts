

export async function apiFetch(req, apiPath)
{
    try 
    {
        const res = await fetch(apiPath, {
            method: "POST",
            body: JSON.stringify(req),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!res.ok) {
            const error = await res.json();
            console.log(error);
            const errorMessage = error.message;
            throw new Error(errorMessage || "Chyba API");
        }

        return await res.json();
    }
    catch (error) 
    {
        throw error;
    }
}


export function apiUserResponse(res, redirectPath)
{
    failure.style.display = "none";
    success.style.display = "block";
    success.innerText = res.message;

    setTimeout(() => {
        window.location.href = res.redirectUrl || redirectPath;
    }, 500);

}