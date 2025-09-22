import { ChevronLeft, ChevronRight } from "lucide-react";


export const SliderLeft = ({ handleClick, className }: { handleClick: () => void, className?:string }) => {
	return (
		<button
			className={`absolute  top-2/5 size-8 sm:size-10 cursor-pointer btn btn-soft rounded-full btn-secondary py-1 px-2 z-50 hidden sm:block ${className}`}
			onClick={handleClick}
		>
			<ChevronLeft />
		</button>
	);
};

export const SliderRight = ({ handleClick, className }: { handleClick: () => void, className?:string }) => {
	return (
		<button
			className={`absolute  top-2/5 size-8 sm:size-10 cursor-pointer btn btn-soft rounded-full btn-secondary py-1 px-2 z-50 hidden sm:block ${className}`}
			onClick={handleClick}
		>
			<ChevronRight />
		</button>
	);
};
