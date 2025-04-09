import { childhoodRepository } from '../repositories/childhoodRepository.js';
import { Childhood } from '../models/Childhood.js';
import { logError } from '../utils/logger.js';

export const childhoodService = {

    async getAll() {
        return await childhoodRepository.getAll();
    },

    async get(id) {
        return await childhoodRepository.get(id);
    },

    async create(childhoodData) {
        let newChildhood = new Childhood(
            null,
            childhoodData.name,
            childhoodData.description
        );

        const validation = newChildhood.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await childhoodRepository.create(newChildhood);
    },

    async update(id, childhoodData) {
        const childhood = new Childhood(
            null,
            childhoodData.name,
            childhoodData.description
        );
        return await childhoodRepository.update(id, childhood);
    },

    async delete(id) {
        return await childhoodRepository.delete(id);
    }
};