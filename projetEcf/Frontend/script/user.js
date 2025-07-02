// Fonction pour lister les personnages de l'utilisateur
async function listCharacters() {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");

    if (!idUser) {
        showMessageModal("Utilisateur non trouvé.");
        return;
    }

    const response = await fetch(`http://localhost:4000/characters/user/${idUser}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        const characterList = document.getElementById("characterList");
        characterList.innerHTML = "";
        data.characters.forEach(character => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.className = "character-name";
            span.textContent = character.name || "";
            li.appendChild(span);
            li.style.cursor = "pointer";
            li.onclick = () => showFullCharacterById(character.id);
            characterList.appendChild(li);
        });
    } else {
        showMessageModal("Erreur lors de la récupération des personnages. Veuillez vous assurer que vous êtes connecté.");
    }
}
// Fonction pour rechercher un personnage
async function searchCharacter() {
    const token = localStorage.getItem("token");
    const searchTerm = document.getElementById("searchTerm").value;

    if (!searchTerm) {
        showMessageModal("Veuillez entrer un terme de recherche.");
        return;
    }

    const response = await fetch(`http://localhost:4000/characters/search?term=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        const characterList = document.getElementById("characterList");
        characterList.innerHTML = "";
        data.characters.forEach(character => {
            const li = document.createElement("li");
            li.textContent = character.name || "";
            li.style.cursor = "pointer";
            li.onclick = () => showFullCharacterById(character.id);
            characterList.appendChild(li);
        });
    } else {
        showMessageModal("Erreur lors de la recherche du personnage.");
    }
}

// Fonction pour afficher les détails d'un personnage complet
// Cette fonction est appelée lorsque l'utilisateur clique sur un personnage dans la liste
async function showFullCharacterById(characterId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/characterfull/${characterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });
    const data = await response.json();
    if (response.ok) {
        // Affiche les infos comme tu veux, par exemple dans une modale :
        generateFichePerso(data.characterFull);
        // Ou personnalise l'affichage selon tes besoins
    } else {
        showMessageModal("Erreur lors de la récupération du personnage.");
    }
}

// Fonction pour générer la fiche personnage
// Cette fonction crée un canvas et y dessine les informations du personnage
function generateFichePerso(character) {
    const canvas = document.getElementById("fichePersoCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "/illustration/pagePerso.png";

    img.onload = async function () {
        await document.fonts.load("16px 'New Rocker'");
        // Efface le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Dessine l'image de fond
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Style du texte
        ctx.font = "16px 'New Rocker'";
        ctx.fillStyle = "#7c3f00"; // Couleur du texte
        ctx.textAlign = "left";

        // Place chaque info à la bonne position (à ajuster selon ton modèle)
        ctx.fillText(character.name, 168, 110); // Nom
        ctx.fillText(character.heartPoints, 423, 327);
        ctx.fillText(character.friendshipPoints, 525, 338);
        ctx.fillText(character.childhood.name, 172, 167); // Enfance
        ctx.fillText(character.trait.name, 178, 186); // Trait
        ctx.fillText(character.childhood.gift, 231, 206); // Don
        const costaud = (character.qualities.find(q => q.idQuality === "1" || q.idQuality === 1) || {}).level || "";
        const malin = (character.qualities.find(q => q.idQuality === "2" || q.idQuality === 2) || {}).level || "";
        const mignon = (character.qualities.find(q => q.idQuality === "3" || q.idQuality === 3) || {}).level || "";

        ctx.fillText(costaud, 130, 332); // Costaud
        ctx.fillText(malin, 215, 332);   // Malin
        ctx.fillText(mignon, 305, 332);  // Mignon
        // Affiche chaque sort sur une ligne, à partir d'une position de départ (exemple : x=1565, y=333)
        const startX = 624;
        let startY = 139;
        const lineHeight = 30; // Espace entre chaque sort

        character.meowgics.forEach(m => {
            ctx.fillText(m.name, startX, startY);
            startY += lineHeight;
        });

        const talentPositions = {
            1: { x: 98, y: 454 }, // Talent 1
            2: { x: 98, y: 479 }, // Talent 2
            3: { x: 97, y: 505 }, // Talent 3
            4: { x: 97, y: 530 },
            5: { x: 96, y: 555 },
            6: { x: 96, y: 580 },
            7: { x: 96, y: 605 },
            8: { x: 96, y: 630 },
            9: { x: 96, y: 655 },
            10: { x: 96, y: 680 },
            11: { x: 95, y: 705 },
            12: { x: 95, y: 729 },
            13: { x: 390, y: 458 },
            14: { x: 390, y: 483 },
            15: { x: 390, y: 508 },
            16: { x: 389, y: 532 },
            17: { x: 390, y: 558 },
            18: { x: 390, y: 582 },
            19: { x: 390, y: 608 },
            20: { x: 390, y: 633 },
            21: { x: 388, y: 658 },
            22: { x: 388, y: 683 },
            23: { x: 387, y: 708 },
            24: { x: 387, y: 733 },
        };

        character.talents.forEach(talent => {
            const pos = talentPositions[Number(talent.id)];
            if (pos) {
                ctx.font = "24px Arial";
                ctx.fillStyle = "#a00";
                ctx.textAlign = "center";
                ctx.fillText("X", pos.x, pos.y);
            }
        });
        canvas.dataset.characterName = character.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        // Affiche le canvas et le bouton de téléchargement
        canvas.style.display = "block";
        document.getElementById("downloadSheetBtn").style.display = "inline-block";
    };
}
document.getElementById("downloadSheetBtn").onclick = function () {
    const canvas = document.getElementById("fichePersoCanvas");
    const link = document.createElement("a");
    link.download = `fiche_${canvas.dataset.characterName || "perso"}.png`; link.href = canvas.toDataURL();
    link.click();
};

// Fonction pour supprimer un personnage
async function deleteCharacter(characterId) {
    const token = localStorage.getItem("token");

    if (!confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
        return;
    }

    const response = await fetch(`http://localhost:4000/characters/${characterId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        showMessageModal("Personnage supprimé avec succès !");
        listCharacters(); // Rafraîchir la liste des personnages
    } else {
        showMessageModal("Erreur lors de la suppression du personnage. Veuillez vous assurer que vous êtes connecté.");
    }
}

 populateMeowgicsDropdowns().then(() => {
        handleMeowgicsDropdowns();
        preventDuplicateMeowgics();
    });
    populateTalentsDropdowns().then(preventDuplicateTalents);

    const childhoodSelect = document.getElementById("childhood");
    if (childhoodSelect) {
        childhoodSelect.addEventListener("change", () => {
            handleMeowgicsDropdowns();
            preventDuplicateMeowgics();
        });
    }