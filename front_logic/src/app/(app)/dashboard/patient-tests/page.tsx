import Loading from "@/app/loading";
import { getPatientTests } from "@/server_actions/(get-requests)/getPatientTests";
import React, { Suspense } from "react";
import PatientTestsList from "./components/PatientTestsList";

const PatientTestsPage = () => {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Patient Tests</h1>
        </div>
        <PatientTests />
      </div>
    </main>
  );
};

export default PatientTestsPage;

const PatientTests = async () => {
    const patientTests = await getPatientTests();

  return (
    <Suspense fallback={<Loading />}>
      
      <PatientTestsList patientTests={patientTests} />
    </Suspense>
  );
};
