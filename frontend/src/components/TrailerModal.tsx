// // import { useQuery } from "@tanstack/react-query";
// import { PlayIcon } from "lucide-react";
// // import { fetchMovieTrailers } from "../api/fetchMovies";

// export default function TrailerModal({movieId}:{movieId:string}) {
//    // const queryMovieTrailer = useQuery({
//    //    queryKey: ["movieTrailers", movieId],
//    //    queryFn: () => fetchMovieTrailers(movieId)
//    // })

//    // const trailerUrl = queryMovieTrailer.data?.data.results[0]


// 	return (
// 		<div>
// 			<button
// 				className="btn"
// 				onClick={() => {
// 					const modal = document.getElementById(
// 						"my_modal_2"
// 					) as HTMLDialogElement | null;
// 					if (modal) {
// 						modal.showModal();
// 					}
// 				}}
// 			>
// 				<PlayIcon size={20} /> Watch Trailer
// 			</button>
// 			<dialog id="my_modal_2" className="modal">
// 				<div className="relative w-full aspect-video">
					
// 				</div>
// 			</dialog>
// 		</div>
// 	);
// }
