import {neon} from "@neondatabase/serverless"

const DATABASE_URL = process.env.DATABASE_URL

export const sql = neon(DATABASE_URL)
export const connectDB = async ()=>{
   try {
      await sql`
         SELECT version()
      `
      console.log("Sukses terhubung ke database")
   } catch (error) {
      console.log("Gagal menghubungkan ke database", error)
      throw error
   }
}