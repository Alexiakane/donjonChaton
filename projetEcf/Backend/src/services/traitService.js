import { traitRepository } from '../repositories/traitRepository.js';
import { Trait } from '../models/Trait.js';
import { logError } from '../utils/logger.js';

export const traitService = {

    async getAll() {
        return await traitRepository.getAll();
    },

    async get(id) {
        return await traitRepository.get(id);
    },

    async create(traitData) {
        let newTrait = new Trait(
            null,
            traitData.name,
            traitData.description
        );

        const validation = newTrait.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await traitRepository.create(newTrait);
    },

    async update(id, traitData) {
        const trait = new Trait(
            null,
            traitData.name,
            traitData.description
        );
        return await traitRepository.update(id, trait);
    },

    async delete(id) {
        return await traitRepository.delete(id);
    }
};