import { qualityRepository } from '../repositories/qualityRepository.js';
import { Quality } from '../models/Quality.js';
import { logError } from '../utils/logger.js';

export const qualityService = {

    async getAll() {
        return await qualityRepository.getAll();
    },

    async get(id) {
        return await qualityRepository.get(id);
    },

    async create(qualityData) {
        let newQuality = new Quality(
            null,
            qualityData.name,
            qualityData.description
        );

        const validation = newQuality.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await qualityRepository.create(newQuality);
    },

    async update(id, qualityData) {
        const quality = new Quality(
            null,
            qualityData.name,
            qualityData.description
        );
        return await qualityRepository.update(id, quality);
    },

    async delete(id) {
        return await qualityRepository.delete(id);
    }
};