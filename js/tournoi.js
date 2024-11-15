// Sélection des sections par ID
const sections = document.querySelectorAll('#lol-section, #valo-section, #rl-section');

// Sélection des logos
const logoItems = {
    "lol-section": document.querySelector('#logo-lol'),
    "valo-section": document.querySelector('#logo-valorant'),
    "rl-section": document.querySelector('#logo-rl')
};

// Intersection Observer pour activer le logo correspondant lorsque la section est visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Supprime la classe 'active' de tous les logos
            Object.values(logoItems).forEach(item => item.classList.remove('active'));
            // Ajoute la classe 'active' au logo de la section visible
            const activeLogo = logoItems[entry.target.id];
            if (activeLogo) activeLogo.classList.add('active');
        }
    });
}, { threshold: 0.5 });

// Observer chaque section
sections.forEach(section => observer.observe(section));

// Événements de clic pour défiler jusqu'à la section correspondante
Object.keys(logoItems).forEach(key => {
    const logo = logoItems[key];
    logo.addEventListener('click', () => {
        const targetSection = document.querySelector(`#${key}`);
        targetSection.scrollIntoView({
            behavior: 'smooth', // Animation fluide
            block: 'start' // Aligner en haut de la section
        });
    });
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

// Fonction pour défiler vers une section spécifique
function scrollToSection(sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

function toggleDropdown() {
    var content = document.querySelector('.dropdown-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }