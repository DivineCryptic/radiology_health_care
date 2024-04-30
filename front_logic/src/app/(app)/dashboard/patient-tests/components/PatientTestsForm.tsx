import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useValidatedForm } from "@/hooks/useValidatedForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { useBackPath } from "../../../../../modules/shared/BackButton";
import { DialogClose } from "@/components/ui/dialog";
import {
  formData,
  PatientTestsDataForm,
  PatientTestsform,
} from "@/schema/patient-tests";
import { Textarea } from "@/components/ui/textarea";
import { TestCategoryData } from "@/schema/testcategory";
import { PatientData } from "@/schema/patients";

import { createPatientTestsAction } from "@/server_actions/actions/patient-tests";


const PatientTestsForm = ({
  patients,
  activePatient,
  tests,
}: {
  patients: PatientData[];
  activePatient?: PatientData | null;
  tests: TestCategoryData[];
}) => {
  

  const { errors, hasErrors, handleChange, setErrors } =
    useValidatedForm<PatientTestsDataForm>(formData);

  const [selectedDate, setSelectedDate] = useState("");

  const form = useForm<PatientTestsform>({
    resolver: zodResolver(formData),
    defaultValues: {
      startTime: "",
      status: "",
      priority: "",
      clinicalNote: "",
      spclInstruction: "",
      patientInfoId: "0",
      testCategoriesId: "0",
    },
  });

  const editing = !form.formState.isValid;

  const handleSubmit = async (data: PatientTestsform) => {
    try {
      const payload = {
        status: data.status,
        priority: data.priority,
        clinicalNote: data.clinicalNote,
        spclInstruction: data.spclInstruction,
        patientInfoId: Number(data.patientInfoId),
        testCategoriesId: Number(data.testCategoriesId),
        startTime: new Date(`${selectedDate}T${data.startTime}:00.000Z`),
      };

      await createPatientTestsAction(payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("date");

    if (storedDate) {
      setSelectedDate(storedDate);
    }
  }, []);

  return (
    <div className=" mr-10 ml-5">
      <div className=" mt-5 rounded-md font-bold text-xl">
        Date : {selectedDate}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex gap-5">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="patientInfoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Info</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Patient"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {patients?.map((patient) => (
                            <SelectItem
                              key={patient.id}
                              value={patient.id.toString()}
                            >
                              {patient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="testCategoriesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please select the test category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Test Category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {tests?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.testName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="appointed">Appointed</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                          <SelectItem value="progressing">
                            Test In Progress
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Please enter the date and time for your tests
                    </FormLabel>
                    <FormControl className="w-56">
                      <Input
                        placeholder="Enter Start Time"
                        type="time"
                        {...field}
                        // Use the stored date
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
           
          </div>

          <FormField
            control={form.control}
            name="clinicalNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clinical Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Clinical Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spclInstruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instruction</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Special Instruction"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SaveButton editing={editing} errors={hasErrors} />
        </form>
      </Form>
    </div>
  );
};

export default PatientTestsForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing?: boolean;
  errors?: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;

  return (
    <div className="mt-4">
      {editing ? (
        <div>
          <Button
            type="submit"
            className="w-64"
            disabled={isCreating || isUpdating || errors}
            aria-disabled={isCreating || isUpdating || errors}
          >
            {editing
              ? `Sav${isUpdating ? "ing..." : "e"}`
              : `Creat${isCreating ? "ing..." : "e"} `}
          </Button>
        </div>
      ) : (
        <div>
          <DialogClose asChild>
            <div>
              <Button
                type="submit"
                className="w-64"
                disabled={isCreating || isUpdating || errors}
                aria-disabled={isCreating || isUpdating || errors}
              >
                {editing
                  ? `Sav${isUpdating ? "ing..." : "e"}`
                  : `Creat${isCreating ? "ing..." : "e"} `}
              </Button>{" "}
            </div>
          </DialogClose>
        </div>
      )}
    </div>
  );
};
