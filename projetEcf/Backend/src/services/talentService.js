import { talentRepository } from '../repositories/talentRepository.js';
import { Talent } from '../models/Talent.js';
import { logError } from '../utils/logger.js';

export const talentService = {

    async getAll() {
        return await talentRepository.getAll();
    },

    async get(id) {
        return await talentRepository.get(id);
    },

    async getByCharacterId(characterId) {
        return await talentRepository.getByCharacterId(characterId);
    },

    async create(talentData) {
        let newTalent = new Talent(
            null,
            talentData.name,
            talentData.description
        );

        const validation = newTalent.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await talentRepository.create(newTalent);
    },

    async update(id, talentData) {
        const talent = new Talent(
            null,
            talentData.name,
            talentData.description
        );
        return await talentRepository.update(id, talent);
    },

    async delete(id) {
        return await talentRepository.delete(id);
    }
};