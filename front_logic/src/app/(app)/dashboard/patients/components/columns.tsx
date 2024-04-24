"use client"

import { Button } from "@/components/ui/button";
import DropDown from "@/modules/shared/DropDown";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { PatientData } from "@/schema/patients"
import { deletePatientAction } from "@/server_actions/actions/patient";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<PatientData>[] = [
  
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "age",
        header: "Age",
        
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
    },
    {
        accessorKey: "relation",
        header: "Relation",
    },
    {
        accessorKey: "actions",
        header: () => (
          <div className="flex justify-center ">
            <h1>Actions</h1>
          </div>
        ),
        cell: ({ row }) => {
          // const pathname = usePathname();
          // const basePath = pathname.includes("patients")
          //   ? pathname
          //   : pathname + "/patients/";
          const basepath=Pathname({prop:"patients"});
          const patients=row.original;
    
            return (
                <div className="flex flex-col items-center">
                    <DropDown name={{id:patients.id}} deletefunc={deletePatientAction} basepath={basepath}/>
                    {/* <EditButton prop={{id:patients.id}} basePath={basepath}/>
                    <Button 
                        // onClick={() => deletePatientTestsAction(patientTests.id)}
                        variant={"destructive"}
                    >
                        Delete
                    </Button> */}
                </div>
            )
        },
      },
    
   
]