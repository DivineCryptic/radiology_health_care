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
import { useBackPath } from "../../../../modules/shared/BackButton";
import {
  EquipmentsMappingData,
  EquipmentsMappingform,
  formData,
} from "@/schema/equipmentmapping";
import { DialogClose } from "@/components/ui/dialog";
import { EquipmentsData } from "@/schema/equipments";
import { EmployeeData } from "@/schema/employees";
import { createEquipmentMappingAction } from "@/server_actions/actions/equipmentsmapping";

const EquipmentsMappingForm = ({
  equipments,
  employees,
}: {
  equipments: EquipmentsData[];
  employees: EmployeeData[];
}) => {
  const { errors, hasErrors, handleChange, setErrors } =
    useValidatedForm<EquipmentsMappingData>(formData);
  const form = useForm<EquipmentsMappingform>({
    resolver: zodResolver(formData),
    defaultValues: {
      dateTime: "",
      equipmentId: "",
      employeeId: "",
    },
  });

  const editing = !form.formState.isValid;

  const handleSubmit = async (data: EquipmentsMappingform) => {
    try {
      const payload = {
        dateTime: `${data.dateTime}:00.000Z`,
        equipmentId: Number(data.equipmentId),
        employeeId: Number(data.employeeId),
      };
      console.log(payload);

      await createEquipmentMappingAction(payload);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="dateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Date Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the date time"
                    type="datetime-local"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="equipmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Equipment</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the equipment"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {equipments.map((equipment: EquipmentsData) => (
                        <SelectItem
                          key={equipment.id}
                          value={equipment.id.toString()}
                        >
                          {equipment.name}
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
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Employee</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employee"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.map((employee) => (
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
              </FormItem>
            )}
          />
          <SaveButton editing={editing} errors={hasErrors} />
        </form>
      </Form>
    </div>
  );
};

export default EquipmentsMappingForm;

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
