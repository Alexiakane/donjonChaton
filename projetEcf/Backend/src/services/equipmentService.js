import { equipmentRepository } from '../repositories/equipmentRepository.js';
import { Equipment } from '../models/Equipment.js';
import { logError } from '../utils/logger.js';

export const equipmentService = {

    async getAll() {
        return await equipmentRepository.getAll();
    },

    async get(id) {
        return await equipmentRepository.get(id);
    },
    
    async getByCharacterId(characterId) {
        return await equipmentRepository.getByCharacterId(characterId);
    },
    
    async create(equipmentData) {
        let newEquipment = new Equipment(
            null,
            equipmentData.name,
            equipmentData.description
        );

        const validation = newEquipment.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await equipmentRepository.create(newEquipment);
    },

    async update(id, equipmentData) {
        return await equipmentRepository.update(id, equipmentData);
    },

    async delete(id) {
        return await equipmentRepository.delete(id);
    }
};