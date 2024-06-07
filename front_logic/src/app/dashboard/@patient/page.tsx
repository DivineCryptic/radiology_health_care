import Loading from "@/app/loading";
import PatientDashboard from "@/components/PatientDashboard";
import React, { Suspense } from "react";

const PatientDashboardPage = () => {
  return <div>
    <PatientDashboardCompoent />
  </div>;
};

export default PatientDashboardPage;

const PatientDashboardCompoent = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <PatientDashboard />
    </Suspense>
  );
};
