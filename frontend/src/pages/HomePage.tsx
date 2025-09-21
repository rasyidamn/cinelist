import { useQuery } from "@tanstack/react-query";
import CarouserContainer from "../components/CarouserContainer";
import { fetchMovieLists, fetchTrendingMovies } from "../api/fetchMovies";
import HeroCarousel from "../components/HeroCarousel";

export default function HomePage() {
	const queryTrending = useQuery({
		queryKey: ["trendingMovies"],
		queryFn: fetchTrendingMovies,
	});
	const trendingMovies = queryTrending.data?.data.results;

	const queryInCinemas = useQuery({
		queryKey: ["inCinemasMovies"],
		queryFn: () => fetchMovieLists("now_playing"),
	});
	const inCinemasMovies = queryInCinemas.data?.data.results;

	console.log(trendingMovies);
	return (
		<div className="w-full max-w-7xl space-y-2">
			<HeroCarousel />
			<div className="px-4 sm:px-8">
				<CarouserContainer
					category="Trending"
					movies={trendingMovies}
				/>
				<CarouserContainer
					category="In Cinemas"
					movies={inCinemasMovies}
				/>
			</div>
		</div>
	);
}
