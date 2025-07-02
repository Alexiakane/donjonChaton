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