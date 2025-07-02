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
                    window.location.href = "index.html";
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
        showMessageModal(JSON.stringify(data.characterFull, null, 2));
        // Ou personnalise l'affichage selon tes besoins
    } else {
        showMessageModal("Erreur lors de la récupération du personnage.");
    }
}

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
