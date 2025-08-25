import 'dotenv/config'; // <-- make sure env vars are loaded
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless"; 

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql); 
if (!db) {
    console.log("_db instance is not avilable_")
}
// console.log("Database Instance: ", db);

const migrateToProd = async () => {
    try {
        console.log("Starting migration to production...");
        await migrate(db, {
            migrationsFolder: "../drizzleMigrations/meta"
        })
        console.log("Migration to production is successful");
    } catch (error) {
        console.error(error); 
        console.log("_Request of migration is failed_");
        process.exit(1);
    }
}

migrateToProd();