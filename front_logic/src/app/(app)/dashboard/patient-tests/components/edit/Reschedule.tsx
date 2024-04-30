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
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { patchPatientTestsStartTime } from "@/server_actions/actions/patient-tests";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

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

  return (
    <div>
      <Form {...form}>
        <form
          action={() => {
            const rescheduledTime = form.getValues("startTime");
            payload.startTime = rescheduledTime + ":00.000Z";
            const finalPayload = {
              ...payload,
            };
            patchPatientTestsStartTime(finalPayload);
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
              <Button
                className="w-full mt-10"
                onClick={() => {
                  const rescheduledTime = new Date(form.getValues("startTime"));
                  const DateView = rescheduledTime.toString().slice(0, 15);
                  const toastView = `${DateView} ${rescheduledTime.toLocaleTimeString()}`;

                  toast({
                    title: "Scheduled",
                    description: `Rescheduled at ${toastView}`,
                  });
                }}
                type="submit"
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
