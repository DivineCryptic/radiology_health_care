import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/units/useOptimisticUnits";

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

import { type Unit, insertUnitParams } from "@/lib/db/schema/units";
import {
  createUnitAction,
  deleteUnitAction,
  updateUnitAction,
} from "@/lib/actions/units";
import { type Service, type ServiceId } from "@/lib/db/schema/services";

const UnitForm = ({
  services,
  serviceId,
  unit,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  unit?: Unit | null;
  services: Service[];
  serviceId?: ServiceId
  openModal?: (unit?: Unit) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Unit>(insertUnitParams);
  const editing = !!unit?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("units");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Unit },
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
      toast.success(`Unit ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const unitParsed = await insertUnitParams.safeParseAsync({ serviceId, ...payload });
    if (!unitParsed.success) {
      setErrors(unitParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = unitParsed.data;
    const pendingUnit: Unit = {
      
      id: unit?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingUnit,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateUnitAction({ ...values, id: unit.id })
          : await createUnitAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingUnit 
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
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={unit?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
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
        <Select defaultValue={unit?.serviceId} name="serviceId">
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
              addOptimistic && addOptimistic({ action: "delete", data: unit });
              const error = await deleteUnitAction(unit.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: unit,
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

export default UnitForm;

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
