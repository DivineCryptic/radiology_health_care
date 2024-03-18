import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/employees/useOptimisticEmployees";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"

import { type Employee, insertEmployeeParams } from "@/lib/db/schema/employees";
import {
  createEmployeeAction,
  deleteEmployeeAction,
  updateEmployeeAction,
} from "@/lib/actions/employees";
import { type Service, type ServiceId } from "@/lib/db/schema/services";
import { type Rank, type RankId } from "@/lib/db/schema/ranks";
import { type Unit, type UnitId } from "@/lib/db/schema/units";

const EmployeeForm = ({
  services,
  serviceId,
  ranks,
  rankId,
  units,
  unitId,
  employee,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  employee?: Employee | null;
  services: Service[];
  serviceId?: ServiceId
  ranks: Rank[];
  rankId?: RankId
  units: Unit[];
  unitId?: UnitId
  openModal?: (employee?: Employee) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Employee>(insertEmployeeParams);
  const editing = !!employee?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("employees");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Employee },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Employee ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const employeeParsed = await insertEmployeeParams.safeParseAsync({ serviceId,
  rankId,
  unitId, ...payload });
    if (!employeeParsed.success) {
      setErrors(employeeParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = employeeParsed.data;
    const pendingEmployee: Employee = {
      updatedAt: employee?.updatedAt ?? new Date(),
      createdAt: employee?.createdAt ?? new Date(),
      id: employee?.id ?? "",
      userId: employee?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingEmployee,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateEmployeeAction({ ...values, id: employee.id })
          : await createEmployeeAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingEmployee 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.healthInformationService ? "text-destructive" : "",
          )}
        >
          Health Information Service
        </Label>
        <Input
          type="text"
          name="healthInformationService"
          className={cn(errors?.healthInformationService ? "ring ring-destructive" : "")}
          defaultValue={employee?.healthInformationService ?? ""}
        />
        {errors?.healthInformationService ? (
          <p className="text-xs text-destructive mt-2">{errors.healthInformationService[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {serviceId ? null : <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.serviceId ? "text-destructive" : "",
          )}
        >
          Service
        </Label>
        <Select defaultValue={employee?.serviceId} name="serviceId">
          <SelectTrigger
            className={cn(errors?.serviceId ? "ring ring-destructive" : "")}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
          {services?.map((service) => (
            <SelectItem key={service.id} value={service.id.toString()}>
              {service.id}{/* TODO: Replace with a field from the service model */}
            </SelectItem>
           ))}
          </SelectContent>
        </Select>
        {errors?.serviceId ? (
          <p className="text-xs text-destructive mt-2">{errors.serviceId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div> }

      {rankId ? null : <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.rankId ? "text-destructive" : "",
          )}
        >
          Rank
        </Label>
        <Select defaultValue={employee?.rankId} name="rankId">
          <SelectTrigger
            className={cn(errors?.rankId ? "ring ring-destructive" : "")}
          >
            <SelectValue placeholder="Select a rank" />
          </SelectTrigger>
          <SelectContent>
          {ranks?.map((rank) => (
            <SelectItem key={rank.id} value={rank.id.toString()}>
              {rank.id}{/* TODO: Replace with a field from the rank model */}
            </SelectItem>
           ))}
          </SelectContent>
        </Select>
        {errors?.rankId ? (
          <p className="text-xs text-destructive mt-2">{errors.rankId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div> }

      {unitId ? null : <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.unitId ? "text-destructive" : "",
          )}
        >
          Unit
        </Label>
        <Select defaultValue={employee?.unitId} name="unitId">
          <SelectTrigger
            className={cn(errors?.unitId ? "ring ring-destructive" : "")}
          >
            <SelectValue placeholder="Select a unit" />
          </SelectTrigger>
          <SelectContent>
          {units?.map((unit) => (
            <SelectItem key={unit.id} value={unit.id.toString()}>
              {unit.id}{/* TODO: Replace with a field from the unit model */}
            </SelectItem>
           ))}
          </SelectContent>
        </Select>
        {errors?.unitId ? (
          <p className="text-xs text-destructive mt-2">{errors.unitId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div> }
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={employee?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.serviceNo ? "text-destructive" : "",
          )}
        >
          Service No
        </Label>
        <Input
          type="text"
          name="serviceNo"
          className={cn(errors?.serviceNo ? "ring ring-destructive" : "")}
          defaultValue={employee?.serviceNo ?? ""}
        />
        {errors?.serviceNo ? (
          <p className="text-xs text-destructive mt-2">{errors.serviceNo[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
<div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.technician ? "text-destructive" : "",
          )}
        >
          Technician
        </Label>
        <br />
        <Checkbox defaultChecked={employee?.technician} name={'technician'} className={cn(errors?.technician ? "ring ring-destructive" : "")} />
        {errors?.technician ? (
          <p className="text-xs text-destructive mt-2">{errors.technician[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: employee });
              const error = await deleteEmployeeAction(employee.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: employee,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default EmployeeForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
