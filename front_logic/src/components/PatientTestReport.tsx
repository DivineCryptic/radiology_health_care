"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Modal from "@/modules/shared/Modal";
import { IndividualPatientPageData } from "@/schema/patient-tests";
import { Badge } from "./ui/badge";

import parse from "html-react-parser";
import TemplateAdd from "./TemplateAdd";
import PatientReport from "./PatientReport";
import { useRouter } from "next/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import PdfFunction from "./PdfFunction";
import MyDocument from "./PdfFunction";
import { Edit, Edit2 } from "lucide-react";
import EditSpecialInstructionForm from "@/app/dashboard/@admin/patient-tests/components/EditSpclForm";
import EditClinicalForm from "@/app/dashboard/@admin/patient-tests/components/EditClinicalForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function PatientTestReport({
  pageData,
}: {
  pageData: IndividualPatientPageData;
}) {
  const data: IndividualPatientPageData = pageData;
  const [openReport, setOpenReport] = useState(false);
  const [openSpecial, setOpenSpecial] = useState(false);
  const [openClinical, setOpenClinical] = useState(false);

  const date = new Date();
  //pretify the date

  const startTime = new Date(data.startTime);
  const DateView = startTime.toString().slice(0, 15);
  const StartTime = startTime.toString().slice(16, 21);
  const endTime = new Date(data.endTime);
  const EndTime = endTime.toString().slice(16, 21);

  const [reportfilled, setReportfilled] = useState(false);

  const changeClasstoClassName = (content: string) => {
    const regex = /class/gi;
    return content.replace(regex, "className");
  };
  const [openpdfreport, setOpenpdfreport] = useState(false);
  const router = useRouter();
  const report = changeClasstoClassName(data.initialPatientReport || "");
  const parsedReport = parse(report);
  const patientReport = changeClasstoClassName(data.patientReport || "");

  const parsedPatientReport = parse(patientReport);

  const reportSubmitAndEdit = {
    id: data.id,
    patientInfoId: data.patientInfoId,
    testCategoriesId: data.testCategoriesId,
    patientReport: data.patientReport || data.initialPatientReport || "",
  };

  const payloadClincal = {
    id: data.id,
    patientInfoId: data.patientInfoId,
    testCategoriesId: data.testCategoriesId,
    clinicalNote: data.clinicalNote,
  };

  const payloadSpecial = {
    id: data.id,
    patientInfoId: data.patientInfoId,
    testCategoriesId: data.testCategoriesId,
    spclInstruction: data.spclInstruction,
  };

  // const patientReportTopdf =

  return (
    <main>
      <Modal
        open={openReport}
        setOpen={setOpenReport}
        title="Report"
        className="max-w-[700px]"
      >
        {/* <TemplateAdd
              id={data.testCategoriesId}
              reportTemplate={data.initialPatientReport || ""}
            /> */}
        <PatientReport report={reportSubmitAndEdit} />
      </Modal>
      <Modal
        open={openSpecial}
        setOpen={setOpenSpecial}
        title="Special Instructions"
      >
        <EditSpecialInstructionForm payload={payloadSpecial} />
      </Modal>

      <Modal open={openClinical} setOpen={setOpenClinical} title="Clincal Note">
        <EditClinicalForm payload={payloadClincal} />
      </Modal>
      <Modal
        open={openpdfreport}
        setOpen={setOpenpdfreport}
        title="Report"
        className="sm:max-w-[425px] min-w-[900px] min-h-[500px] "
      >
        <PDFViewer width={800} height={600}>
          <MyDocument startTime={StartTime} data={pageData} />
        </PDFViewer>
      </Modal>

      {/* View */}
      <Button
        // onClick={}
        onClick={() => router.push("/dashboard/patient-tests")}
        className="m-5"
      >
        Back
      </Button>
      <div className="space-y-4 container">
        <div className="flex justify-between items-center">
          <Button onClick={() => setOpenReport(true)}>
            Change Patient Report
          </Button>
          <div>
            <div>
              {/* (selector functionality not yet implemented) */}
              <div className="">
                <Button className="" variant={"outline"}>
                  {data.status}
                </Button>
              </div>
            </div>
          </div>

          {/* <Button onClick={() => generatePDF(getTargetElement,options)}>Print</Button> */}
        </div>
        <div id="target" className="container">
          <div className="rounded-lg border  bg-white p-6 font-mono">
            <div className="flex justify-between ">
              <div className="flex items-start flex-col">
                <h2 className="text-5xl font-medium  ">{data.testName}</h2>
                <div className="text-lg  ml-1">
                  <h3>{data.categoryName}</h3>
                  <h3>Average Test Duration: {data.testDuration} minutes</h3>
                </div>
                <div className="flex gap-3 text-lg ">
                  <h4>Recommended By:</h4>
                  <span>Dr. {data.recommendedDoctor}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Separator orientation="vertical" />
                <div>
                  <div className="flex items-center gap-2 justify-center ">
                    <h2 className="text-2xl font-medium ">Date:</h2>
                    <span className="text-xl font-medium">{DateView}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2 justify-start ">
                    <h2 className="text-2xl font-medium ">Time:</h2>
                    <span className="text-xl font-medium">
                      {StartTime} - {EndTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="" />

            <div className="flex justify-between py-5">
              <div className="flex-1 text-xl">
                <div className="flex gap-2 ">
                  <span className="font-medium">Patient Name:</span>
                  <span className="capitalize text-lg">{data.name}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium">Age:</span>
                  <span>{data.age}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium">Gender:</span>
                  <span className="capitalize">{data.gender}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium">Mobile Number:</span>
                  <span>{data.mobile}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-medium">Relation:</span>
                  <span>{data.relation}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="my-3 flex">
              <div className="gap-3 text-lg flex-1">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between gap-2">
                    <span className="font-bold ">Clinical Note:</span>
                    <div
                      onClick={() => setOpenClinical(true)}
                      className="cursor-pointer hover:text-green-500"
                    >
                      <Edit2 />
                    </div>
                  </div>
                  <span>{data.clinicalNote}</span>
                </div>
              </div>
              <div className="flex-1 text-xl flex flex-row gap-4 ">
                <Separator orientation="vertical" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between gap-2">
                    <span className="font-bold ">Special Instructions:</span>
                    <div
                      onClick={() => setOpenSpecial(true)}
                      className="cursor-pointer hover:text-green-500"
                    >
                      <Edit2 />
                    </div>
                  </div>
                  <span>{data.spclInstruction}</span>
                </div>
              </div>
            </div>
            {data.patientReport === "" ? (
              <h3>no Report</h3>
            ) : (
              <h3> Report is there</h3>
            )}
            <Card>
              <CardHeader>
                <CardTitle>Patient Report</CardTitle>
              </CardHeader>
              <CardContent>{parsedPatientReport}</CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Button className="mt-4" onClick={() => setOpenpdfreport(true)}>
        Open Report
      </Button>
      {/* <div className="flex justify-center">
      <PDFViewer width={800} height={600}>
          <MyDocument startTime={StartTime} data={pageData}/>
        </PDFViewer>
      </div> */}
    </main>
  );
}
