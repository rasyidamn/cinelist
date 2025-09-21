import { HomeIcon, ListIcon, SearchIcon } from "lucide-react";


interface ItemMenu {
   path: string;
   title: string;
   icon?: any ;
}

export const navItems: ItemMenu[] = [
   {
      path: "/",
      title: "Home",
      icon: <HomeIcon size={20}/>
   },
   {
      path: "/discover",
      title: "Discover",
      icon: <SearchIcon size={20}/>
   },
   {
      path: "/watchlists",
      title: "Watch List",
      icon: <ListIcon size={20}/>
   },
] 