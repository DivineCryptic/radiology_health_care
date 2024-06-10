import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { UpdatePatientTestStartTime } from "@/schema/patient-tests";
import { FormProviderProps, useForm, UseFormReturn } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { patchPatientTestsStartTime } from "@/server_actions/actions/patient-tests";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export default function Reschedule({
  payload,
}: {
  payload: UpdatePatientTestStartTime;
}) {
  const form = useForm<UpdatePatientTestStartTime>({
    defaultValues: {
      startTime: payload.startTime,
    },
  });
  const { toast } = useToast();

  const handleToast = () => {
    const rescheduledTime = new Date(form.getValues("startTime"));
    const DateView = rescheduledTime.toString().slice(0, 15);
    const toastView = `${DateView} ${rescheduledTime.toLocaleTimeString()}`;
    toast({
      title: "Scheduled",
      description: `Rescheduled at ${toastView}`,
    });
  };
  return (
    <div>
      <Form {...form}>
        <form
          action={async () => {
            const rescheduledTime = form.getValues("startTime");
            payload.startTime = rescheduledTime + ":00.000Z";
            const finalPayload = {
              ...payload,
            };
            const response = await patchPatientTestsStartTime(finalPayload);
            if (response === "success") {
              handleToast();
            }
          }}
        >
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <Input
                  className="w-60"
                  type="datetime-local"
                  placeholder="Start Time"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Submit/>
              {/* <Button className="w-full mt-10" disabled={pending} type="submit">
                {pending ? "Rescheduling... this button" : "Reschedule the button"}
              </Button> */}
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full mt-10" type="submit">
      {pending ? "Rescheduling..." : "Reschedule"}
    </Button>
  );
};
