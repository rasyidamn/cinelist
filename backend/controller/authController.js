import bcrypt from "bcrypt";
import { sql } from "../config/db.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({
				success: false,
				message: "username atau password tidak boleh kosong!",
			});
		}

		const user = (
			await sql`
            SELECT * FROM users WHERE username=${username};
      `
		)[0];

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "tidak valid" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ success: false, message: "tidak valid" });
		}

		const accessToken = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_ACCESS_TOKEN,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.JWT_REFRESH_TOKEN,
			{ expiresIn: "7d" }
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
		});

		res.status(200).json({
			success: true,
			message: "login berhasil",
			data: { accessToken: accessToken },
		});
	} catch (error) {
		console.log("Terjadi error", error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const logoutUser = async (req, res) => {
	const { refreshToken } = req.cookies;

	if (!refreshToken) {
		return res.sendStatus(204);
	}

	res.clearCookie("refreshToken", { httpOnly: true });
	res.status(200).json({success: true, message: "Berhasil Logout"})
};

export const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			res.status(400).json({
				success: false,
				message: "form tidak valid",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const response = await sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashedPassword})
            RETURNING username
         `;

		res.status(200).json({
			success: true,
			message:
				"Berhasil melakukan pendaftaran username : " +
				response[0].username,
			data: response[0],
		});
	} catch (error) {
		console.log("Terjadi error", error);
		res.status(500).json({
			success: false,
			message: error.detail,
		});
	}
};

export const handleRefreshToken = async (req, res) => {
	const { refreshToken } = req.cookies;

	if (!refreshToken) {
		res.status(401).json({
			success: false,
			message: "refresh token tidak ditemukan, harap login kembali",
		});
	}

	try {
		jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_TOKEN,
			async (err, decoded) => {
				if (err) {
					return res.status(401).json({
						success: false,
						message: "Refresh token tidak valid",
					});
				}

				const user = (
					await sql`
               SELECT * FROM users WHERE id=${decoded.id};
            `
				)[0];

				if (!user) {
					return res.status(401).json({
						success: false,
						message: "User tidak ditemukan",
					});
				}

				const accessToken = jwt.sign(
					{ id: user.id, username: user.username },
					process.env.JWT_ACCESS_TOKEN,
					{ expiresIn: "15m" }
				);

				res.status(200).json({
					success: true,
					message: "refresh token berhasil",
					data: {
						accessToken,
					},
				});
			}
		);
	} catch (error) {
		console.log("Refresh token error", error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
