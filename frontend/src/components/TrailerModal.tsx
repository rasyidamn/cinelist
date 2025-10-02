import { useQuery } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { fetchMovieTrailers } from "../api/fetchMovies";

export default function TrailerModal({movieId}:{movieId:string}) {
   const queryMovieTrailer = useQuery({
      queryKey: ["movieTrailers", movieId],
      queryFn: () => fetchMovieTrailers(movieId)
   })

   const trailerUrl = queryMovieTrailer.data?.data.results[0]
   

	return (
		<div>
			<button
				className="btn"
				onClick={() => {
					const modal = document.getElementById(
						"my_modal_2"
					) as HTMLDialogElement | null;
					if (modal) {
						modal.showModal();
					}
				}}
			>
				<PlayIcon size={20} /> Watch Trailer
			</button>
			<dialog id="my_modal_2" className="modal">
				<div className="relative w-full aspect-video">
					{" "}
					{/* Gunakan aspect-video untuk rasio aspek 16:9 */}
					<iframe
						className="absolute top-0 left-0 w-full h-full rounded-lg"
						// src={embedUrl}
						// title={title} // Penting untuk aksesibilitas
						// frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			</dialog>
		</div>
	);
}
