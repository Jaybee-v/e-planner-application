"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  stableName: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export default function InviteMyClub() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      stableName: "",
      email: "",
      message: "",
    },
  });

  return (
    <div>
      <h1>Votre club n&apos;est pas encore inscrit sur notre plateforme ?</h1>
      <p>
        Envoyez lui une invitation. Cela lui permettra de découvrir{" "}
        <span className="font-bold tracking-wide text-primary">
          Equita-planner
        </span>
        , et de s&apos;inscrire.
      </p>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Votre prénom</FormLabel>
                <FormControl>
                  <Input {...field} id="name" placeholder="Jean-Baptiste" />
                </FormControl>
                <FormMessage>{formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stableName"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="stableName">Le nom du club</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="stableName"
                    placeholder="Les écuries de la forêt"
                  />
                </FormControl>
                <FormMessage>
                  {formState.errors.stableName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="email">
                  L&apos;adresse email du club
                </FormLabel>
                <FormDescription>
                  Attention de fournir une adresse email valide
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="lesécuriesdelaforet@yahoo.fr"
                  />
                </FormControl>
                <FormMessage>{formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="message">
                  Rédiger un message accompagnant votre invitation (facultatif)
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="message"
                    placeholder="Bonjour, je t'invite à explorer cette plateforme ..."
                  />
                </FormControl>
                <FormMessage>{formState.errors.message?.message}</FormMessage>
              </FormItem>
            )}
          />
          <article className="flex justify-center my-6">
            <Button type="submit">Inviter mon club</Button>
          </article>
        </form>
      </Form>
    </div>
  );
}
