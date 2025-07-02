// Fonction pour gérer l'inscription
async function register() {
    const fullname = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullname, username, email, password })
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        showMessageModal("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    } else {
        // Affiche un message d'erreur si l'inscription échoue
        showMessageModal(data.message || "Erreur lors de l'inscription. Veuillez réessayer.");
    }
}

// Fonction pour gérer la connexion
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("idUser", data.user.user.id); // Stocker l'ID de l'utilisateur
        showMessageModal("Connexion réussie ! Bienvenue ");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } else {
        // Affiche un message d'erreur si la connexion échoue
        showMessageModal(data.message || "Erreur lors de la connexion. Vérifiez vos identifiants.");
    }
}

// Fonction pour gérer la déconnexion
async function logout() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        localStorage.removeItem("token");
        showMessageModal("Déconnexion réussie ! À bientôt.");
        window.location.href = "login.html";
    }
}
// Fonction pour lister childhood
async function listChildhood() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/childhoods", {
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
        const childhoodList = document.getElementById("childhood");
        childhoodList.innerHTML = "";
        data.childhoods.forEach(childhood => {
            const opt = document.createElement("option");
            opt.value = childhood.id;
            opt.textContent = `${childhood.name}`;
            childhoodList.appendChild(opt);
        });
    } else {
        showMessageModal("Erreur lors de la récupération des souvenirs d'enfance. Veuillez vous assurer que vous êtes connecté.");
    }

}
// Fonction pour lister les traits

async function listTraits() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/traits", {
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
        const traitList = document.getElementById("traits");
        traitList.innerHTML = "";
        data.traits.forEach(trait => {
            const opt = document.createElement("option");
            opt.value = trait.id;
            opt.textContent = `${trait.name}`;
            traitList.appendChild(opt);
        });
    } else {
        showMessageModal("Erreur lors de la récupération des traits. Veuillez vous assurer que vous êtes connecté.");
    }
}

// Remplit les 3 menus déroulants avec les sorts depuis l'API
async function populateMeowgicsDropdowns() {

    const selects = [
        document.getElementById("meowgic1"),
        document.getElementById("meowgic2"),
        document.getElementById("meowgic3")
    ];
    selects.forEach(sel => sel.innerHTML = "");

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/meowgics", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        });
        const data = await response.json();
        const meowgics = Array.isArray(data) ? data : data.meowgics;

        selects.forEach(sel => {
            const defaultOpt = document.createElement("option");
            defaultOpt.value = "";
            defaultOpt.textContent = "Choisissez un sort";
            sel.appendChild(defaultOpt);

            meowgics.forEach(m => {
                const option = document.createElement("option");
                option.value = m.id;
                // Affiche le nom du sort + la qualité (stockée dans m.type)
                option.textContent = `${m.name} (${m.type})`;
                sel.appendChild(option);
            });
        });
    } catch (e) {
        selects.forEach(sel => {
            sel.innerHTML = "<option disabled>Erreur lors du chargement des sorts</option>";
        });
    }
}

// Affiche ou masque le 3e select selon l'enfance
function handleMeowgicsDropdowns() {
    const childhoodSelect = document.getElementById("childhood");
    const meowgic3 = document.getElementById("meowgic3");
    const help = document.getElementById("meowgicsHelp");
    if (!childhoodSelect || !meowgic3 || !help) return;

    if (childhoodSelect.options[childhoodSelect.selectedIndex]?.text === "Miage") {
        meowgic3.style.display = "";
        help.textContent = "Vous pouvez choisir 3 sorts.";
        meowgic3.required = true;
    } else {
        meowgic3.style.display = "none";
        help.textContent = "Vous pouvez choisir 2 sorts.";
        meowgic3.value = "";
        meowgic3.required = false;
    }
}

// Empêche de choisir deux fois le même sort
function preventDuplicateMeowgics() {
    const selects = [
        document.getElementById("meowgic1"),
        document.getElementById("meowgic2"),
        document.getElementById("meowgic3")
    ];
    selects.forEach((sel, idx) => {
        sel.onchange = function () {
            const values = selects.map(s => s.value);
            selects.forEach((s, i) => {
                Array.from(s.options).forEach(opt => {
                    opt.disabled = false;
                    if (opt.value && values.includes(opt.value) && values.indexOf(opt.value) !== i) {
                        opt.disabled = true;
                    }
                });
            });
        };
    });
}

// Remplit les 2 menus déroulants avec les talents depuis l'API
async function populateTalentsDropdowns() {
    const selects = [
        document.getElementById("talent1"),
        document.getElementById("talent2")
    ];
    selects.forEach(sel => sel.innerHTML = "");

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/talents", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        });
        const data = await response.json();
        const talents = Array.isArray(data) ? data : data.talents;

        selects.forEach(sel => {
            const defaultOpt = document.createElement("option");
            defaultOpt.value = "";
            defaultOpt.textContent = "Choisissez un talent";
            sel.appendChild(defaultOpt);

            talents.forEach(t => {
                const option = document.createElement("option");
                option.value = t.id;
                // Affiche le nom du talent + éventuellement une catégorie si tu as un champ type/categorie
                option.textContent = t.name + (t.type ? ` (${t.type})` : "");
                sel.appendChild(option);
            });
        });
    } catch (e) {
        selects.forEach(sel => {
            sel.innerHTML = "<option disabled>Erreur lors du chargement des talents</option>";
        });
    }
}

