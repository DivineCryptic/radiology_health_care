import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import React, { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { useBackPath } from "../../../../../modules/shared/BackButton";
import { formData, PatientData, Patientform } from "@/schema/patients";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DialogClose } from "@/components/ui/dialog";
import { createPatientAction } from "@/server_actions/actions/patient";
import { EmployeeData } from "@/schema/employees";

// type Patientform = {
//     name: string;
//     age: number;
//     gender: string;
//     dateOfBirth: string;
//     mobile: number;
//     relation: string;
//     employeeIdId: string;
//     employeeHisNoId: string;
//     employeeServiceNoId: string;
// }
const PatientForm = ({
  employees,
  patient,
  openModal,
  closeModal,
}: {
  employees: EmployeeData[];
  patient?: PatientData | null;
  openModal: (patient?: PatientData) => void;
  closeModal: () => void;
}) => {
  const [calcAge, setCalcAge] = useState(0);

  const form = useForm<Patientform>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      mobile: "",
      relation: "",
      employeeIdId: "",
      employeeHisNoId: "",
      employeeServiceNoId: "",
    },
  });
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<PatientData>(formData);

  const editing = !form.formState.isValid;

  const handleSubmit = async (data: Patientform) => {
    try {
      const payload = {
        name: data.name,
        age: calcAge,
        gender: data.gender,
        dateOfBirth: (data.dateOfBirth as Date).toISOString().split("T")[0],
        mobile: Number(data.mobile),
        relation: data.relation,
        employeeIdId: Number(data.employeeIdId),
        employeeHisNoId: data.employeeHisNoId,
        employeeServiceNoId: data.employeeServiceNoId,
      };
      console.log(payload);
      await createPatientAction(payload);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAge = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setCalcAge(age);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Age"
                      {...field}
                      value={calcAge.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown-buttons"
                        fromYear={1960}
                        toYear={2030}
                        onSelect={(value: any) => {
                          field.onChange(value);
                          handleAge(format(value, "yyyy-MM-dd"));
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relation</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a relation"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Self">Self</SelectItem>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Grandparent">Grandparent</SelectItem>
                      <SelectItem value="Grandchild">Grandchild</SelectItem>
                      <SelectItem value="Aunt">Aunt</SelectItem>
                      <SelectItem value="Uncle">Uncle</SelectItem>
                      <SelectItem value="Niece">Niece</SelectItem>
                      <SelectItem value="Nephew">Nephew</SelectItem>
                      <SelectItem value="Cousin">Cousin</SelectItem>
                      <SelectItem value="In-law">In-law</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeIdId"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel>Employee Id</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Employee Id" {...field} /> */}
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="select the employee"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem
                          key={employee.id}
                          value={employee.id.toString()}
                        >
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="employeeServiceNoId"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Employee Service No. </FormLabel>
                  <FormControl>
                    <Input placeholder="Employee Service No." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem />
            <FormField
              control={form.control}
              name="employeeHisNoId"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Employee Health Service Info</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem />
          </div>
          <SaveButton errors={hasErrors} editing={editing} />
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
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
