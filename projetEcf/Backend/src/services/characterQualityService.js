import { characterQualityRepository } from '../repositories/characterQualityRepository.js';
import { CharacterQuality } from '../models/CharacterQuality.js';
import { logError } from '../utils/logger.js';

export const characterQualityService = {

    async getAll() {
        return await characterQualityRepository.getAll();
    },

    async getByCharacterId(characterId) {
        return await characterQualityRepository.getByCharacterId(characterId);
    },

    async get(characterId, qualityId) {
        return await characterQualityRepository.get(characterId, qualityId);
    },

    async create(characterQualityData) {
        let newCharacterQuality = new CharacterQuality(
            characterQualityData.idCharacter,
            characterQualityData.idQuality,
            characterQualityData.level
        );

        const validation = newCharacterQuality.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await characterQualityRepository.create(newCharacterQuality);
    },

    async update(characterId, qualityId, characterQualityData) {
        return await characterQualityRepository.update(characterId, qualityId, characterQualityData);
    },

    async delete(characterId, qualityId) {
        return await characterQualityRepository.delete(characterId, qualityId);
    }
};