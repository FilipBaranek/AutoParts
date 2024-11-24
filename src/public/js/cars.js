const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const engineSelect = document.getElementById('engine');
let cars = null;
let lastBrand = null;
let lastModel = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("IN LISTENER");
    fetch("api/cars")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            cars = data

            const defaultOption = document.createElement('option');
            defaultOption.textContent = "Vyberte značku auta...";
            defaultOption.value = "0";

            brandSelect.appendChild(defaultOption);

            cars.forEach(car => {
                const included = Array.from(brandSelect.children).some(childOption => childOption.textContent === car.brand);

                if(!included)
                {
                    const option = document.createElement('option');
                    option.textContent = car.brand;
                    option.value = car.id;
                    brandSelect.appendChild(option);
                }
            });
        })
        .catch(err => {
            console.error('Error fetching data', err);
        })
    });
    

brandSelect.addEventListener('change', () => {
    updateSelect(brandSelect, modelSelect, 'brand', 'model');
})

modelSelect.addEventListener('change', () => {
    updateSelect(modelSelect, engineSelect, 'model', 'engine');
})

function updateSelect(listenedSelect, resultSelect, filterBy, populateBy) {
    if (listenedSelect.selectedIndex === -1 || listenedSelect.value === "0") {
        while (resultSelect.options.length > 0) {
            resultSelect.remove(0);
        }
        resultSelect.disabled = true;

        if (populateBy === 'model')
        {
            while (engineSelect.options.length > 0) {
                engineSelect.remove(0);
            }
            engineSelect.disabled = true;
        }
        return;
    }

    const selectedValue = listenedSelect[listenedSelect.selectedIndex].textContent;

    if (lastBrand !== selectedValue) {
        while (resultSelect.options.length > 0) {
            resultSelect.remove(0);
        }
        if (populateBy === 'model')
            {
                while (engineSelect.options.length > 0) {
                    engineSelect.remove(0);
                }
                engineSelect.disabled = true;
            }

        const defaultOption = document.createElement('option');
        defaultOption.textContent = `Vyberte ${populateBy} auta...`;
        defaultOption.value = "0";
        resultSelect.appendChild(defaultOption);

        lastBrand = selectedValue;

        const filteredItems = cars.filter(car => car[filterBy] === selectedValue);

        filteredItems.forEach(car => {
            const included = Array.from(resultSelect.children).some(childOption => childOption.textContent === car[populateBy]);

            if (!included) {
                const option = document.createElement('option');
                option.textContent = car[populateBy];
                option.value = car.id;
                resultSelect.appendChild(option);
            }
        });
    }
    resultSelect.disabled = false;
}
