"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Modal from "@/modules/shared/Modal";

export default function PatientTestReport() {
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

  return (
    <main>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Modal open={openReport} setOpen={setOpenReport} title="Report">
            <div>
              Calling the report page
            </div>
          </Modal>
            <Button onClick={() => setOpenReport(true)}>Add Patient Report</Button>
          {/* <Button onClick={() => generatePDF(getTargetElement,options)}>Print</Button> */}
        </div>
        <div id="target" className="container">
          <div className="rounded-lg border  bg-white p-6">
            <div className="flex justify-between ">
              <h2 className="text-5xl font-medium  ">MRI Scan</h2>

              <div className="flex items-center gap-2">
                <Separator orientation="vertical" />
                <h2 className="text-2xl font-medium ">Date:</h2>
                <span className="text-xl font-medium">{formattedDate}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex ">
              <div>
                <div className="text-lg">
                  <div className="flex gap-2 ">
                    <span className="font-medium">Patient Name:</span>
                    <span>John Doe</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-medium">Age:</span>
                    <span>20</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-medium">Gender:</span>
                    <span>Male</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-medium">Mobile Number:</span>
                    <span>9330438158</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-medium">Relation:</span>
                    <span>Self</span>
                  </div>
                  <Separator />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl">Clinical Note:</span>
                    <span>
                      This is a clinical note for the patient. It should provide
                      more information about the patient's condition and any
                      relevant details.
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-lg">
                <div className="flex gap-2">
                  <span className="font-bold">Recommended Doctor:</span>
                  <span>Dr.</span> <span>Jane Smith</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Special Instructions:</span>
                  <span>
                    Please pay close attention to the patient's lower back
                    region and provide a detailed report on the findings.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
