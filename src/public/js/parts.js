const brandSelect = document.getElementById('brandSelect');

document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionStorage.getItem('part')) {
        window.location.href = '/';
    }
    else
    {
        const parts = await selectFromPartsTable("selectParts");
        displayParts(parts);
        
        const brands = await(selectFromPartsTable("selectBrands"));
        setupBrands(brands);
    }
});

brandSelect.addEventListener('change', async () => {
    for (let i = 1; i <= 7; i++)
    {
        document.getElementById('div' + i.toString()).setAttribute('style', 'display: none !important;');
    }

    if (brandSelect.value !== '' && brandSelect.value !== "0")
    {
        const brand = brandSelect.options[brandSelect.selectedIndex].text;
        const parts = await selectFromPartsTable("sortByBrand", brand);

        displayParts(parts);
    }
    else if (brandSelect.value !== '' && brandSelect.value === "0")
    {
        const parts = await selectFromPartsTable("selectParts");

        displayParts(parts);
    }
});

async function selectFromPartsTable(fun, brand)
{
    const part = { 
        part: sessionStorage.getItem('part'), 
        engine: sessionStorage.getItem('engine'),
        function: fun,
        brand: brand
    };

    const res = await fetch("api/parts", {
        method: "POST",
        body: JSON.stringify(part),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let data = null;
    if (res.ok)
    {
        data = await res.json();
    }
    return data;
}

async function ratings(code)
{
    const productCode = { code: code };

    const res = await fetch("api/ratings", {
        method: "POST",
        body: JSON.stringify(productCode),
        headers: {
        "Content-Type": "application/json"
    }});

    let data = null;
    if (res.ok)
    {
        data = await res.json();
    }
    return data;
}

async function displayParts(parts)
{
    document.getElementById('part-subcategory').textContent = sessionStorage.getItem('part');

    if (parts !== null && parts.length > 0) 
    {
        let index = 1;
    
        for (const part of parts) 
        {
            document.getElementById('div' + index.toString()).style.display = "block";

            document.getElementById('h5-' + index.toString()).textContent = part.brand;

            const partImage = document.getElementById('img' + index.toString());
            partImage.src = part.image;
            partImage.alt = part.partname;

            document.getElementById('p' + index.toString() + '_1').textContent = part.accessibility;
            document.getElementById('p' + index.toString() + '_2').textContent = part.price + "€";

            const compatibleCodes = part.compatible_codes.split(',');
            document.getElementById('description' + index.toString()).innerHTML = part.description + "<br><b>Kompatibilné kódy dielov:</b>";
            for (const compatibleCode of compatibleCodes)
            {
                document.getElementById('description' + index.toString()).innerHTML += `<br>- ${compatibleCode}`;
            }

            const rating = await ratings(part.code);
            let ratingValue = 0;
            let ratingCount = 0;
            
            if (rating !== null && rating.length > 0) 
            {
                ratingValue = parseInt(rating[0].value);
                ratingCount = rating[0].count;
            }
            
            document.getElementById('rating-percentage' + index.toString()).textContent = ratingValue + "%";
            document.getElementById('rating-count' + index.toString()).textContent = "Produkt hodnotilo " + ratingCount + " ludí";

            const ratingPercentage = 100 - ratingValue;
            document.getElementById('rating' + index.toString()).style.clipPath = "inset(0 " + ratingPercentage + "% 0 0)";

            index++;
        }
    }
    else 
    {
        document.getElementById('div1').style.display = "block";
        document.getElementById('h5-1').textContent = "Ľutujeme, tento diel je vypredaný";
        document.getElementById('img1').style.display = "none";
        document.getElementById('div1').querySelector('button').style.display = "none";

        document.getElementById('rating1').style.display = "none";
        document.getElementById('empty-rating').style.display = "none";
    }
}

function setupBrands(brands)
{
    if (brands === null || brands.length <= 0)
    {
        brandSelect.disabled = true;
        return;
    }

    let index = 1;
    for (const brand of brands)
    {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = brand.brand;
        brandSelect.appendChild(option);

        index++;
    }
}
