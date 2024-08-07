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
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { CreateInstructorDto } from "@/models/create/Instructor";
import InstructorService from "@/services/instructor.service";
import { useToast } from "../ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateToInput } from "@/lib/dates";
import { UpdateInstructorDto } from "@/models/update/Instructor";
import { SelectColor } from "../ui/select-color";

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
  color: z.string().optional(),
});

export const InstructorForm = ({ stableID }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("instructor");
  console.log(user);
  const [instructorID, setInstructorID] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      lastname: "",
      birthdate: "",
      phone: "",
      color: "",
    },
  });

  useEffect(() => {
    const getData = async () => {
      console.log(user);

      if (user) {
        const request = await new InstructorService().findById(user);
        if (request.status === "success") {
          const instructor = request.data;
          console.log(instructor);
          setInstructorID(instructor.id);
          form.setValue("email", "contact@equita-planner.fr");
          form.setValue("name", instructor.name);
          form.setValue("lastname", instructor.lastname);
          form.setValue(
            "birthdate",
            formatDateToInput(new Date(instructor.birthdate).toString())
          );
          form.setValue("phone", instructor.phone);
          form.setValue("color", instructor.color);
        }
      }
    };
    getData();
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      const newInstructor: CreateInstructorDto = {
        id: stableID,
        email: values.email,
        name: values.name,
        lastname: values.lastname,
        birthdate: values.birthdate,
        phone: values.phone,
        color: values.color ? values.color : "default",
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
    }
    if (user && instructorID) {
      const updateInstructor: UpdateInstructorDto = {
        id: instructorID,
        name: values.name,
        lastname: values.lastname,
        birthdate: values.birthdate,
        phone: values.phone,
      };
      const response = await new InstructorService().update(
        instructorID,
        updateInstructor
      );
      console.log(response);
      if (response.status === "success") {
        toast({
          title: "Instructeur modifié",
          description: "L'instructeur a bien été modifié",
        });
        router.push("/instructors");
        router.refresh();
      } else {
        toast({
          title: "Erreur",
          description: response.message,
          variant: "destructive",
        });
        return;
      }
    }
  };

  return (
    <div className="mx-auto w-full">
      <Form {...form}>
        <form
          className="w-full grid gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {!user ? (
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
          ) : null}
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
          <SelectColor form={form} />
          <article className="flex justify-center">
            <Button type="submit">
              {" "}
              {!user ? "Ajouter le moniteur" : "Modifier le moniteur"}
            </Button>
          </article>
        </form>
      </Form>
    </div>
  );
};
