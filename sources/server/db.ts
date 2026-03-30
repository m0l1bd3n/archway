import path from 'path';
import { config } from 'dotenv';
import { Generated, Kysely, PostgresDialect, sql } from 'kysely';
import { Pool } from 'pg';

config({
  quiet: true,
  path: path.resolve('.env')
});

export interface User {
  id: Generated<number>;
  name: string;
  email: string;
  created_at: Generated<Date>;
}

export interface Database {
  users: User;
}

export const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? '5432'),
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'archway'
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool })
});

export async function initDatabase() {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function getUserByName(name: string) {
  return db
    .selectFrom('users')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
}
