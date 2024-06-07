import PatientTestReport from "@/components/PatientTestReport";
// import { PatientTestsData } from "@/schema/patient-tests";

export default function IndividualPatientTestPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div>

      <IndividualPatientTests testId={params.id} />
    </div>
  );
}

const IndividualPatientTests = async ({ testId }: { testId: number }) => {
//   const patientTestData: PatientTestsData =
//     await fetchIndividualPatientTestsData(testId);

// const testTemplate = await GetPatientReportTemplate()
  return (
    <div>
      {testId}
      <PatientTestReport />
    </div>
  );
};
