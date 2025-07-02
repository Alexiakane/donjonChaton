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