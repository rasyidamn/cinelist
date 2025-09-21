import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(" ")[1];

	jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
		if (err) {
			res.status(403).json({
				success: false,
				message: err.message,
			});
		}

		req.user = decoded;

		next();
	});
};
