import { IndividualPatientPageData } from "@/schema/patient-tests";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     border: "1px solid #ddd",
//     fontFamily: "monospace",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   testName: {
//     fontSize: 24,
//     fontWeight: 500,
//   },
//   category: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   duration: {
//     fontSize: 16,
//   },
//   recommendedBy: {
//     fontSize: 16,
//     display: "flex",
//     alignItems: "center",
//     gap: 5,
//   },
//   doctorName: {
//     fontWeight: 500,
//   },
//   dateSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: 5,
//     marginBottom: 10,
//   },
//   dateLabel: {
//     fontSize: 16,
//     fontWeight: 500,
//   },
//   dateValue: {
//     fontSize: 18,
//     fontWeight: 500,
//   },
//   timeSection: {
//     display: "flex",
//     alignItems: "center",
//   },
//   timeLabel: {
//     fontSize: 16,
//     fontWeight: 500,
//   },
//   timeRange: {
//     fontSize: 18,
//     fontWeight: 500,
//   },
//   patientInfo: {
//     display: "flex",
//     justifyContent: "space-between",
//     paddingVertical: 15,
//   },
//   patientDetails: {
//     fontSize: 16,
//   },
//   detailLabel: {
//     fontWeight: 500,
//   },
//   clinicalNote: {
//     display: "flex",
//     alignItems: "flex-start",
//     gap: 10,
//     marginBottom: 10,
//   },
//   clinicalNoteLabel: {
//     fontSize: 16,
//     fontWeight: 500,
//   },
//   clinicalNoteText: {
//     fontSize: 14,
//   },
//   specialInstructions: {
//     display: "flex",
//     alignItems: "flex-start",
//     gap: 10,
//   },
//   instructionsLabel: {
//     fontSize: 16,
//     fontWeight: 500,
//   },
//   instructionsText: {
//     fontSize: 14,
//   },
//   reportSection: {
//     padding: 10,
//     border: "1px solid #ddd",
//   },
//   reportContent: {
//     fontSize: 14,
//   },
// });
// const PdfFunction = ({ data }: { data: IndividualPatientPageData }) => (
//   <Document>
//     <Page style={styles.container}>
//       {/* Header (not included here) */}

//       <View style={styles.patientInfo}>
//         <View style={styles.patientDetails}>
//           <View style={styles.detailLabel}>
//             <Text>Patient Name:</Text>
//           </View>
//           <Text>{data.name}</Text>
//           <View style={styles.detailLabel}>
//             <Text>Age:</Text>
//           </View>
//           <Text>{data.age}</Text>
//           <View style={styles.detailLabel}>
//             <Text>Gender:</Text>
//           </View>
//           <Text>{data.gender}</Text>
//           <View style={styles.detailLabel}>
//             <Text>Mobile Number:</Text>
//           </View>
//           <Text>{data.mobile}</Text>
//           <View style={styles.detailLabel}>
//             <Text>Relation:</Text>
//           </View>
//           <Text>{data.relation}</Text>
//         </View>
//       </View>

//       <View style={styles.clinicalNote}>
//         <Text style={styles.clinicalNoteLabel}>Clinical Note:</Text>
//         <Text style={styles.clinicalNoteText}>
//           This is a clinical note for the patient. It should provide more
//           information about the patient's condition and any relevant details.
//         </Text>
//       </View>

//       <View style={styles.specialInstructions}>
//         <Text style={styles.instructionsLabel}>Special Instructions:</Text>
//         <Text style={styles.instructionsText}>
//           Please pay close attention to the patient's lower back region and
//           provide a detailed report on the findings.
//         </Text>
//       </View>

//       <View style={styles.reportSection}>
//         {data.patientReport === "" ? (
//           <Text style={styles.reportContent}>No Report Available</Text>
//         ) : (
//           <Text style={styles.reportContent}>{data.patientReport}</Text>
//         )}
//       </View>
//     </Page>
//   </Document>
// );

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  // toplowerheader: {
  //   fontSize: 30,

  // }
  sizeh1: {
    fontSize: 20,
    fontWeight: 300,
    margin: 10,
    padding: 10,
  },
  small: {
    fontSize: 20,
    marginTop: 20,
    marginRight: 20,
  },
  container: {
    margin: 10,
    padding: 10,
    border: "10px solid #ddd",

  }
});

// Create Document Component
const MyDocument = ({
  data,
  startTime,
}: {
  data: IndividualPatientPageData;
  startTime: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.section}>{data.testName}</Text>
        <View>
          <Text style={styles.small}>Date: {startTime}</Text>
        </View>
      </View>

      <View style={styles.sizeh1}>
        <Text> Name: {data.name}</Text>
        <Text> Age: {data.age}</Text>
        <Text> Gender: {data.gender}</Text>
        <Text> Mobile: {data.mobile}</Text>
        <Text> Relation:{data.relation}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.section}>Report</Text>

        <Text style={styles.section}>{data.patientReport}</Text>

      </View>
    </Page>
  </Document>
);
// export default PdfFunction;
export default MyDocument;
