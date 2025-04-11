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
    const description = document.getElementById("description").value;
    if (costaud + mignon + malin > 8) {
        alert("La somme des traits ne doit pas dépasser 8.");
        return;
    }
    if (name === "" || childhoodId === "" || traitId === "" || description === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    if (description.length > 100) {
        alert("La description ne doit pas dépasser 100 caractères.");
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
    if (costaud > 5 || mignon > 5 || malin > 5) {
        alert("Les traits doivent être inférieurs ou égaux à 5.");
        return;
    }
    const qualities = [
        { id: "1", level: costaud },
        { id: "2", level: malin },
        { id: "3", level: mignon }
    ]

    fetch("http://localhost:4000/character", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, idChildhood, idTrait, description })
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


