// Smooth scroll for "hero-text" button
document.querySelector('.hero-text .btn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('programme-intro').scrollIntoView({
        behavior: 'smooth'
    });
});

// Smooth scroll for "intro-text" button
document.querySelector('.intro-text .btn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('game-posters').scrollIntoView({
        behavior: 'smooth'
    });
});

// Scroll to top smoothly on page load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    }, 100); 
});

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