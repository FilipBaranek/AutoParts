const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const engineSelect = document.getElementById('engine');

let car = null;
let carIsSelected = false;


///////////////////////////
//// SELECT LISTENERS /////
///////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const parameter = { 
        paramType: "paramType",
        param: "brand"
    };
    fetch("api/cars", {
        method: "POST",
        body: JSON.stringify(parameter),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
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
        .then(res => res.json())
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
        .then(res => res.json())
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
    if (brandSelect.value === "0" || brandSelect.value === '')
    {
        selectBrandNotification();
    }
    else if (engineSelect.disabled === true || modelSelect.value === "0" || engineSelect.value === '')
    {
        selectModelNotification();
    }
    else if (engineSelect.disabled === false && engineSelect.value !== "0" && engineSelect.value !== '')
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
            .then(res => res.json())
            .then(data => {
                if (data)
                {
                    car = data;
                    document.getElementById('selected-car').style.display = "block";
                    document.getElementById('select-car-text').textContent = "Auto bolo vybraté";
                    carIsSelected = true;
                }
            })
            .catch(err => {
                console.error('Error fetching data', err);
           })
    }
    else
    {
        selectEngineNotification();
    }
});

//////////////////////////////
//// COMPONENT LISTENERS /////
//////////////////////////////
document.getElementById('engine-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
    else
    {
        sessionStorage.setItem('partCategory', 'Engine');
        window.location.href = "/category";
    }
});

document.getElementById('steering-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
    else
    {
        sessionStorage.setItem('partCategory', 'Steering');
        window.location.href = "/category";
    }
});

document.getElementById('brakes-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
    else
    {
        sessionStorage.setItem('partCategory', 'Brakes');
        window.location.href = "/category";
    }
});

document.getElementById('suspension-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
    else
    {
        sessionStorage.setItem('partCategory', 'Suspension');
        window.location.href = "/category";
    }
});

document.getElementById('clutch-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
    else
    {
        sessionStorage.setItem('partCategory', 'Clutch');
        window.location.href = "/category";
    }
});

document.getElementById('exhaust-cat').addEventListener('click', () => {
    if (!carIsSelected)
    {
        selectCarNotification();
    }
    else
    {
        sessionStorage.setItem('partCategory', 'Exhaust');
        window.location.href = "/category";
    }
});

/////////////////////////
//// NOTIFICATIONS /////
////////////////////////
function showNotification()
{
    document.getElementById('selected-car').style.display = "block";
}

function clearNotification()
{
    document.getElementById('selected-car').style.display = "none";
    carIsSelected = false;
}

function selectCarNotification()
{
    showNotification();
    document.getElementById('select-car-text').textContent = "Najskôr vyberte auto"
}

function selectBrandNotification()
{
    showNotification();
    document.getElementById('select-car-text').textContent = "Najskôr vyberte značku auta"
}

function selectModelNotification()
{
    showNotification();
    document.getElementById('select-car-text').textContent = "Najskôr si vyberte model auta"
}

function selectEngineNotification()
{
    showNotification();
    document.getElementById('select-car-text').textContent = "Najskôr si vyberte motorizáciu"
}
    

//////////////////////////////
//// SELECT FUNCTIONS ///////
//////////////////////////////
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
