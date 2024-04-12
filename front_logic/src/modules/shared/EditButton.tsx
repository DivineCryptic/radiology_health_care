import { Button } from "@/components/ui/button";
import Link from "next/link";

export const EditButton = ({ prop,basePath }: { prop:{id: number },basePath:string}) => {
  return (
    <Button variant={"link"} asChild>
      <Link href={basePath+"/"+prop.id}>Edit</Link>
    </Button>
  );
};
