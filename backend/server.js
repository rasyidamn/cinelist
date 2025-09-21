import express from "express";
import dotenv from "dotenv";
import moviesRoutes from "./routes/moviesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const { PORT, FRONTEND_URL } = process.env;

const app = express();

app.use(express.json());
app.use(cors({
	origin: FRONTEND_URL
}));
app.use(cookieParser())

app.use("/api/movies", moviesRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
	res.send("halo");
	
});

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Server is running on port: ", PORT);
	});
});
