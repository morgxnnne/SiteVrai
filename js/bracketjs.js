document.addEventListener("DOMContentLoaded", function () {
    const bracketContainers = document.querySelectorAll(".bracket-container");

    // Configuration des équipes
    const teams = ["Team 1", "Team 2", "Team 3", "Team 4"];

    // Fonction pour déterminer les tailles et espacements en fonction de la largeur du bracket-container
    function getDimensions(container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculer un facteur de réduction dynamique en fonction de la largeur du container
        const reductionFactor = Math.max(0.3, Math.min(1.5, containerWidth / 2500));

        // Définir un ratio de base pour les dimensions des "match"
        const baseWidth = 150;
        const baseHeight = 80;

        // Dimensions des "match" en fonction du facteur de réduction
        const matchWidth = baseWidth * reductionFactor;
        const matchHeight = baseHeight * reductionFactor;

        // Espacement vertical et horizontal basé sur un ratio constant
        const spacingRatioVertical = 0.8; // Ratio constant entre matchHeight et verticalSpacing
        const spacingRatioHorizontal = 1.8; // Ratio constant entre matchWidth et horizontalSpacing

        // Calculer des espacements limités pour assurer le centrage
        const verticalSpacing = Math.min(matchHeight * spacingRatioVertical, containerHeight / teams.length - matchHeight);
        const horizontalSpacing = Math.min(matchWidth * spacingRatioHorizontal, containerWidth / Math.ceil(Math.log2(teams.length)) - matchWidth);

        return {
            matchWidth,
            matchHeight,
            verticalSpacing,
            horizontalSpacing
        };
    }

    function createMatch(container, name, top, left, matchWidth, matchHeight) {
        const match = document.createElement("div");
        match.classList.add("match");
        match.style.position = "absolute";
        match.style.top = `${top}px`;
        match.style.left = `${left}px`;
        match.style.width = `${matchWidth}px`;
        match.style.height = `${matchHeight}px`;
        match.style.lineHeight = `${matchHeight}px`;
        match.style.textAlign = "center";
        match.innerHTML = `<span>${name}</span>`;
        container.appendChild(match);
        return match;
    }

    function createWinnerMatch(container, top, left, matchWidth, matchHeight) {
        return createMatch(container, "Winner", top, left, matchWidth, matchHeight);
    }

    function createBracket(container, match1, match2, winnerMatch, horizontalSpacing) {
        const rect1 = match1.getBoundingClientRect();
        const rect2 = match2.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const bracketTop = rect1.top - containerRect.top + rect1.height / 2;
        const bracketHeight = rect2.top - rect1.top;
        const bracketLeft = rect1.right - containerRect.left;

        const bracketDiv = document.createElement("div");
        bracketDiv.style.position = "absolute";
        bracketDiv.style.top = `${bracketTop}px`;
        bracketDiv.style.left = `${bracketLeft}px`;
        bracketDiv.style.width = `${horizontalSpacing}px`;
        bracketDiv.style.height = `${bracketHeight + rect1.height / 2}px`;
        container.appendChild(bracketDiv);

        const line1 = document.createElement("div");
        line1.style.position = "absolute";
        line1.style.width = "20px";
        line1.style.height = "2px";
        line1.style.backgroundColor = "#fff";
        line1.style.top = `0px`;
        line1.style.left = "0px";
        bracketDiv.appendChild(line1);

        const line2 = document.createElement("div");
        line2.style.position = "absolute";
        line2.style.width = "20px";
        line2.style.height = "2px";
        line2.style.backgroundColor = "#fff";
        line2.style.top = `${bracketHeight}px`;
        line2.style.left = "0px";
        bracketDiv.appendChild(line2);

        const verticalLine = document.createElement("div");
        verticalLine.style.position = "absolute";
        verticalLine.style.width = "2px";
        verticalLine.style.height = `${bracketHeight + 2}px`;
        verticalLine.style.backgroundColor = "#fff";
        verticalLine.style.top = `0px`;
        verticalLine.style.left = "20px";
        bracketDiv.appendChild(verticalLine);

        const winnerRect = winnerMatch.getBoundingClientRect();
        const horizontalToWinner = document.createElement("div");
        horizontalToWinner.style.position = "absolute";
        horizontalToWinner.style.width = `${winnerRect.left - (rect1.right + 20)}px`;
        horizontalToWinner.style.height = "2px";
        horizontalToWinner.style.backgroundColor = "#fff";
        horizontalToWinner.style.top = `${bracketHeight / 2}px`;
        horizontalToWinner.style.left = "20px";
        bracketDiv.appendChild(horizontalToWinner);
    }

    function drawBracket() {
        bracketContainers.forEach((container) => {
            container.innerHTML = ""; // Effacer le contenu existant pour redessiner

            // Récupérer les dimensions basées sur la taille du container
            const { matchWidth, matchHeight, verticalSpacing, horizontalSpacing } = getDimensions(container);

            // Calculer la hauteur totale nécessaire pour le bracket
            const totalHeight = teams.length * matchHeight + (teams.length - 1) * verticalSpacing;
            const numRounds = Math.ceil(Math.log2(teams.length));
            const totalWidth = numRounds * horizontalSpacing + matchWidth;

            // Ajuster la taille du bracket-container pour contenir le bracket
            container.style.height = `${totalHeight + 40}px`;
            container.style.width = `${totalWidth + 40}px`;

            // Positionner les premiers matchs, en centrant l'ensemble du bracket
            const startTop = (container.clientHeight - totalHeight) / 2;
            const startLeft = (container.clientWidth - totalWidth) / 2;

            const firstRoundMatches = [];
            for (let i = 0; i < teams.length; i++) {
                const topPosition = startTop + i * (matchHeight + verticalSpacing);
                const match = createMatch(container, teams[i], topPosition, startLeft, matchWidth, matchHeight);
                firstRoundMatches.push(match);
            }

            // Créer les rounds suivants, en centrant les gagnants
            let previousRoundMatches = firstRoundMatches;
            let roundIndex = 1;

            while (previousRoundMatches.length > 1) {
                const nextRoundMatches = [];
                for (let i = 0; i < previousRoundMatches.length; i += 2) {
                    const match1 = previousRoundMatches[i];
                    const match2 = previousRoundMatches[i + 1];

                    const winnerTop = (parseInt(match1.style.top) + parseInt(match2.style.top)) / 2;
                    const winnerLeft = startLeft + roundIndex * horizontalSpacing;

                    const winnerMatch = createWinnerMatch(container, winnerTop, winnerLeft, matchWidth, matchHeight);
                    createBracket(container, match1, match2, winnerMatch, horizontalSpacing);

                    nextRoundMatches.push(winnerMatch);
                }
                previousRoundMatches = nextRoundMatches;
                roundIndex++;
            }
        });
    }

    drawBracket();
    window.addEventListener("resize", drawBracket); // Redessiner lors du redimensionnement de la fenêtre
});
