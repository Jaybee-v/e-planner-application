"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InstructorM } from "@/models/Instructor";
import InstructorService from "@/services/instructor.service";

interface Props {
  form: any;
  userID: string;
}
export const SelectInstructor = ({ form, userID }: Props) => {
  const [instructors, setInstructors] = React.useState<InstructorM[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await new InstructorService().findByStableId(userID);
      if (response.status === "success") {
        setInstructors(response.data);
      }
    };
    getData();
  }, [userID]);
  return (
    <div>
      <FormField
        name="type"
        control={form.control}
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel htmlFor="type">
              Attribuez la leçon à un moniteur
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  form.setValue("instructorId", value);
                }}
              >
                <SelectTrigger className="w-[350px]">
                  <SelectValue placeholder="Sélectionnez le moniteur ..." />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor, i) => (
                    <SelectItem value={instructor.id} key={"instructor_" + i}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{form.formState.errors.type?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};
