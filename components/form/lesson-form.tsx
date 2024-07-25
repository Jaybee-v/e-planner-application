"use client";
import React from "react";
import { z } from "zod";
import { SelectDiscipline } from "../lesson/select-discipline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  hostID: string;
}

const formSchema = z.object({
  hostId: z.string(),
  title: z.string(),
  type: z.string({
    required_error: "Veuillez choisir une discipline",
  }),
  description: z.string(),
  date: z.string(),
  instructorId: z.string(),
  maxParticipants: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  levelRequired: z.number(),
});

export const LessonForm = ({ hostID }: Props) => {
  const searchParams = useSearchParams();
  const l = searchParams.get("l");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostId: hostID,
      title: "",
      type: "",
      description: "",
      date: "",
      instructorId: "",
      maxParticipants: 0,
      startTime: "",
      endTime: "",
      levelRequired: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className="text-center">
        {!l ? "Créer une nouvelle leçon" : "Modifier la leçon"}
      </h1>
      <Form {...form}>
        <form className="grid gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="email">Titre pour la leçon</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Donnez un titre à la leçon ..."
                  />
                </FormControl>
                <FormMessage>{formState.errors.title?.message}</FormMessage>
              </FormItem>
            )}
          />
          <section className="lg:flex items-center gap-4">
            <SelectDiscipline form={form} />
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="maxParticipants">
                    Nombre de participants maximal
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      id="maxParticipants"
                      className="max-w-[150px]"
                    />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.maxParticipants?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </section>
          <FormField
            control={form.control}
            name="description"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Décrivez ce que vous allez faire pendant la séance ..."
                  />
                </FormControl>
                <FormMessage>
                  {formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="date">Date de l&apos;évènement</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    id="date"
                    className="max-w-[150px]"
                  />
                </FormControl>
                <FormMessage>{formState.errors.date?.message}</FormMessage>
              </FormItem>
            )}
          />
          <section className="grid lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="startTime">Heure de début</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      id="startTime"
                      className="max-lg:max-w-[150px] lg:w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.startTime?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="endTime">Heure de fin</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      id="endTime"
                      className="max-lg:max-w-[150px] lg:w-full"
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.endTime?.message}</FormMessage>
                </FormItem>
              )}
            />
          </section>

          <FormField
            control={form.control}
            name="levelRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Un niveau requis ?</FormLabel>
                <FormDescription>
                  En laissant &quot;Débutant&quot;, vous acceptez tous les
                  niveaux.
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionnez votre niveau dans la liste" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Débutant</SelectItem>
                    <SelectItem value="1">Galop 1</SelectItem>
                    <SelectItem value="2">Galop 2</SelectItem>
                    <SelectItem value="3">Galop 3</SelectItem>
                    <SelectItem value="4">Galop 4</SelectItem>
                    <SelectItem value="5">Galop 5</SelectItem>
                    <SelectItem value="6">Galop 6</SelectItem>
                    <SelectItem value="7">Galop 7</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <article className="flex justify-center">
            <Button type="submit">
              {!l ? "Enregistrer la leçon" : "Modifier la leçon"}
            </Button>
          </article>
        </form>
      </Form>
    </div>
  );
};
