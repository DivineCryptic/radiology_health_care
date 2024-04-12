"use client";

import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { PatientTestsData } from "@/schema/patient-tests";
import { TestCategoryData } from "@/schema/testcategory";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";


export const columns: ColumnDef<TestCategoryData>[] = [
    {
        accessorKey: "Index",
        header: "Index", 
        cell: (info) => {
            return <div className="flex justify-center">{info.row.index + 1}</div>;
        }
    },
    {
        accessorKey: "testName",
        header: "Test Name",

    },
    {
        accessorKey: "equipmentId",
        header: "Equipment Id",
    },
    {
        accessorKey: "parentTestCategoryId",
        header: "Parent Test Category Id",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            // const pathname = usePathname();
            // const basePath = pathname.includes("patient-tests")
            //   ? pathname
            //   : pathname + "/patient-tests/";
            const basepath=Pathname({prop:"test-category"})
            const testcategory = row.original;
      
              return (
                  <div>
                      {/* <Button variant={"link"} asChild>
                          <Link href={basePath + "/" + patientTests.id}>Edit</Link> 
                      </Button> */}
                      <EditButton prop={{id:testcategory.id}} basePath={basepath}/>
                      <Button 
                          // onClick={() => deletePatientTestsAction(patientTests.id)}
                          variant={"destructive"}
                      >
                          Delete
                      </Button>
                  </div>
              )
          },
    }


]