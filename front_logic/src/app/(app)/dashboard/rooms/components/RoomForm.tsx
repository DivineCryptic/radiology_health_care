import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { formData, RoomData, RoomForm } from "@/schema/rooms";
import { createRoomAction } from "@/server_actions/actions/rooms";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

export const Roomform = ({
  openModal,
  closeModal,
  room,
}: {
  room?: RoomData | null;
  closeModal: () => void;
  openModal: (room: RoomData) => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<RoomForm>(formData);

  const form = useForm<RoomForm>({
    resolver: zodResolver(formData),
    defaultValues: {
      roomNo: "",
    },
  });

  const editing = !form.formState.isValid;

  const handleSubmit = async (values: RoomForm) => {
    try {
      const payload = {
        roomNo: Number(values.roomNo),
      }
      console.log(payload );
      await createRoomAction(payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mx-auto px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="roomNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room No.</FormLabel>
                <FormControl>
                  <Input placeholder="roomNo." {...field} />
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

const SaveButton = ({
  errors,
  editing,
}: {
  errors?: boolean;
  editing?: boolean;
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
