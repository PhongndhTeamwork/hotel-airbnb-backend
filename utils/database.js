import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const database = knex({
	client: "pg",
	connection: {
		host: process.env.HOST,
		port: process.env.POSTGRES_PORT,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	},
});

export default database;