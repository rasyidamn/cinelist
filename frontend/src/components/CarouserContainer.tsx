import { useRef } from "react";
import type { Result } from "../api/fetchMovies";
import { SliderLeft, SliderRight } from "./CarouserSlider";

interface CarouserContainerProps {
	category: string;
	movies: Result[] | undefined;
}

export default function CarouserContainer({
	category,
	movies,
}: CarouserContainerProps) {

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
		<div>
			<h2 className="sm:text-3xl sm:font-semibold z-40">{category}</h2>
			<div className="relative">
				<SliderLeft handleClick={scrollLeft} className="-left-6"/>

				<div
					className="carousel carousel-start bg-transparent rounded-box w-full space-x-2 sm:space-x-6 p-4"
					ref={carouselRef}
				>
					{movies?.map((movie) => (
						<div
							className="carousel-item relative h-40 sm:h-72 aspect-poster rounded-box overflow-hidden cursor-pointer group  transition-transform"
							key={movie.id}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt=""
								className="group-hover:scale-110 object-cover w-full h-full transition-transform duration-500 ease-in-out"
							/>

							<div className="absolute size-full bg-black flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out px-8">
								<h3 className="text-white text-lg font-bold text-center">
									{movie.title}
									{` (${movie.release_date.split("-")[0]})`}
								</h3>
							</div>
						</div>
					))}
				</div>

				<SliderRight handleClick={scrollRight} className="-right-6" />
			</div>
		</div>
	);
}
