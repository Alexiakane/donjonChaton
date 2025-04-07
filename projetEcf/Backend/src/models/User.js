export class User {
    constructor(id, fullname, username, email, password, avatar, idRole) {
        this.id = id;
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.idRole = idRole;
    }

    // Validation
    estValide() {
        if (!this.fullname || this.fullname.trim() === '') {
            return { valide: false, erreur: 'Le nom complet est requis' };
        }
        if (!this.username || this.username.trim() === '') {
            return { valide: false, erreur: 'Le nom d\'utilisateur est requis' };
        }
        if (!this.email || this.email.trim() === '') {
            return { valide: false, erreur: 'L\'email est requis' };
        }
        if (!this.password || this.password.trim() === '') {
            return { valide: false, erreur: 'Le mot de passe est requis' };
        }
        return { valide: true };
    }
}

