document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('partCategory'))
    {
        window.location.href = '/';
    }
    else
    {
        const part = { category: sessionStorage.getItem('partCategory') };
        fetch("api/category", {
            method: "POST",
            body: JSON.stringify(part),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                let index = 1;
                data.forEach(part => {
                    const cat = document.getElementById(index.toString());
                    cat.querySelector('img').src = part.image;
                    cat.querySelector('img').alt = part.partname;
                    cat.querySelector('p').textContent = part.partname;
                    index++;
                });
            })
            .catch(err => {
                console.error('Error fetching data', err);
            })
        sessionStorage.removeItem('partCategory');
    }
});

for (let i = 1; i < 7; i++)
{
    const part = document.getElementById(i.toString());
    part.addEventListener('click', () => {
        sessionStorage.setItem('part', part.querySelector('p').textContent);
        window.location.href = "/parts";
    });
}