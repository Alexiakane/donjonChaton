export class CharacterQuality {
    constructor(idCharacter, idQuality, level) {
        this.idCharacter = idCharacter;
        this.idQuality = idQuality;
        this.level = level;
    }

    // Validation
    estValide() {
        if (!this.idCharacter) {
            return { valide: false, erreur: 'L\'ID du personnage est requis' };
        }
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