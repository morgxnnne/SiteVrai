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

  // Variables pour stocker les poules et les équipes
let currentPool = null;
let currentGameSection = null;

// Fonction pour ajouter une nouvelle poule
function addPool() {
    const poolName = document.getElementById("pool-name").value;
    if (!poolName) {
        alert("Veuillez entrer un nom pour la poule.");
        return;
    }

    // Choisir la section de jeu correcte
    currentGameSection = document.querySelector(".team-section.active");
    if (!currentGameSection) {
        alert("Veuillez sélectionner une section de jeu.");
        return;
    }

    const poolsContainer = currentGameSection.querySelector(".pools-container");

    // Créer l'élément HTML pour la poule
    const poolDiv = document.createElement("div");
    poolDiv.classList.add("pool");

    const poolTitle = document.createElement("h3");
    poolTitle.textContent = poolName;
    poolDiv.appendChild(poolTitle);

    const teamList = document.createElement("div");
    teamList.classList.add("team-list");
    poolDiv.appendChild(teamList);

    const bracket = document.createElement("div");
    bracket.classList.add("bracket");
    bracket.innerHTML = "<p>Arbre de Bracket (exemple)</p>";
    poolDiv.appendChild(bracket);

    // Ajouter la poule au conteneur
    poolsContainer.appendChild(poolDiv);

    // Définir la poule actuelle pour y ajouter des équipes
    currentPool = teamList;

    // Vider l'input du nom de la poule
    document.getElementById("pool-name").value = "";
}

// Fonction pour ajouter une équipe à la poule actuelle
function addTeam() {
    if (!currentPool) {
        alert("Veuillez d'abord créer une poule.");
        return;
    }

    const teamName = document.getElementById("team-name").value;
    if (!teamName) {
        alert("Veuillez entrer un nom pour l'équipe.");
        return;
    }

    // Créer l'élément HTML pour l'équipe
    const teamElement = document.createElement("p");
    teamElement.textContent = teamName;
    currentPool.appendChild(teamElement);

    // Vider l'input du nom de l'équipe
    document.getElementById("team-name").value = "";
}


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