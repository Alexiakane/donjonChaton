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