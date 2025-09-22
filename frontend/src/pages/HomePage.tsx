import { useQueries, useQuery } from "@tanstack/react-query";
import CarouserContainer from "../components/CarouserContainer";
import {
	fetchMovieLists,
	fetchMoviesByGenre,
	fetchTrendingMovies,
} from "../api/fetchMovies";
import HeroCarousel from "../components/HeroCarousel";
import { moviesByGenre } from "../constant/moviesByGenre";

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

	const movies_byGenre = useQueries({
		queries: moviesByGenre.map((genre) => {
			return {
				queryKey: ["moviesByGenre", genre.name],
				queryFn: () => fetchMoviesByGenre(genre.id),
			};
		}),
	});

	console.log(trendingMovies);
	return (
		<div className="w-full bg-base-200">
			<HeroCarousel />
			<div className="relative px-4 sm:px-8 md:-mt-24 z-40 bg-transparent md:top-2/3  space-y-8">
				<CarouserContainer
					category="Trending"
					movies={trendingMovies}
				/>
				<CarouserContainer
					category="In Cinemas"
					movies={inCinemasMovies}
				/>

				{movies_byGenre.map((query, index) => {
					const data = query.data?.data.results;
					const genre = moviesByGenre[index].name;
					return (
						<CarouserContainer
							category={genre}
							key={genre}
							movies={data}
						/>
					);
				})}
			</div>
		</div>
	);
}
