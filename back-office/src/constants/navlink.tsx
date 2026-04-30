import { IconType } from "react-icons";
import {
  MdDashboard,
  MdPersonAdd,
  MdPeople,
  MdRefresh,
  MdHandshake,
  MdArticle,
  MdCategory,
  MdEvent,
  MdLayers,
} from "react-icons/md";
``;

export type NavLink = {
  name: string;
  url: string;
  icon: IconType;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    links: [{ name: "Dashboard", url: "/", icon: MdDashboard }],
  },
  {
    label: "Members",
    links: [
      { name: "New Members", url: "/new-members", icon: MdPersonAdd },
      { name: "Member Lists", url: "/member-lists", icon: MdPeople },
      { name: "Request Update", url: "/member-request", icon: MdRefresh },
    ],
  },
  {
    label: "Content",
    links: [
      { name: "Categories", url: "/categories", icon: MdCategory },
      { name: "Posts", url: "/posts", icon: MdArticle },
      { name: "Events", url: "/events", icon: MdEvent },
    ],
  },
  {
    label: "Partners",
    links: [
      { name: "Category Partners", url: "/category-partners", icon: MdLayers },
      { name: "Value Partners", url: "/value-partners", icon: MdHandshake },
    ],
  },
];

// Keep backward compat for anything still importing navLinks
export const navLinks = navGroups.flatMap((g) => g.links);
