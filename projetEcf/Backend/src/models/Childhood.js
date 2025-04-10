export class Childhood {
    constructor(id, name, description, gift, giftDescription) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gift = gift;
        this.giftDescription = giftDescription;
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