/* eslint-disable no-unused-vars */
import {
  LayoutDashboard,
  Table2,
  Cross,
  Stethoscope,
  User,
  Star,
  File,
} from "lucide-react";

export const SidebarItems = [
  {
    ItemName: "Dashboard",
    Icon: LayoutDashboard,
    ItemPath: "/admin/dashboard",
  },
  {
    ItemName: "Appoinments",
    Icon: Table2,
    ItemPath: "/admin/appoinments",
  },
  {
    ItemName: "Specialities",
    Icon: Cross,
    ItemPath: "/admin/specialities",
  },
  {
    ItemName: "Doctors",
    Icon: Stethoscope,
    ItemPath: "/admin/doctors",
  },
  {
    ItemName: "Patients",
    Icon: User,
    ItemPath: "/admin/patients",
  },
  {
    ItemName: "Reviews",
    Icon: Star,
    ItemPath: "/admin/reviews",
  },
  {
    ItemName: "Reports",
    Icon: File,
    ItemPath: "/admin/reports",
  },
];
