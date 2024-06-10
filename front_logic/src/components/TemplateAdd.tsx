import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UpdateReportTemplate } from "@/schema/testcategory";
import { patchTestChildReport } from "@/server_actions/actions/testcategory";
import React from "react";
import {useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";

const TemplateAdd = ({
  id,
  reportTemplate,
}: {
  id: number;
  reportTemplate: string;
}) => {
  const form = useForm<UpdateReportTemplate>({
    defaultValues: {
      patientReport: reportTemplate,
    },
  });

  const { toast } = useToast();
  const handleSubmitToast = () => {
    toast({
      title: "Success",
      description: "Template updated successfully",
      duration: 2000,
      variant: "default",
    });
  };

  const handleSubmit = async (data: UpdateReportTemplate) => {
    try {
      const payload = {
        id: id,
        patientReport: data.patientReport,
      };
      console.log(payload);
      const response = await patchTestChildReport(payload);

      if (response === "success") {
        handleSubmitToast();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(handleSubmit)}
          action={() => {
            handleSubmit(form.getValues());
          }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="patientReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Report</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Patient Report" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Submit />
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default TemplateAdd;

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full mt-10" type="submit">
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
