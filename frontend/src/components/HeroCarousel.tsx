import { useQuery } from "@tanstack/react-query";
import { fetchMovieLists } from "../api/fetchMovies";

export default function HeroCarousel() {
	const query = useQuery({
		queryKey: ["heroDisplayMovies"],
		queryFn: () => fetchMovieLists("popular"),
	});

	const movies = query.data?.data.results;

	return (
      <div className="w-full bg-base-200">
		<div className="h-full mx-auto">
			<div className=" carousel w-full aspect-video">
				{movies?.map((movie) => (
					<div className="carousel-item w-full" key={movie.id}>
						<img
							src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
							alt=""
							className="w-full"
						/>
					</div>
				))}
			</div>
		</div>
      </div>
	);
}
