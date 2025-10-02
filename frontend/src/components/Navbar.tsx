import { NavLink } from "react-router";
import BurgerMenu from "./BurgerMenu";
import { navItems } from "../constant/navItems.tsx";
import logo from "../assets/logo.png";
import { cn } from "../lib/utils";

export default function Navbar() {
	return (
		<nav className="flex w-full px-6 sm:h-16 z-50 justify-between sm:pl-4 sm:pr-10 h-14 shadow-xl sticky top-0 backdrop-blur-xl">
			<div className="flex  p-2 justify-start items-center w-32 sm:w-40 overflow-hidden">
				<NavLink to="/">
					<img src={logo} alt="" className="relative top-1" />
				</NavLink>
			</div>

			<div className="hidden sm:flex justify-center items-center sm:gap-6 lg:gap-10">
				{navItems.map((item) => (
					<NavLink
						to={item.path}
						key={item.title}
						className={({ isActive }) =>
							cn(
								"px-4 py-1 flex justify-center items-center gap-2 rounded-full hover:bg-primary/10 hover:text-secondary hover:translate-y-0.5 transition duration-300 ease-in-out",
								isActive ? "text-secondary bg-primary/20" : ""
							)
						}
					>
						{item.icon}
						{item.title}
					</NavLink>
				))}
			</div>

			<div className="hidden sm:flex justify-center items-center sm:gap-6 lg:gap-10">
				<button>log in</button>
			</div>

			<div className="flex sm:hidden p-2 justify-center items-center">
				<BurgerMenu />
			</div>
		</nav>
	);
}
