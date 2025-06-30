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
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        window.location.href = "login.html";
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
        alert("Connexion réussie ! Bienvenue ");
        window.location.href = "index.html";
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
        alert("Déconnexion réussie ! À bientôt.");
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
        alert("Erreur lors de la récupération des souvenirs d'enfance.");
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
        alert("Erreur lors de la récupération des traits.");
    }
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
        alert("La somme des traits ne doit pas dépasser 8.");
        return;
    }
    if (name === "" || idChildhood === "" || idTrait === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    if (story.length > 100) {
        alert("La story ne doit pas dépasser 100 caractères.");
        return;
    }
    if (name.length > 50) {
        alert("Le nom ne doit pas dépasser 50 caractères.");
        return;
    }
    if (costaud < 0 || mignon < 0 || malin < 0) {
        alert("Les traits doivent être des valeurs positives.");
        return;
    }
    if (costaud >= 5 || mignon >= 5 || malin >= 5) {
        alert("Les traits doivent être inférieurs ou égaux à 5.");
        return;
    }
    const qualities = [
        { id: "1", level: costaud },
        { id: "2", level: malin },
        { id: "3", level: mignon }
    ]
    const idUser = localStorage.getItem("idUser");
    if (!idUser) {
        alert("Utilisateur non trouvé.");
        return;
    }
    const equipments = [];
    const talents = [];
    const meowgics = [];

    fetch("http://localhost:4000/characterfull", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ idUser, name, idChildhood, idTrait, qualities, story, equipments, talents, meowgics })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert("Personnage créé avec succès !");
                window.location.href = "index.html";
            } else {
                alert("Erreur lors de la création du personnage.");
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
                nameCell.textContent = meowgic.name;
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
        alert("Erreur lors de la récupération des meowgics.");
    }

};

// Fonction pour lister les personnages de l'utilisateur
async function listCharacters() {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");

    if (!idUser) {
        alert("Utilisateur non trouvé.");
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
            li.textContent = `${character.name} - ${character.story}`;
            characterList.appendChild(li);
        });
    } else {
        alert("Erreur lors de la récupération des personnages.");
    }
}
// Fonction pour rechercher un personnage
async function searchCharacter() {
    const token = localStorage.getItem("token");
    const searchTerm = document.getElementById("searchTerm").value;

    if (!searchTerm) {
        alert("Veuillez entrer un terme de recherche.");
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
            li.textContent = `${character.name} - ${character.story}`;
            characterList.appendChild(li);
        });
    } else {
        alert("Erreur lors de la recherche du personnage.");
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
        alert("Personnage supprimé avec succès !");
        listCharacters(); // Rafraîchir la liste des personnages
    } else {
        alert("Erreur lors de la suppression du personnage.");
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
});
