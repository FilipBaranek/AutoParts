
function navBar()
{
    return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-logo" href="/">
                    <img src="/views/images/logo.png" alt="Logo" width="50" class="rounded-circle">
                </a>
                <span class="navbar-text ms-2">AutoParts Hub</span>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <div class="search-container ms-auto d-flex">
                        <input id="searchInput" type="text" class="form-control me-2" placeholder="Vyhľadaj kód dielu">
                        <button id="searchButton" class="btn btn-outline-light" type="button">
                            <img src="/views/images/search.png" alt="Search" width="30">
                        </button>
                    </div>

                    <div class="nav-icons d-flex align-items-center ms-2">
                        <a href="#" class="btn">
                            <img src="/views/images/shoppingcart.png" alt="Cart" width="30">
                        </a>
                        <a href="/profile" class="btn">
                            <img src="/views/images/account.png" alt="Account" width="30">
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

function footer()
{
    return `
        <footer class="footer bg-dark text-light py-4">
            <div class="container">
                <div class="footer-row row">
                    <div class="footer-column col-md-6 text-center">
                        <h3>Informácie</h3>
                        <p>AutoParts Hub je E-shop vytvorený za účelom predaja automobilových dielov online.</p>
                        <p>Stánka vznikla ako semestrálny projekt pre predmet Vývoj aplikácií pre internet a intranet.</p>
                    </div>
                    <div class="footer-column col-md-6 text-center">
                        <h3>Linky</h3>
                        <ul class="footer-links list-unstyled">
                            <li><a href="/" class="text-light">Domov</a></li>
                            <li><a href="/profile" class="text-light">Účet</a></li>
                            <li><a href="#" class="text-light">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom text-center mt-3">
                <p>&copy; 2024 AutoParts Hub</p>
            </div>
        </footer>
    `;
}

function setupSearchListener()
{
    searchButton.addEventListener('click', () => {
        if (searchInput.value !== "") {
            window.location.href = `/parts?search=code&code=${searchInput.value}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    navbarContainer.innerHTML = navBar();
    footerContainer.innerHTML = footer();

    setupSearchListener();
});
