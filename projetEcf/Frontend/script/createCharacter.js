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

document.addEventListener("DOMContentLoaded", function () {
    listChildhood();
    listTraits();
    populateMeowgicsDropdowns().then(() => {
        handleMeowgicsDropdowns();
        preventDuplicateMeowgics();
    });
    populateTalentsDropdowns().then(preventDuplicateTalents);
});