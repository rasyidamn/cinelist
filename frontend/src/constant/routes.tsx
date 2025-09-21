import type { RouteObject } from "react-router";
import MainLayout from "../components/MainLayout";
import HomePage from "../pages/HomePage";
import WatchListsPage from "../pages/WatchListsPage";
import DiscoverPage from "../pages/DiscoverPage";
import NotFoundPage from "../pages/NotFoundPage";

export const ROUTES: RouteObject[] = [
   {
      path: "/",
      element: <MainLayout />,
      children: [
         {
            index: true,
            element: <HomePage />,
         },
         {
            path: "/watchlists",
            element: <WatchListsPage />
         }, 
         {
            path: "/discover",
            element: <DiscoverPage />
         },
         {
            path: "/*",
            element: <NotFoundPage />
         }
      ]
   }
]