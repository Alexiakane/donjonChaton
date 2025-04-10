export class CharacterFullQuality {
    constructor(idQuality, name, level) {
        this.name = name;
        this.idQuality = idQuality;
        this.level = level;
    }

    // Validation
    estValide() {
        if (!this.idQuality) {
            return { valide: false, erreur: 'L\'ID de la qualité est requis' };
        }
        if (!this.level) {
            return { valide: false, erreur: 'Le niveau est requis' };
        }
        if (this.level < 1 || this.level > 5) {
            return { valide: false, erreur: 'Le niveau doit être compris entre 1 et 5' };
        }
        return { valide: true };
    }
}