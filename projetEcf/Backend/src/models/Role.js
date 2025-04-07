export class Role {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // Validation
    estValide() {
        if (!this.name || this.name.trim() === '') {
            return { valide: false, erreur: 'Le nom est requis' };
        }
        if (!this.description || this.description.trim() === '') {
            return { valide: false, erreur: 'La description est requise' };
        }
        return { valide: true };
    }
}