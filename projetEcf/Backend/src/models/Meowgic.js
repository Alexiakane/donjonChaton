export class Meowgic {
    constructor(id, name, type, description, difficulty) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.difficulty = difficulty;
    }

    // Validation
    estValide() {
        if (!this.name || this.name.trim() === '') {
            return { valide: false, erreur: 'Le nom est requis' };
        }
        if (!this.type) {
            return { valide: false, erreur: 'Le type est requis' };
        }
        if (!this.description || this.description.trim() === '') {
            return { valide: false, erreur: 'La description est requise' };
        }
        if (!this.difficulty) {
            return { valide: false, erreur: 'La difficulté est requise' };
        }
        return { valide: true };
    }
}