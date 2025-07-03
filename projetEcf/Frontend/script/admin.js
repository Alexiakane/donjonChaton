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

async function filterMeowgicsByQuality(quality) {
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

    // Filtrer tous les types contenant la qualité (ex: "Costaud")
    const filtered = meowgics.filter(m => m.type && m.type.toLowerCase().includes(quality.toLowerCase()));

    // Affiche dans le tableau de la modale
    const modalTableBody = document.getElementById("modalInfoTable").getElementsByTagName("tbody")[0];
    modalTableBody.innerHTML = "";
    filtered.forEach(meowgic => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${meowgic.id}</td>
            <td>${meowgic.name} (${meowgic.type})</td>
            <td>${meowgic.description}</td>
        `;
        modalTableBody.appendChild(row);
    });

    // Ouvre la modale
    document.getElementById("infoModal").style.display = "block";
}

async function searchMeowgicById() {
    const searchValue = document.getElementById("search").value.trim();
    if (!searchValue) return;

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

    // Recherche par ID (exact) ou par nom (optionnel)
    const results = meowgics.filter(m =>
        String(m.id) === searchValue
        // ou pour autoriser la recherche par nom :
        || (m.name && m.name.toLowerCase().includes(searchValue.toLowerCase()))
    );

    // Affiche le résultat dans la modale
    const modalTableBody = document.getElementById("modalInfoTable").getElementsByTagName("tbody")[0];
    modalTableBody.innerHTML = "";
    results.forEach(meowgic => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${meowgic.id}</td>
            <td>${meowgic.name} (${meowgic.type})</td>
            <td>${meowgic.description}</td>
        `;
        modalTableBody.appendChild(row);
    });

    // Ouvre la modale
    document.getElementById("infoModal").style.display = "block";
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("searchMeowgicForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            searchMeowgicById();
        });
    }
});