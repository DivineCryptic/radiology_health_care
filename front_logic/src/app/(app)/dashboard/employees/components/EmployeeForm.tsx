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
import { EmployeeData, Employeeform, formData } from "@/schema/employees";
import { ServiceData } from "@/schema/services";
import { RankData } from "@/schema/ranks";
import { UnitData } from "@/schema/units";
import { Checkbox } from "@/components/ui/checkbox";
import { createEmployeeAction } from "@/server_actions/actions/employee";
import { getRanksByServiceId, getUnitsByServiceId } from "@/server_actions/(get-requests)/employeeform/filterbyservice";
const EmployeeForm = ({
  authtoken,
  employee,
  services,

}: {
  authtoken?: string;
  employee?: EmployeeData | null;
  services: ServiceData[];

}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<EmployeeData>(formData);

  const form = useForm<Employeeform>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: "",
      technician: false,
      serviceNo: "",
      his: employee?.his || "",
      empServiceId: "",
      rankId: "",
      unitId: "",
    },
  });
  const editing = !form.formState.isValid;

  const router = useRouter();
  const backpath = useBackPath("employees");

  const [serviceValue, setServiceValue] = useState<number | null>(null);
  const [filterRanks, setFilterRanks] = useState<RankData[]>([]);
  const [filterUnits, setFilterUnits] = useState<UnitData[]>([]);

  const [filterText, setFilterText] = useState<string>("");
  const [filteredSevices, setFilteredServices] = useState(services || []);

  const handleServiceFilter = (value: string) => {
    setFilterText(value);

    const filteredServices = services.filter((service) =>
      service.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filteredServices);
  };

  const handleRankandUnitFilter = (value: string) => {
    setServiceValue(Number(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (serviceValue !== null) {
        const ranks = await getRanksByServiceId(serviceValue, authtoken);
        const units = await getUnitsByServiceId(serviceValue, authtoken);
        setFilterRanks(ranks);
        setFilterUnits(units)
      }
    };

    fetchData();
  }, [serviceValue, authtoken]);

  const handleSubmit = async (data: Employeeform) => {
    try {
      const payload = {
        name: data.name,
        technician: data.technician,
        serviceNo: data.serviceNo,
        his: data.his,
        empServiceId: Number(data.empServiceId),
        rankId: Number(data.rankId),
        unitId: Number(data.unitId),
      };

      await createEmployeeAction(payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Employee Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="his"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health Service Information Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please provide the Employee HIS number "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technician"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0  ">
                <FormLabel className="flex items-center">
                  Is a Technician or Not ?
                </FormLabel>
                <FormControl className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serviceNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Service Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please provide the Employee Service - number "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="empServiceId"
              render={({ field }) => (
                <FormItem className="flex-1 ">
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleRankandUnitFilter(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSevices.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.id.toString()}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1 content-end">
              <Input
                className=""
                placeholder="Search"
                onChange={(e) => {
                  handleServiceFilter(e.target.value);
                }}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="rankId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please Choose the Rank</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Rank"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {filterRanks?.map((rank) => (
                        <SelectItem key={rank.id} value={rank.id.toString()}>
                          {rank.name}
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
            name="unitId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please Choose the Rank</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Unit"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {filterUnits?.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id.toString()}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <SaveButton errors={hasErrors} editing={editing} />
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;

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
