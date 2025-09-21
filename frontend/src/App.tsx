import { createBrowserRouter, RouterProvider } from "react-router";
import { ROUTES } from "./constant/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const router = createBrowserRouter(ROUTES);
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
