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
import { EditSpecialInstruction } from "@/schema/patient-tests";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { patchSpecialInstruction } from "@/server_actions/actions/patient-tests";

const EditSpecialInstructionForm = ({
  payload,
}: {
  payload: EditSpecialInstruction;
}) => {
  const form = useForm<EditSpecialInstruction>({
    defaultValues: {
      spclInstruction: payload.spclInstruction || "",
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

  const handleSubmit = async (data: EditSpecialInstruction) => {
    try {
      const request = {
        id: payload.id,
        spclInstruction: data.spclInstruction,
        patientInfoId: payload.patientInfoId,
        testCategoriesId: payload.testCategoriesId,
      };
      console.log(request);
      const response = await patchSpecialInstruction(request);
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
            name="spclInstruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instruction</FormLabel>
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

export default EditSpecialInstructionForm;

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full mt-10" type="submit">
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
