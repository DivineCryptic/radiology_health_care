import PatientTestReport from "@/components/PatientTestReport";
import { EquipmentsData } from "@/schema/equipments";
import {
  IndividualPatientPageData,
  PatientTestsData,
} from "@/schema/patient-tests";
import { PatientData } from "@/schema/patients";
import { TestCategoryData } from "@/schema/testcategory";
import { getIndividualEquipment } from "@/server_actions/(get-requests)/getEquiments";
import { GetPatientInfo } from "@/server_actions/(get-requests)/getPatients";
import {
  getIndividualPatientTests,
  getIndividualTestId,
} from "@/server_actions/(get-requests)/getPatientTests";
// import { PatientTestsData } from "@/schema/patient-tests";

export default function IndividualPatientTestPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div>
      <IndividualPatientTests patientTestId={params.id} />
    </div>
  );
}

const IndividualPatientTests = async ({
  patientTestId,
}: {
  patientTestId: number;
}) => {
  //   const patientTestData: PatientTestsData =
  //     await fetchIndividualPatientTestsData(testId);
  const patientTestData: PatientTestsData = await getIndividualPatientTests(
    patientTestId
  );

  const childTestid = patientTestData.testCategoriesId;
  const patientInfoId = patientTestData.patientInfoId;
  const patientInfo: PatientData = await GetPatientInfo(patientInfoId);
  const testTemplate: TestCategoryData = await getIndividualTestId(childTestid);

  const parentTestid = testTemplate.parentTestCategoryId;

  const parentTestInfo: TestCategoryData = await getIndividualTestId(
    parentTestid
  );

  const equipmentId = testTemplate.equipmentId;

  const equipmentInfo:EquipmentsData = await getIndividualEquipment(equipmentId);

  const pageData: IndividualPatientPageData = {
    patientInfoId: patientInfo.id,
    name: patientInfo.name,
    age: patientInfo.age,
    gender: patientInfo.gender,
    mobile: patientInfo.mobile,
    relation: patientInfo.relation,
    id: patientTestData.id,
    priority: patientTestData.priority,
    status: patientTestData.status,
    clinicalNote: patientTestData.clinicalNote,
    spclInstruction: patientTestData.spclInstruction,
    startTime: patientTestData.startTime,
    endTime: patientTestData.endTime,
    recommendedDoctor: patientTestData.recommendedDoctor,
    initialPatientReport: testTemplate.patientReport,
    testCategoriesId: testTemplate.id,

    patientReport: patientTestData.patientReport,

    testName: testTemplate.testName,
    parentTestCategoryId: parentTestInfo.id,
    categoryName: parentTestInfo.testName,
    testDuration: testTemplate.testDuration,

    equipmentId: testTemplate.equipmentId,
    equipmentName: equipmentInfo.name,
  };
  // const testTemplate = await GetPatientReportTemplate()
  return (
    <div>
      {/* <pre>{JSON.stringify(patientTestData, null, 2)}</pre>
      <pre>{JSON.stringify(testTemplate, null, 2)}</pre>
      <pre>{JSON.stringify(patientInfo, null, 2)}</pre> */}

      <PatientTestReport pageData={pageData} />
    </div>
  );
};
