import { test, expect } from 'vitest';
import { roleRepository } from "../../src/repositories/roleRepository.js";
import { Role } from "../../src/models/Role.js";

test ('roleRepository.getAll() should return an array of roles', async () => {
    const roles = await roleRepository.getAll();
    expect(roles).toBeInstanceOf(Array);
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0]).toBeInstanceOf(Role);
})

test ('roleRepository.get(id) should return a role object', async () => {
    const role = await roleRepository.get(1);
    expect(role).toBeInstanceOf(Role);
    expect(role.id).toBe(1);
})

test ('roleRepository.get(id) should return null for non-existing role', async () => {
    const role = await roleRepository.get(9999); // Assuming 9999 does not exist
    expect(role).toBeNull();
})

/*
test ('roleRepository.create(role) should create a new role', async () => {
    let newrole = new role(null, 'New role', 'Description of new role');
    const createdroleId = await roleRepository.create(newrole);
    expect(createdroleId).toBeDefined();
    expect(typeof createdroleId).toBe('number');
})

test ('roleRepository.update(id, role) should update an existing role', async () => {
    const updatedrole = new role(1, 'Updated role', 'Updated description');
    const result = await roleRepository.update(1, updatedrole);
    expect(result).toBeDefined();
    expect(result).toBe(true); // Assuming the update returns true on success
})

test ('roleRepository.delete(id) should delete an existing role', async () => {
    const result = await roleRepository.delete(1); // Assuming 1 exists
    expect(result).toBeDefined();
    expect(result).toBe(true); // Assuming the delete returns true on success
})

test ('roleRepository.delete(id) should return false for non-existing role', async () => {
    const result = await roleRepository.delete(9999); // Assuming 9999 does not exist
    expect(result).toBeDefined();
    expect(result).toBe(false); // Assuming the delete returns false on failure
})
*/
