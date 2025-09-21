import { Router } from "express";
import {
	getMovieDetails,
	getMovieImages,
	getMovieLists,
	getMovieRecommendations,
	getMovieSearch,
	getMovieVideos,
	getTrendingMovies,
} from "../controller/moviesController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

// static routes
router.get("/search", getMovieSearch);
router.get("/movie_lists/:category", getMovieLists);
router.get("/trending/:time_window", getTrendingMovies);

// dinamis routes
router.get("/:movie_id", getMovieDetails);
router.get("/:movie_id/videos", getMovieVideos);
router.get("/:movie_id/images", getMovieImages);
router.get("/:movie_id/recommendations", getMovieRecommendations);

export default router;
