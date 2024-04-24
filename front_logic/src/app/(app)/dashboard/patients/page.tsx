import { getPatients } from "@/server_actions/(get-requests)/getPatients";
import React, { Suspense } from "react";
import Loading from "@/app/loading";
import PatientList from "./components/PatientList";
import { getEmployees } from "@/server_actions/(get-requests)/getEmployees";

const PatientPage = () => {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Patients</h1>
        </div>
        <Patients />
      </div>
    </main>
  );
};

export default PatientPage;

const Patients = async () => {


  const patients = await getPatients();
  const employees = await getEmployees()
  return (
    <Suspense fallback={<Loading />}>

      <PatientList patients={patients} employees={employees} />
    </Suspense>
  );
};
