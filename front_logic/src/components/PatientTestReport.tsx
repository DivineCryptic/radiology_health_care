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

export default function PatientTestReport({
  pageData,
}: {
  pageData: IndividualPatientPageData;
}) {
  const data: IndividualPatientPageData = pageData;
  const [openReport, setOpenReport] = useState(false);

  const date = new Date();
  //pretify the date
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
  });

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

  return (
    <main>
      <Button
        // onClick={}
        onClick={() => router.push("/dashboard/patient-tests")}
        className="m-5"
      >
        Back
      </Button>
      <div className="space-y-4 container">
        <div className="flex justify-between items-center">
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
          <Button onClick={() => setOpenReport(true)}>
            Change Patient Report
          </Button>
          <div>
            <div>
              {/* (selector functionality not yet implemented) */}
              <div className="">
                <Button className="" variant={"outline"}>
                  <Badge>{data.status}</Badge>
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
                <span className="font-bold ">Clinical Note:</span>
                <span>
                  This is a clinical note for the patient. It should provide
                  more information about the patient's condition and any
                  relevant details.
                </span>
              </div>
              <div className="flex-1 text-xl flex flex-row gap-4">
                <Separator orientation="vertical" />
                <div>
                  <span className="font-bold ">Special Instructions:</span>
                  <span>
                    Please pay close attention to the patient's lower back
                    region and provide a detailed report on the findings.
                  </span>
                </div>
              </div>
            </div>
            <div className="container border-2 ">
              {data.patientReport === "" ? (
                <h3>no Report</h3>
              ) : (
                <h3> Report is there</h3>
              )}
              {parsedReport}
              {parsedPatientReport}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
