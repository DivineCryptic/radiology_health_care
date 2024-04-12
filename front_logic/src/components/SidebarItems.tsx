"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SidebarLink {
  title: string;
  href: string;
  icon: LucideIcon;
}


const SidebarLink = ({
  link,
  active,
}: {
  link: SidebarLink;
  active: boolean;
}) => {
  return (
    <Link
      href={link.href}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
            active ? "opacity-100" : "",
          )}
        />
        <link.icon className="h-3.5 mr-1" />
        <span>{link.title}</span>
      </div>
    </Link>
  );
};
