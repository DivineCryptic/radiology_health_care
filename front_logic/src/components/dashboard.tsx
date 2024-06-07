"use client";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TransformPatientTestsData } from "@/schema/patient-tests";
import { TestCategoryData } from "@/schema/testcategory";
import { PatientData } from "@/schema/patients";
import MetricCard from "./MetricCard";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import PatientTestsList from "@/app/dashboard/@admin/patient-tests/components/PatientTestsList";

function Dashboard({
  patientTests,
  tests,
  patients,
}: {
  patientTests: TransformPatientTestsData[];
  tests: TestCategoryData[];
  patients: PatientData[];
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 ">
      {/* <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols- xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Add New Patients</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    To add patients ,click on the button
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Add Patient</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>
                    This Week Patients Appointed
                  </CardDescription>
                  <CardTitle className="text-4xl">257</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>
                    This Month Patients Appointed
                  </CardDescription>
                  <CardTitle className="text-4xl">1126</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 gap-1 text-sm"
                        >
                          Metric
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side={"right"}
                        className="max-w-2xl overflow-y-scroll"
                      >
                        <SheetHeader>
                          <SheetTitle>Edit profile</SheetTitle>
                          <SheetDescription>The metrics</SheetDescription>
                        </SheetHeader>
                        <MetricCard />
                        <SheetFooter className="mt-4">
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                    {/* <MetricCard /> */}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Patient Tests for Today</CardTitle>
                    <CardDescription>
                      Patient tests for the day of{" "}
                      {new Date().toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    {/* patient tests being rendered */}
                    <PatientTestsList
                      patientTests={patientTests}
                      tests={tests}
                      patients={patients}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
