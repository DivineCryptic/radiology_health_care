import React from "react";
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
import { useFormStatus } from "react-dom";
import { EditClinicalNote } from "@/schema/patient-tests";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { patchClinicalNotes } from "@/server_actions/actions/patient-tests";
import { useToast } from "@/components/ui/use-toast";

const EditClinicalForm = ({ payload }: { payload: EditClinicalNote }) => {
  const form = useForm<EditClinicalNote>({
    defaultValues: {
      clinicalNote: payload.clinicalNote || "",
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

  const handleSubmit = async (data: EditClinicalNote) => {
    try {
      const request = {
        id: payload.id,
        clinicalNote: data.clinicalNote,
        patientInfoId: payload.patientInfoId,
        testCategoriesId: payload.testCategoriesId,
      };
      console.log(request);
      const response = await patchClinicalNotes(request);
      if (response === "success") {
        handleSubmitToast();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          action={() => {
            handleSubmit(form.getValues());
          }}
        >
          <FormField
            control={form.control}
            name="clinicalNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clinical Note</FormLabel>
                <Textarea {...field} />

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Submit />
              {/* <Button className="w-full mt-10" disabled={pending} type="submit">
                {pending ? "Rescheduling... this button" : "Reschedule the button"}
              </Button> */}
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default EditClinicalForm;

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full mt-10" type="submit">
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
