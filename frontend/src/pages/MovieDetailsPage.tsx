import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../api/fetchMovies";
import { StarIcon } from "lucide-react";
// import TrailerModal from "../components/TrailerModal";

export default function MovieDetailsPage() {
	const { movie_id } = useParams<{ movie_id: string }>();

	const queryMovieDetails = useQuery({
		queryKey: ["movie_details", movie_id],
		queryFn: () => fetchMovieDetails(movie_id!),
		enabled: !!movie_id,
	});

	const movieDetails = queryMovieDetails.data?.data;

	return (
		<div>
			<div>
				{/* Hero section */}
				<div className="relative w-full aspect-hero">
					<img
						src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
						alt=""
						className="object-cover object-top w-full h-full"
					/>
					<div className="absolute inset-0 flex bg-base-100/85 items-center justify-center p-10">
						<div className="aspect-poster w-72 shrink-0 rounded-2xl overflow-hidden">
							<img
								src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
								alt=""
								className="object-cover w-full h-full"
							/>
						</div>
						<div className="py-10 px-6 space-y-4">
							<div>
								<h1 className="text-5xl font-semibold">
									{movieDetails?.title}{" "}
									{`(${
										movieDetails?.release_date.split("-")[0]
									})`}
								</h1>
								<p className="text-base-content/60">
									{movieDetails?.genres
										.map(
											(genre: { name: string }) =>
												genre.name
										)
										.join(", ")}
								</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex gap-2">
									<StarIcon className="text-amber-300" />{" "}
									{movieDetails?.vote_average}
								</div>
                        {/* <TrailerModal movieId={movieDetails?.id}/> */}
							</div>
							<div>
								<p className="text-lg">
									{movieDetails?.tagline}
								</p>
                        <p className="text-sm font-light ">
                           {movieDetails?.overview}                                 
                        </p>
							</div>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
}
