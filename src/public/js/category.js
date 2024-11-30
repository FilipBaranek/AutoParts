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
                sessionStorage.removeItem('partCategory');

                let index = 1;
                data.forEach(part => {
                    document.getElementById(index.toString()).querySelector('img').src = part.image;
                    document.getElementById(index.toString()).querySelector('img').alt = part.partname;
                    document.getElementById(index.toString()).querySelector('p').textContent = part.partname;
                    index++;
                });
            })
            .catch(err => {
                console.error('Error fetching data', err);
            })
    }
});