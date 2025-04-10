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

    async getEquipmentsByCharacterId(characterId) {
        return await meowgicRepository.getEquipmentsByCharacterId(characterId);
    },

    async create(meowgicData) {
        let newMeowgic = new Meowgic(
            null,
            meowgicData.name,
            meowgicData.description
        );

        const validation = newMeowgic.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await meowgicRepository.create(newMeowgic);
    },

    async update(id, meowgicData) {
        const meowgic = new Meowgic(
            null,
            meowgicData.name,
            meowgicData.description
        );
        return await meowgicRepository.update(id, meowgic);
    },

    async delete(id) {
        return await meowgicRepository.delete(id);
    }
};
