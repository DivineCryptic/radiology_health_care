"use client";
import { TestCategoryData } from "@/schema/testcategory";
import { deleteTestCategoryAction } from "@/server_actions/actions/testcategory";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<TestCategoryData>[] = [
  {
    accessorKey: "Index",
    header: "Index",
    cell: (info) => {
      return <div className="flex justify-center">{info.row.index + 1}</div>;
    },
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
    accessorKey: "testDuration",
    header: "Test Duration",
  },
  {
    accessorKey: "patientReport",
    header: () => (
      <div className="flex justify-center">Report Template Set or not</div>
    ),
    cell: ({ row }) => {
      const templateditEligibility = row.original.parentTestCategoryId;
      const templateReportTobefilled = row.original.patientReport;

      // if(!templateditEligibility) {
      //   return(
      //     <div>No Parent ID so it cannot be filled</div>
      //   )
      // }
      // if (templateditEligibility && templateReportTobefilled) {
      //   const isSet = false
      //   return(
      //     <div>Yes</div>
      //   )
      // }
      // if (templateditEligibility && !templateReportTobefilled) {
      //   return(
      //     <div>No</div>
      //   )
      // }

      return (
        <div className="flex justify-center">
          {templateditEligibility ? (
            templateReportTobefilled ? (
              <div>Yes (Edit)</div>
            ) : (
              <div>No (Add)</div>
            )
          ) : (
            <div>No Parent ID so it cannot be filled</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="flex justify-center">
        <h1>Actions</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div>
          <DataTableRowActions row={row} />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     // const pathname = usePathname();
  //     // const basePath = pathname.includes("patient-tests")
  //     //   ? pathname
  //     //   : pathname + "/patient-tests/";
  //     const basepath = Pathname({ prop: "test-categories" });
  //     const testcategory = row.original;

  //     return (
  //       <div>
  //         {/* <Button variant={"link"} asChild>
  //                         <Link href={basePath + "/" + patientTests.id}>Edit</Link>
  //                     </Button> */}
  //         <DropDown
  //           name={{ id: testcategory.id }}
  //           deletefunc={deleteTestCategoryAction}
  //           basepath={basepath}
  //         />
  //         {/* <EditButton prop={{id:testcategory.id}} basePath={basepath}/>
  //                     <Button
  //                         onClick={() => deleteTestCategoryAction(testcategory.id)}
  //                         variant={"destructive"}
  //                     >
  //                         Delete
  //                     </Button> */}
  //       </div>
  //     );
  //   },
  // },
];
