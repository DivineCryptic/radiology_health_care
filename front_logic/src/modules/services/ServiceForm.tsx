import { useValidatedForm } from "@/hooks/useValidatedForm";
import { formData, ServiceData } from "@/schema/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useBackPath } from "../shared/BackButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { createServiceAction } from "@/server_actions/actions/services";

const ServiceForm = ({
  service,
  openModal,
  closeModal,
}: {
  service: ServiceData | null;
  openModal: (service?: ServiceData) => void;
  closeModal: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm(formData);

  const form = useForm<ServiceData>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: service?.name || "",
    },
  });

  const editing = !form.formState.isValid;
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("services");

  const handleSubmit = async (data: ServiceData) => {
    try {
      const payload = {
        name: data.name,
      };
      console.log(payload);

      await createServiceAction(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Service name" {...field} />
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

export default ServiceForm;

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
