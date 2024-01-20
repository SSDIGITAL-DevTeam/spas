import { StaticImageData } from "next/image";
import AssetDashboard from "@/assets/svg/dashboard.svg";
import AssetPosts from "@/assets/svg/posts.svg";
import AssetPages from "@/assets/svg/pages.svg";
import AssetSources from "@/assets/svg/sources.svg";

export type NavLink = {
	name: string;
	url: string;
	icon: StaticImageData;
};

export const navLinks: NavLink[] = [
	{
		name: "Dashboard",
		url: "/",
		icon: AssetDashboard,
	},
	{
		name: "Posts",
		url: "/posts",
		icon: AssetPosts,
	},
	{
		name: "Category",
		url: "/categories",
		icon: AssetSources,
	},
	{
		name: "Events",
		url: "/events",
		icon: AssetSources,
	},
	{
		name: "Pages",
		url: "/pages",
		icon: AssetPages,
	},
];
