"use client";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { StoredStable } from "../stable/first-login-stable-form";
import { CreateStableDto } from "@/models/create/Stable";
import StableService from "@/services/stable.service";

interface Props {
  userID: string;
  storedStable: StoredStable | null;
}

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  country: z.string(),
  phone: z.string(),
});

export const StableForm = ({ userID, storedStable }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: storedStable?.name || "",
      address: "",
      zipcode: storedStable?.zipcode || "",
      city: storedStable?.city || "",
      country: "FRANCE",
      phone: "06",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newStable: CreateStableDto = {
      id: userID,
      name: values.name,
      address: values.address,
      zipcode: values.zipcode,
      city: values.city,
      country: values.country,
      phone: values.phone,
      stableStorerId: storedStable?.id || null,
    };
    const request = await new StableService().create(newStable);

    if (request.status === "success") {
      toast({
        title: "Succès",
        description: request.message,
      });
      router.refresh();
    } else {
      toast({
        title: "Succès",
        description: request.message,
        variant: "destructive",
      });
      return;
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
                <FormLabel htmlFor="name">Nom des écuries</FormLabel>
                <FormControl>
                  <Input {...field} id="name" placeholder="Prénom" />
                </FormControl>
                <FormMessage>{formState.errors.name?.message}</FormMessage>
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
