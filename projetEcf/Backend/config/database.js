import pkg from 'pg';
const { Pool } = pkg;


const db = new Pool({
        connectionString: "postgres://postgres:postgres@localhost:5432/kittendungeon"
});

export default db;

async function initDb() {

        await db.query(`CREATE TABLE IF NOT EXISTS "Character" (
        ID_Character SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Heart_Points integer,
        Friendship_Points integer,
        ID_Childhood integer NOT NULL,
        ID_Trait integer NOT NULL,
        ID_User integer NOT NULL,
        Story text,
        Portrait varchar,
        Xp integer
    )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Childhood" (
        ID_Childhood SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Description varchar NOT NULL,
        Gift varchar NOT NULL,
        Gift_Description text NOT NULL
)`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Trait" (
        ID_Trait SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Description varchar NOT NULL
 )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Quality" (
        ID_Quality SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Description text
  )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Character_Quality" (
        ID_Character integer NOT NULL,
        ID_Quality integer NOT NULL,
        Level integer NOT NULL
  )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Talent" (
        ID_Talent SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Description varchar NOT NULL
   )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Character_Talent" (
        ID_Character integer NOT NULL,
        ID_Talent integer NOT NULL
 )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Equipment" (
        ID_Equipment SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Description varchar NOT NULL
  )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Character_Equipment" (
        ID_Character integer NOT NULL,
        ID_Equipment integer NOT NULL
     )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Meowgic" (
        ID_Meowgic SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Type varchar NOT NULL,
        Description varchar NOT NULL,
        Difficulty integer NOT NULL
  )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Character_Meowgic" (
        ID_Character integer NOT NULL,
        ID_Meowgic integer NOT NULL
   )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "User" (
        ID_User SERIAL PRIMARY KEY NOT NULL,
        Fullname varchar NOT NULL,
        Username varchar NOT NULL,
        Email varchar NOT NULL,
        Password varchar NOT NULL,
        Avatar varchar,
        ID_Role integer NOT NULL
  )`);

        await db.query(`CREATE TABLE IF NOT EXISTS "Role" (
        ID_Role SERIAL PRIMARY KEY NOT NULL,
        Name varchar NOT NULL,
        Description varchar NOT NULL
  )`);

        await db.query(`CREATE INDEX ON "Character"(Name)`);

        await db.query(`CREATE INDEX ON "Character_Quality"(ID_Character)`);

        await db.query(`CREATE INDEX ON "Character_Quality"(ID_Quality)`);

        await db.query(`CREATE INDEX ON "Character_Talent"(ID_Character)`);

        await db.query(`CREATE INDEX ON "Character_Talent"(ID_Talent)`);

        await db.query(`CREATE INDEX ON "Character_Equipment"(ID_Character)`);

        await db.query(`CREATE INDEX ON "Character_Equipment"(ID_Equipment)`);

        await db.query(`CREATE INDEX ON "Character_Meowgic"(ID_Character)`);

        await db.query(`CREATE INDEX ON "Character_Meowgic"(ID_Meowgic)`);

        await db.query(`ALTER TABLE "Character_Equipment" ADD FOREIGN KEY(ID_Character) REFERENCES "Character"(ID_Character)`);

        await db.query(`ALTER TABLE "Character_Equipment" ADD FOREIGN KEY(ID_Equipment) REFERENCES "Equipment"(ID_Equipment)`);

        await db.query(`ALTER TABLE "Character_Meowgic" ADD FOREIGN KEY(ID_Character) REFERENCES "Character"(ID_Character)`);

        await db.query(`ALTER TABLE "Character_Meowgic" ADD FOREIGN KEY(ID_Meowgic) REFERENCES "Meowgic"(ID_Meowgic)`);

        await db.query(`ALTER TABLE "Character_Quality" ADD FOREIGN KEY(ID_Character) REFERENCES "Character"(ID_Character)`);

        await db.query(`ALTER TABLE "Character_Quality" ADD FOREIGN KEY(ID_Quality) REFERENCES "Quality"(ID_Quality)`);

        await db.query(`ALTER TABLE "Character_Talent" ADD FOREIGN KEY(ID_Character) REFERENCES "Character"(ID_Character)`);

        await db.query(`ALTER TABLE "Character_Talent" ADD FOREIGN KEY(ID_Talent) REFERENCES "Talent"(ID_Talent)`);

        await db.query(`ALTER TABLE "Character" ADD FOREIGN KEY(ID_Childhood) REFERENCES "Childhood"(ID_Childhood)`);

        await db.query(`ALTER TABLE "Character" ADD FOREIGN KEY(ID_Trait) REFERENCES "Trait"(ID_Trait)`);

        await db.query(`ALTER TABLE "Character" ADD FOREIGN KEY(ID_User) REFERENCES "User"(ID_User)`);

        await db.query(`ALTER TABLE "User" ADD FOREIGN KEY(ID_Role) REFERENCES "Role"(ID_Role)`);
}

initDb().catch(err => console.error(err))
        .then(() => console.log('Database initialized'))
        .catch(err => console.error('Error initializing database', err));