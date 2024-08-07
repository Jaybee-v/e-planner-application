import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props {
  form: any;
}

const COLOR: string[] = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

export const SelectColor = ({ form }: Props) => {
  return (
    <div>
      <FormField
        name="color"
        control={form.control}
        render={({ field, formState }) => (
          <FormItem className="flex items-center gap-4">
            <article>
              <FormLabel htmlFor="color">Choisissez sa couleur</FormLabel>
              <FormDescription>
                C&apos;est la couleur qui ressortira sur le planning des leçons
              </FormDescription>
            </article>
            <FormControl>
              <Select>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Couleur ..." />
                </SelectTrigger>
                <SelectContent>
                  {COLOR.map((c, i) => (
                    <SelectItem value={c} key={"color_" + i}>
                      <article
                        className={`rounded-full ${c} h-4 w-4`}
                      ></article>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{form.formState.errors.color?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};
