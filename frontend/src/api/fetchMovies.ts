import axios from "axios";

export interface MovieApi {
	success: boolean;
	data: Data;
}

export interface Data {
	page: number;
	results: Result[];
	total_pages: number;
	total_results: number;
}

export interface Result {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTrendingMovies = async (): Promise<MovieApi> => {
	const { data } = await axios.get(`${BACKEND_URL}/api/movies/trending/week`);

	return data;
};

export const fetchMovieLists = async (
	category: "popular" | "now_playing" | "top_rated" | "upcoming"
): Promise<MovieApi> => {
	const { data } = await axios.get(
		`${BACKEND_URL}/api/movies/movie_lists/${category}`
	);

	return data;
};

export const fetchMoviesByGenre = async (
	genre_id: number
): Promise<MovieApi> => {
	const { data } = await axios.get(`${BACKEND_URL}/api/movies/discover`, {
		params: {
			with_genres: genre_id,
		},
	});

	return data;
};

export const fetchMovieDetails = async (movie_id: string): Promise<any> => {
	const { data } = await axios.get(`${BACKEND_URL}/api/movies/${movie_id}`);

	return data;
};

export const fetchMovieTrailers = async (movie_id: string): Promise<any> => {
	const { data } = await axios.get(
		`${BACKEND_URL}/api/movies/${movie_id}/videos`
	);
	return data;
};
