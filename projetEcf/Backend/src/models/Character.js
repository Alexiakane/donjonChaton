export class Character {
    constructor(id, name, heartPoints, friendshipPoints, idChildhood, idGift, idTrait, idUser, story, portrait, xp) {
        this.id = id;
        this.name = name;
        this.heartPoints = heartPoints;
        this.friendshipPoints = friendshipPoints;
        this.idChildhood = idChildhood;
        this.idGift = idGift;
        this.idTrait = idTrait;
        this.idUser = idUser;
        this.story = story;
        this.portrait = portrait;
        this.xp = xp;
    }

    // Validation
    estValide() {
        if (!this.name || this.name.trim() === '') {
            return { valide: false, erreur: 'Le nom est requis' };
        }
        if (!this.idChildhood) {
            return { valide: false, erreur: 'L\'enfance est requise' };
        }
        if (!this.idGift) {
            return { valide: false, erreur: 'Le don est requis' };
        }
        if (!this.idTrait) {
            return { valide: false, erreur: 'Le trait est requis' };
        }
        if (!this.idUser) {
            return { valide: false, erreur: 'L\'utilisateur est requis' };
        }
        return { valide: true };
    }
}