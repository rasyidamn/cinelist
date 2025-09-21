import { useRef } from "react";
import { cn } from "../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Result } from "../api/fetchMovies";

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

	const Url =
		"https://plus.unsplash.com/premium_photo-1661675440353-6a6019c95bc7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	return (
		<div>
			<h2 className="text-2xl">{category}</h2>
			<div className="relative">
				<button
					className="absolute -left-3 top-20 cursor-pointer btn  btn-soft rounded-full btn-secondary py-1 px-2  z-50"
					onClick={scrollLeft}
				>
					<ArrowLeft />
				</button>

				<div
					className="carousel carousel-start bg-transparent rounded-box w-full space-x-4 p-4"
					ref={carouselRef}
				>
					{movies?.map((movie) => (
						<div className="carousel-item relative h-40 aspect-video rounded-box overflow-hidden cursor-pointer group  transition-transform" key={movie.id}>
							<img
								src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
								alt=""
								className="group-hover:scale-110 object-cover w-full h-full transition-transform duration-500 ease-in-out"
							/>

							<div className="absolute size-full bg-black flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out px-8">
								<h3 className="text-white text-lg font-bold">
									{movie.title}
								</h3>
							</div>
						</div>
					))}
				</div>

				<button
					className="absolute -right-3 top-20 cursor-pointer btn btn-soft rounded-full btn-secondary py-1 px-2 z-50"
					onClick={scrollRight}
				>
					<ArrowRight />
				</button>
			</div>
		</div>
	);
}
