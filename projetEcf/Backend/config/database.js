import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
        connectionString: "postgres://postgres:postgres@localhost:5432/kittendungeon"
});

export default db;
