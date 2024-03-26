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
import {
  formData,
  InsertRankParams,
  RankData,
  RankedForm,
} from "@/schema/ranks";
import { ServiceData } from "@/schema/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { useBackPath } from "../shared/BackButton";
import { createRankAction } from "@/server_actions/actions/ranks";
import { DialogClose } from "@/components/ui/dialog";

const RankForm = ({
  services,
  serviceId,
  rank,
  openModal,
  closeModal,
}: {
  services: ServiceData[];
  serviceId?: number;
  rank?: RankData | null;
  openModal: (rank?: RankData) => void;
  closeModal: () => void;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<RankedForm>(formData);
  // const editing = !!rank?.id;

  const form = useForm<RankedForm>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: rank?.name || "",
      empServiceId: ""
    },
  });
  const editing = !form.formState.isValid;
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("ranks");

  const handleSubmit = async (data: RankedForm) => {
    try {
      const payload = {
        name: data.name,
        empServiceId: Number(data.empServiceId),
      };
      console.log(payload);

      await createRankAction(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rank Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Rank Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="empServiceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Service that the rank belongs" />
                    </SelectTrigger>
                    <SelectContent>
                      {services?.map((service) => (
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
          <SaveButton errors={hasErrors} editing={editing} />
          {/* {editing ? (
            <Button
              type="button"
              disabled={isDeleting || pending || hasErrors}
              variant={"destructive"}
              onClick={() => {
                setIsDeleting(true);
                closeModal && closeModal();
                startMutation(async () => {
                  addOptimistic &&
                    addOptimistic({ action: "delete", data: rank });
                  const error = await deleteRankAction(rank.id);
                  setIsDeleting(false);
                  const errorFormatted = {
                    error: error ?? "Error",
                    values: rank,
                  };

                  onSuccess("delete", error ? errorFormatted : undefined);
                });
              }}
            >
              Delet{isDeleting ? "ing..." : "e"}
            </Button>
          ) : null} */}
        </form>
      </Form>
    </div>
  );
};

export default RankForm;

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
