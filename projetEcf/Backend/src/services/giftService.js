import { giftRepository } from '../repositories/giftRepository.js';
import { Gift } from '../models/Gift.js';
import { logError } from '../utils/logger.js';

export const giftService = {

    async getAll() {
        return await giftRepository.getAll();
    },

    async get(id) {
        return await giftRepository.get(id);
    },

    async create(giftData) {
        let newGift = new Gift(
            null,
            giftData.name,
            giftData.description
        );

        const validation = newGift.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await giftRepository.create(newGift);
    },

    async update(id, giftData) {
        const gift = new Gift(
            null,
            giftData.name,
            giftData.description
        );
        return await giftRepository.update(id, gift);
    },

    async delete(id) {
        return await giftRepository.delete(id);
    }
};