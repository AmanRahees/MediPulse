import {
  User,
  ClipboardPen,
  Bookmark,
  Lock,
  Wallet,
  LayoutDashboard,
  UserCog,
  Star,
  FileText,
  UsersRound,
  CalendarClock,
  LibraryBig,
} from "lucide-react";

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

export const doctortItems = [
  {
    title: "Dashboard",
    path: "/doctor/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Appointments",
    path: "/doctor/dashboard/appointments",
    icon: <ClipboardPen size={20} />,
  },
  {
    title: "My Patients",
    path: "/doctor/dashboard/my-patients",
    icon: <UsersRound size={20} />,
  },
  {
    title: "Schedule Timings",
    path: "/doctor/dashboard/timings",
    icon: <CalendarClock size={20} />,
  },
  {
    title: "Slots",
    path: "/doctor/dashboard/slots",
    icon: <LibraryBig size={20} />,
  },
  {
    title: "Invoices",
    path: "/doctor/dashboard/invoices",
    icon: <FileText size={20} />,
  },
  {
    title: "Reviews",
    path: "/doctor/dashboard/reviews",
    icon: <Star size={20} />,
  },
  {
    title: "Profile Settings",
    path: "/doctor/dashboard/profile",
    icon: <UserCog size={20} />,
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
