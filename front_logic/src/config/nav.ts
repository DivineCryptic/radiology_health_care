import { SidebarLink } from "@/components/SidebarItems";
import { Boxes, Cog, Compass, Dice4, FlaskConical, Globe, HomeIcon, Shield, ShieldHalf, Syringe, Wrench } from "lucide-react";
import { Building, Accessibility } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard/patients", title: "Patients", icon: Accessibility },
  { href: "/dashboard/employees", title: "Employees", icon: Building },
  { href: "/dashboard/services", title: "Services", icon: Cog },
  { href: "/dashboard/ranks", title: "Ranks", icon: ShieldHalf },
  { href: "/dashboard/units", title: "Units", icon: Boxes },
  { href: "/dashboard/rooms", title: "Rooms", icon: Dice4 },
  { href: "/dashboard/patient-tests", title: "Patient Tests", icon: Syringe },
  { href: "/dashboard/equipments", title: "Equipments", icon: Wrench},
  { href: "/dashboard/test-categories", title: "Test Categories", icon: FlaskConical },
  { href: "/dashboard/equipment-mappings", title: "Equipment Mappings", icon:Compass  },
  

  // { href: "/dashboard/settings", title: "Settings", icon: Cog },
];

// export const additionalLinks: AdditionalLinks[] = [
//   {
//     title: "Entities",
//     links: [
//       {
//         href: "/emps",
//         title: "Emps",
//         icon: Globe,
//       },
//       {
//         href: "/employees",
//         title: "Employees",
//         icon: Globe,
//       },
//       {
//         href: "/units",
//         title: "Units",
//         icon: Globe,
//       },
//       {
//         href: "/ranks",
//         title: "Ranks",
//         icon: Globe,
//       },
//       {
//         href: "/services",
//         title: "Services",
//         icon: Globe,
//       },
//     ],
//   },

// ];
