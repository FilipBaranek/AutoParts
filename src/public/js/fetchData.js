
export async function fetchData(req, apiPath)
{
    const res = await fetch(`api/${apiPath}`, {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.ok)
    {
        return await res.json();
    }
    return null;
}