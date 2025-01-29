
function showAlert()
{
    selectedCar.style.display = "block";
}

export function clearAlert()
{
    selectedCar.style.display = "none";
}

export function selectCarAlert()
{
    showAlert();
    selectCarText.textContent = "Vyberte si auto"
}

export function selectBrandAlert()
{
    showAlert();
    selectCarText.textContent = "Vyberte si značku auta"
}

export function selectModelAlert()
{
    showAlert();
    selectCarText.textContent = "Vyberte si model auta"
}

export function selectEngineAlert()
{
    showAlert();
    selectCarText.textContent = "Vyberte si motorizáciu"
}

export function carIsSelectedAlert()
{
    showAlert();
    selectCarText.textContent = "Auto bolo vybraté";
}