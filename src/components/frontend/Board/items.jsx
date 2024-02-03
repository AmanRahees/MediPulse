import { User, ClipboardPen, Bookmark, Lock, Wallet } from "lucide-react";

export const patientItems = [
  {
    title: "Profile",
    path: "/profile",
    icon: <User size={20} />,
  },
  {
    title: "Appointments",
    path: "/profile/appointments",
    icon: <ClipboardPen size={20} />,
  },
  {
    title: "Favourites",
    path: "/profile/favourites",
    icon: <Bookmark size={20} />,
  },
  {
    title: "Wallet",
    path: "/profile/wallet",
    icon: <Wallet size={20} />,
  },
  {
    title: "Change Password",
    path: "/profile/change-password",
    icon: <Lock size={20} />,
  },
];
