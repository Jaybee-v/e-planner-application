"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Button } from "../ui/button";
import { CreateInstructorDto } from "@/models/create/Instructor";
import InstructorService from "@/services/instructor.service";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  stableID: string;
}

const formSchema = z.object({
  email: z
    .string({
      required_error: "Veuillez entrer une adresse email",
    })
    .email(),
  name: z.string(),
  lastname: z.string(),
  birthdate: z.string(),
  phone: z.string(),
});

export const InstructorForm = ({ stableID }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      lastname: "",
      birthdate: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newInstructor: CreateInstructorDto = {
      id: stableID,
      email: values.email,
      name: values.name,
      lastname: values.lastname,
      birthdate: values.birthdate,
      phone: values.phone,
    };
    const request = await new InstructorService().create(newInstructor);
    if (request.status === "success") {
      console.log("Instructor created");
      toast({
        title: "Instructeur ajouté",
        description: "L'instructeur a bien été ajouté à votre écurie",
      });
      router.push("/instructors");
      router.refresh();
    } else {
      console.log("Instructor not created");
      toast({
        title: "Erreur",
        description: request.message,
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="mx-auto w-full">
      {stableID}
      <Form {...form}>
        <form
          className="w-full grid gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" placeholder="Email" />
                </FormControl>
                <FormMessage>{formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Prénom</FormLabel>
                <FormControl>
                  <Input {...field} id="name" placeholder="Prénom" />
                </FormControl>
                <FormMessage>{formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nom de famille</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="lastname"
                    placeholder="Nom de famille"
                  />
                </FormControl>
                <FormMessage>{formState.errors.lastname?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="birthdate">Date de naissance</FormLabel>
                <FormControl>
                  <Input {...field} id="birthdate" type="date" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.birthdate?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    placeholder="Numéro de téléphone"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phone?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <article className="flex justify-center">
            <Button type="submit">Ajouter un instructeur</Button>
          </article>
        </form>
      </Form>
    </div>
  );
};
