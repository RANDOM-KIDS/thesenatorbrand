import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
  await migrationClient.end();
  console.log("Migrations completed successfully");
}

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
