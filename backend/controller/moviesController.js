import axios from "axios";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

const tmdbApi = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Accept: "application/json",
		Authorization: ACCESS_TOKEN,
	},
});

export const getTrendingMovies = async (req, res) => {
	const { movieOrTv, time_window } = req.params;

	try {
		const response = await tmdbApi.get(
			`/trending/movie/${time_window}?language=en-US`
		);
		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(error.response.status).json({
			success: false,
			message: "Server error",
		});
	}
};

export const getMovieLists = async (req, res) => {
	const { category } = req.params; // now_playing, popular, top_rated, upcoming
	const { page } = req.query;

	try {
		const response = await tmdbApi.get(`/movie/${category}`, {
			params: {
				page: page || 1,
			},
		});

		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(error.response.status).json({success: false, message: "Server error"})
	}
};

export const getDiscoverMovie = async (req, res) => {
	const query = req.query

	try {
		const response = await tmdbApi.get(`/discover/movie`, {params:query})
		res.status(200).json({success: true, data: response.data})
	} catch (error) {
		res.status(error.response.status).json({success: false, message: "Server error"})
	}
}

export const getMovieDetails = async (req, res) => {
	const { movie_id } = req.params;
	const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
	const headers = {
		accept: "application/json",
		Authorization: ACCESS_TOKEN,
	};

	try {
		const response = await axios.get(url, { headers });
		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getMovieVideos = async (req, res) => {
	const { movie_id } = req.params;
	const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`;
	const headers = {
		accept: "application/json",
		Authorization: ACCESS_TOKEN,
	};
	try {
		const response = await axios.get(url, { headers });
		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getMovieImages = async (req, res) => {
	const { movie_id } = req.params;
	const url = `https://api.themoviedb.org/3/movie/${movie_id}/images`;
	const headers = {
		accept: "application/json",
		Authorization: ACCESS_TOKEN,
	};
	try {
		const response = await axios.get(url, { headers });
		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getMovieRecommendations = async (req, res) => {
	const { movie_id } = req.params;
	const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?language=en-US`;
	const headers = {
		accept: "application/json",
		Authorization: ACCESS_TOKEN,
	};
	try {
		const response = await axios.get(url, { headers });
		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getMovieSearch = async (req, res) => {
	const { query } = req.query;
	if (!query) {
		res.status(400).json({
			success: false,
			message: "query tidak boleh kosng",
		});
	}
	const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
	const headers = {
		accept: "application/json",
		Authorization: ACCESS_TOKEN,
	};
	try {
		const response = await axios.get(url, { headers });
		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
