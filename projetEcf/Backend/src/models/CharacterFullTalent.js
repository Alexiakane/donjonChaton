export class CharacterFullTalent {
    constructor(idTalent, name) {
        this.name = name;
        this.idTalent = idTalent;
    }

    // Validation
    estValide() {
        if (!this.idTalent) {
            return { valide: false, erreur: 'L\'ID du Talent est requis' };
        }
        return { valide: true };
    }
}