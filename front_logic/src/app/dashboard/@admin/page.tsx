import React, { Suspense } from "react";
import { getPatientTests } from "@/server_actions/(get-requests)/getPatientTests";
import Loading from "@/app/loading";
import { getPatients } from "@/server_actions/(get-requests)/getPatients";
import { getChildTestCategories } from "@/server_actions/(get-requests)/getChildTests";

import {
  PatientTestsData,
  TransformPatientTestsData,
} from "@/schema/patient-tests";
import { getTestCategories } from "@/server_actions/(get-requests)/getTestCategories";
import { TestCategoryData } from "@/schema/testcategory";
import { PatientData } from "@/schema/patients";
import Dashboard from "@/components/dashboard";

const AdminDashboardsPage = () => {
  return (
    <>
      <DashboardComponent />
    </>
  );
};

export default AdminDashboardsPage;

const DashboardComponent = async () => {
  const patientTestsInfo = await getPatientTests();

  const patientInfo = await getPatients();
  const testsInfo = await getTestCategories();
  const childTestsInfo = await getChildTestCategories();

  const testMap = new Map<number, string>(
    testsInfo.map((testinfo: TestCategoryData) => [
      testinfo.id,
      testinfo.testName,
    ])
  );

  const patientMap = new Map<number, string>(
    patientInfo.map((patientInfo: PatientData) => [
      patientInfo.id,
      patientInfo.name,
    ])
  );
  const transformPatientTestsData = (
    patientTest: PatientTestsData,
    patientMap: Map<number, string>,
    testMap: Map<number, string>
  ): TransformPatientTestsData => {
    const transformedPatientTest: TransformPatientTestsData = {
      ...patientTest,
      patientName: patientMap.get(patientTest.patientInfoId) || "",
      testName: testMap.get(patientTest.testCategoriesId) || "",
    };

    return transformedPatientTest;
  };

  const transformedPatientTests: TransformPatientTestsData[] =
    patientTestsInfo.map((patientTest: PatientTestsData) =>
      transformPatientTestsData(patientTest, patientMap, testMap)
    );

  return (
    <Suspense fallback={<Loading />}>
      this is the admin dashboard
      
      <Dashboard  patientTests={transformedPatientTests} patients={patientInfo} tests={childTestsInfo}  />
    </Suspense>
  );
};
