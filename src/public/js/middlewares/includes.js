
document.addEventListener('DOMContentLoaded', () => {
    fetch('/views/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;

            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');

            searchButton.addEventListener('click', () => {
                if (searchInput.value !== "")
                {
                    sessionStorage.setItem('code', searchInput.value);
                    sessionStorage.setItem('search', "code");
                    window.location.href = '/parts';
                }
            });
        });

    fetch('/views/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});