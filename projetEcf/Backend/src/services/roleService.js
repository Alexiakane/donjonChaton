import { roleRepository } from '../repositories/roleRepository.js';
import { Role } from '../models/Role.js';
import { logError } from '../utils/logger.js';

export const roleService = {

    async getAll() {
        return await roleRepository.getAll();
    },

    async get(id) {
        return await roleRepository.get(id);
    },

    async create(roleData) {
        let newRole = new Role(
            null,
            roleData.name,
            roleData.description
        );

        const validation = newRole.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await roleRepository.create(newRole);
    },

    async update(id, roleData) {
        return await roleRepository.update(id, roleData);
    },

    async delete(id) {
        return await roleRepository.delete(id);
    }
};