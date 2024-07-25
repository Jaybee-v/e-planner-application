"use client";
import React from "react";
import disciplines from "@/resources/disciplines.json";
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

interface Props {
  form: any;
}

export const SelectDiscipline = ({ form }: Props) => {
  return (
    <div>
      <FormField
        name="type"
        control={form.control}
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel htmlFor="type">Discipline</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Définissez la discipline ..." />
                </SelectTrigger>
                <SelectContent>
                  {disciplines.map((d, i) => (
                    <SelectItem value={d.nom} key={"discipline_" + i}>
                      {d.nom}
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
