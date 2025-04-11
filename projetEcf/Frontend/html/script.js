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
        data.forEach(childhood => {
            const opt = document.createElement("option");
            opt.value = childhood.id;
            opt.textContent = `${childhood.name}`;
            childhoodList.appendChild(opt);
        });
    } else {
        alert("Erreur lors de la récupération des souvenirs d'enfance.");
    }

}


