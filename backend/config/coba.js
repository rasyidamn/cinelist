import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"
import { json } from "express";
import bcrypt from "bcrypt"

dotenv.config()

async function coba() {
	const DATABASE_URL = process.env.DATABASE_URL;

	const sql = neon(DATABASE_URL);

	const [username, email, password] = ["asuuuu", "eltrfdasfsdyoan@il.com", "dani"]

	const hashedPassword = await bcrypt.hash(password,10)

	try {
		const user = await sql`
               INSERT INTO users (username, email, password)
					VALUES (${username}, ${email}, ${hashedPassword})
					RETURNING username; 
         `;

		console.log("berhasil", user);
	} catch (error) {
		console.log("terjadi error", error.detail)
	}

	
}

coba()