// Empêche de choisir deux fois le même talent
function preventDuplicateTalents() {
    const selects = [
        document.getElementById("talent1"),
        document.getElementById("talent2")
    ];
    selects.forEach((sel, idx) => {
        sel.onchange = function () {
            const values = selects.map(s => s.value);
            selects.forEach((s, i) => {
                Array.from(s.options).forEach(opt => {
                    opt.disabled = false;
                    if (opt.value && values.includes(opt.value) && values.indexOf(opt.value) !== i) {
                        opt.disabled = true;
                    }
                });
            });
        };
    });
}

function creerPersonnage() {
    const token = localStorage.getItem("token");
    const name = document.getElementById("name").value;
    const idChildhood = document.getElementById("childhood").value;
    const idTrait = document.getElementById("traits").value;
    const costaud = document.getElementById("costaud").value;
    const mignon = document.getElementById("mignon").value;
    const malin = document.getElementById("malin").value;
    const story = document.getElementById("story").value;
    if (costaud + mignon + malin == 8) {
        showMessageModal("La somme des traits ne doit pas dépasser 8.");
        return;
    }
    if (name === "" || idChildhood === "" || idTrait === "") {
        showMessageModal("Veuillez remplir tous les champs.");
        return;
    }
    if (story.length > 100) {
        showMessageModal("La story ne doit pas dépasser 100 caractères.");
        return;
    }
    if (name.length > 50) {
        showMessageModal("Le nom ne doit pas dépasser 50 caractères.");
        return;
    }
    if (costaud < 0 || mignon < 0 || malin < 0) {
        showMessageModal("Les traits doivent être des valeurs positives.");
        return;
    }
    if (costaud > 5 || mignon > 5 || malin > 5) {
        showMessageModal("Les traits doivent être inférieurs ou égaux à 5.");
        return;
    }
    const qualities = [
        { id: "1", level: costaud },
        { id: "2", level: malin },
        { id: "3", level: mignon }
    ]
    const idUser = localStorage.getItem("idUser");
    if (!idUser) {
        showMessageModal("Utilisateur non trouvé.");
        return;
    }
    const equipments = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const talents = [];
    const t1 = document.getElementById("talent1").value;
    const t2 = document.getElementById("talent2").value;
    if (t1) talents.push({ id: t1 });
    if (t2) talents.push({ id: t2 });
    const meowgics = [];
    const m1 = document.getElementById("meowgic1").value;
    const m2 = document.getElementById("meowgic2").value;
    const m3 = document.getElementById("meowgic3").value;
    if (m1) meowgics.push({ id: m1 });
    if (m2) meowgics.push({ id: m2 });
    if (m3 && document.getElementById("meowgic3").style.display !== "none") meowgics.push({ id: m3 });
    const heartPoints = parseInt(costaud) + parseInt(malin);
    const friendshipPoints = parseInt(mignon);
    fetch("http://localhost:4000/characterfull", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ idUser, name, heartPoints, friendshipPoints, idChildhood, idTrait, qualities, story, equipments, talents, meowgics })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                showMessageModal("Personnage créé avec succès !");
                setTimeout(() => {
                    window.location.href = "user.html";
                }, 2000);
            } else {
                showMessageModal("Erreur lors de la création du personnage.");
            }
        })
        .catch(error => console.error('Erreur:', error));
}

//fonction pour lister les meowgics
async function listMeowgics() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/meowgics", {
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
        const modal = document.getElementById("infoModal");
        const modalTableBody = document.getElementById("modalInfoTable").getElementsByTagName("tbody")[0];

        // Vider le tableau avant d'ajouter de nouvelles données
        modalTableBody.innerHTML = "";

        // Utilise le bon tableau selon la structure de la réponse
        const meowgics = Array.isArray(data) ? data : data.meowgics;

        if (Array.isArray(meowgics)) {
            meowgics.forEach(meowgic => {
                const row = document.createElement("tr");
                const idCell = document.createElement("td");
                const nameCell = document.createElement("td");
                const descriptionCell = document.createElement("td");

                idCell.textContent = meowgic.id;
                nameCell.textContent = `${meowgic.name} (${meowgic.type})`;
                descriptionCell.textContent = meowgic.description;

                row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(descriptionCell);

                modalTableBody.appendChild(row);
            });
        } else {
            modalTableBody.innerHTML = "<tr><td colspan='3'>Aucune donnée trouvée.</td></tr>";
        }

        // Afficher la boîte modale
        modal.style.display = "block";
    } else {
        showMessageModal("Erreur lors de la récupération des meowgics.");
    }

};

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
            li.textContent = character.name || "";
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
    img.src = "Illustration/pagePerso.png"; // adapte le chemin si besoin

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
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("infoModal");
    const span = document.querySelector("#infoModal .close");
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        };
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

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
});

function showMessageModal(message) {
    const modal = document.getElementById("messageModal");
    const msg = document.getElementById("modalMessage");
    const closeBtn = document.querySelector("#messageModal .close-message");
    msg.textContent = message;
    modal.style.display = "block";
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}
