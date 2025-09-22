import { useQuery } from "@tanstack/react-query";
import { fetchMovieLists } from "../api/fetchMovies";
import { SliderLeft, SliderRight } from "./CarouserSlider";
import { useRef } from "react";

export default function HeroCarousel() {
	const query = useQuery({
		queryKey: ["heroDisplayMovies"],
		queryFn: () => fetchMovieLists("popular"),
	});

	const movies = query.data?.data.results;

	

	const carouselRef = useRef<HTMLDivElement>(null);
		const scrollLeft = () => {
			if (carouselRef.current) {
				carouselRef.current.scrollBy({
					left: -100,
					behavior: "smooth",
				});
			}
		};
		const scrollRight = () => {
			if (carouselRef.current) {
				carouselRef.current.scrollBy({
					left: 300,
					behavior: "smooth",
				});
			}
		};

	return (
		<div className="w-full bg-base-200 z-30">
			<div className="relative ">
				<SliderLeft handleClick={scrollLeft} />
				<div className=" carousel w-full sm:aspect-hero" ref={carouselRef}>
					{movies?.map((movie) => (
						<div
							className="carousel-item w-full h-full  relative z-10"
							key={movie.id}
						>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
								alt=""
								className="w-full object-cover object-center"
							/>
							<div className="absolute flex w-full h-full items-center z-30">
								<div className="ml-10 sm:ml-20 sm:w-2/3 text-shadow-lg text-shadow-base-200 space-y-4">
									<h2 className="font-bold sm:text-6xl text-xl">{movie.title}</h2>
									<p className="hidden sm:block text-xl text-shadow-md text-shadow-base-200">{movie.overview}</p>
								</div>
							</div>
							<div className="absolute bottom-0 right-0 left-0 top-1/3 bg-gradient-to-t from-base-200 to-transparent hidden sm:block z-20"/>
						</div>
					))}
				</div>
				<SliderRight handleClick={scrollRight} className="right-0"/>
			</div>
		</div>
	);
}
