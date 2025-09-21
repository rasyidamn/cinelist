import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function MainLayout() {
	return (
		<div className="bg-base-200 max-w-screen min-h-screen font-outfit text-base overflow-clip">
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
