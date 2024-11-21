// Gérer l'affichage du bouton "Back to Top"
const backToTopButton = document.querySelector('.back-to-top');

// Écoute du défilement de la page
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Affiche le bouton après 300px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Comportement de défilement en douceur vers le haut
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function toggleDropdown() {
    var content = document.querySelector('.dropdown-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }