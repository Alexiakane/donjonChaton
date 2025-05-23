import { meowgicRepository } from "../repositories/meowgicRepository.js";
import { Meowgic } from "../models/Meowgic.js";
import { logError } from "../utils/logger.js";

export const meowgicService = {
    async getAll() {
        return await meowgicRepository.getAll();
    },

    async get(id) {
        return await meowgicRepository.get(id);
    },

    async getByCharacterId(characterId) {
        return await meowgicRepository.getByCharacterId(characterId);
    },

    async create(meowgicData) {
        let newMeowgic = new Meowgic(
            null,
            meowgicData.name,
            meowgicData.type,
            meowgicData.description,
            meowgicData.difficulty,
        );

        const validation = newMeowgic.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await meowgicRepository.create(newMeowgic);
    },

    async update(id, meowgicData) {
        return await meowgicRepository.update(id, meowgicData);
    },

    async delete(id) {
        return await meowgicRepository.delete(id);
    }
};
