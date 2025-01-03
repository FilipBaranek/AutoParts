

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

        if (!res.ok && res.status !== 201 && res.status !== 204 && res.status !== 400) 
        {
            throw new Error("Chyba pri prenose dát");
        }
        
        return res;
    }
    catch (error) 
    {
        throw error;
    }
}
