const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const engineSelect = document.getElementById('engine');

let car = null;
let carIsSelected = false;

document.addEventListener('DOMContentLoaded', () => {
    const parameter = { paramType: "paramType", param: "brand" };
    fetch("api/cars", {
        method: "POST",
        body: JSON.stringify(parameter),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            appendDefaultOption(brandSelect, "značku");

            setupSelect(brandSelect, data, "brand");
        })
        .catch(err => {
            console.error('Error fetching data', err);
        })
});

brandSelect.addEventListener('change', () => {
    const parameter = { 
        paramType: "model",
        param: "brand",
        searchParam: brandSelect.options[brandSelect.selectedIndex].textContent
    };
    fetch("api/cars", {
        method: "POST",
        body: JSON.stringify(parameter),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            clearAllOptions();

            if (brandSelect.value !== "0" && brandSelect.value !== '')
            {
                modelSelect.disabled = false;
                appendDefaultOption(modelSelect, "model");
                setupSelect(modelSelect, data, "model");
            }
            else 
            {
                clearAllOptions();
            }
        })
        .catch(err => {
            console.error('Error fetching data', err);
        })
    
    clearNotification();
});

modelSelect.addEventListener('change', () => {
    const parameter = { 
        paramType: "engine",
        param: "model",
        searchParam: modelSelect.options[modelSelect.selectedIndex].textContent
    };
    fetch("api/cars", {
        method: "POST",
        body: JSON.stringify(parameter),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            clearOptions(engineSelect);

            if (modelSelect.value !== "0" && modelSelect.value !== '')
            {
                engineSelect.disabled = false;
                appendDefaultOption(engineSelect, "engine");
                setupSelect(engineSelect, data, "engine");
            }
            else 
            {
                clearOptions(engineSelect);
                engineSelect.disabled = true;
            }
        })
        .catch(err => {
            console.error('Error fetching data', err);
        })
    clearNotification();
});

engineSelect.addEventListener('change', () => {
    clearNotification();
});

document.getElementById('select-car').addEventListener('click', () => {
    if (engineSelect.disabled === false && engineSelect.value !== "0" && engineSelect.value !== '')
    {
        const parameter = { 
            paramType: "selectCar",
            param: engineSelect.options[engineSelect.selectedIndex].textContent   
        };
        fetch("api/cars", {
            method: "POST",
            body: JSON.stringify(parameter),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                if (data)
                {
                    car = data;
                    document.getElementById('selected-car').style.display = "block";
                    document.getElementById('unselected-car').style.display = "none";
                    carIsSelected = true;
                }
            })
            .catch(err => {
                console.error('Error fetching data', err);
           })
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('engine-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
});

document.getElementById('steering-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
});

document.getElementById('brakes-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
});

document.getElementById('suspension-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
});

document.getElementById('clutch-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
});

document.getElementById('exhaust-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////

function selectCarNotification()
{
    document.getElementById('selected-car').style.display = "none";
    document.getElementById('unselected-car').style.display = "block";
}

function clearNotification()
{
    document.getElementById('selected-car').style.display = "none";
    document.getElementById('unselected-car').style.display = "none";
    carIsSelected = false;
}
    
function appendDefaultOption(select, paramType) 
{
    const defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.textContent = `Vyberte ${paramType} auta...`;
    select.appendChild(defaultOption);
}

function setupSelect(select, data, param)
{
    let index = 1;
    data.forEach(car => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = car[param];
        select.appendChild(option);

        index++;
    });
}

function clearOptions(select)
{
    while (select.options.length > 0) {
        select.remove(0);
    }
}

function clearAllOptions()
{
    clearOptions(modelSelect);
    clearOptions(engineSelect);
    modelSelect.disabled = true;
    engineSelect.disabled = true;
}

////////////////////////////////////////////////////////////////////////MOZNO SA TO DA SPRAVIT LEN Z BACKENDU - SKUSIT
///tu funkciu spraviť trochu krajšie nech má zmysel tá univerzálnosť
//jjjjj tuto classu isto prerobiť
//bude sa dať tak že pošlem parameter vo fetchi napríklad 'model' a v backende mi to nastaví na req to čo potrebujem