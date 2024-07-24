"use client";
import RiderService from "@/services/rider.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  userID: string;
}

const formSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  birthdate: z.string(),
  level: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  country: z.string(),
  phone: z.string(),
});

export const RiderForm = ({ userID }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      birthdate: "",
      level: "",
      address: "",
      zipcode: "",
      city: "",
      country: "FRANCE",
      phone: "06",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const request = await new RiderService().create({
        id: userID,
        name: values.name,
        lastname: values.lastname,
        level: parseInt(values.level),
        birthdate: values.birthdate,
        address: values.address,
        zipcode: values.zipcode,
        city: values.city,
        country: values.country,
        phone: values.phone,
      });
      if (request.status === "success") {
        toast({
          title: "Rider created",
          description: request.message,
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: request.message,
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full space-y-4"
        >
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
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quel est votre niveau équestre ?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
                  <Input {...field} id="phone" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phone?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="address">
                  Adresse postale (n°, rue)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="address"
                    placeholder="Adresse postale (n°, rue)"
                  />
                </FormControl>
                <FormMessage>{formState.errors.address?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="zipcode">Code postal</FormLabel>
                <FormControl>
                  <Input {...field} id="zipcode" placeholder="Code postal" />
                </FormControl>
                <FormMessage>{formState.errors.zipcode?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="city">Ville</FormLabel>
                <FormControl>
                  <Input {...field} id="city" placeholder="Ville" />
                </FormControl>
                <FormMessage>{form.formState.errors.city?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="country">Pays</FormLabel>
                <FormControl>
                  <Input {...field} id="country" placeholder="Pays" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.country?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button>
            <Save />
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
};
