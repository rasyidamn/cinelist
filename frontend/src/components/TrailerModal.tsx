import { useQuery } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { fetchMovieTrailers } from "../api/fetchMovies";
import { useEffect, useRef, useState } from "react";

export default function TrailerModal({ movieId }: { movieId: string }) {
	const queryMovieTrailer = useQuery({
		queryKey: ["movieTrailers", movieId],
		queryFn: () => fetchMovieTrailers(movieId),
	});

	const trailerUrl = queryMovieTrailer.data?.data.results[0];
	const embedUrl = `https://www.youtube.com/embed/${trailerUrl?.key}`;

   const [activeUrl, setActiveUrl] = useState<string>("")
   const modalRef = useRef<HTMLDialogElement>(null)

   const openModal = () => {
      if(trailerUrl?.key) {

         setActiveUrl(embedUrl)
         modalRef.current?.showModal()
      }
   }

   const closeModal = () => {
      setActiveUrl("")
   }

   useEffect(() => {
      if(modalRef.current) {
         modalRef.current.addEventListener('close', closeModal)
      }
      return () => {
         modalRef.current?.removeEventListener('close', closeModal)
      }
   }, [modalRef])

	return (
		<div>
			<button
				className="btn"
				onClick={openModal}
			>
				<PlayIcon size={20} /> Watch Trailer
			</button>
			<dialog id="my_modal_2" className="modal" ref={modalRef}>
				<div className="modal-box w-2/3 max-w-5xl pt-10">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<div className="relative w-full aspect-video">
						<iframe
							className="absolute top-0 left-0 w-full h-full rounded-lg"
							src={activeUrl}
							// title={title} // Penting untuk aksesibilitas
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop ">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}
