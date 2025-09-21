import { useQuery } from "@tanstack/react-query";
import CarouserContainer from "../components/CarouserContainer";
import { fetchTrendingMovies } from "../api/fetchMovies";

export default function HomePage() {
	const query = useQuery({
		queryKey: ["trendingMovies"],
		queryFn: fetchTrendingMovies,
	});

	const trendingMovies = query.data?.data.results;
	console.log(trendingMovies);
	return (
		<div className="w-full max-w-7xl py-6 px-4 sm:px-8 mx-auto space-y-2">
			<CarouserContainer category="Trending" movies={trendingMovies} />
			<CarouserContainer category="Trending" movies={trendingMovies} />
		</div>
	);
}
