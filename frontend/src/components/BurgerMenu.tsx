import { MenuIcon, XIcon } from "lucide-react";
import { useMenuStore } from "../store/useMenuStore";
import { cn } from "../lib/utils";
import { navItems } from "../constant/navItems.tsx";
import { NavLink } from "react-router";

export default function BurgerMenu() {
	const { isMenuOpen, toggleMenu } = useMenuStore();
	return (
		<button onClick={toggleMenu}>
			{isMenuOpen ? <XIcon /> : <MenuIcon />}
			<div
				className={cn(
					isMenuOpen ? "translate-x-0" : "translate-x-full ",
					"w-full h-screen bg-base-100/95 fixed top-14 left-0 transition duration-500 ease-in-out z-40 sm:hidden",
					"py-20 px-10 flex flex-col gap-2 items-center"
				)}
			>
				{navItems.map((item) => (
					<NavLink
						to={item.path}
						key={item.title}
						className={({ isActive }) => cn("w-1/2 active:bg-secondary/30 p-4 rounded-2xl", isActive ? "bg-secondary/30" : "")}
					>
						{item.title}
					</NavLink>
				))}
			</div>
		</button>
	);
}
