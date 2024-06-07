import { CircleUser, HospitalIcon, Menu, MenuIcon, Package2, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button";
  

const PatientDashboard = () => {
  return (
    <div>
        <header className="bg-green-600 text-white py-4 px-6 md:px-8 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <HospitalIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Radiology App</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="hover:underline" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Appointments
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Results
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
        </Button>
      </header>
      <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
    </div>
  );
};

export default PatientDashboard;
