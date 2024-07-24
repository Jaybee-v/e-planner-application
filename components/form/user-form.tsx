"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CreateUserDto } from "@/models/create/User";
import { useToast } from "../ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import UserService from "@/services/user.service";
import AuthService from "@/services/auth.service";
import { setCookie } from "@/lib/cookies-store";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Veuillez entrer une adresse email",
    })
    .email(),
  password: z
    .string({
      required_error: "Veuillez entrer un mot de passe",
    })
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string().min(6),
});

export const UserForm = () => {
  useEffect(() => {
    document.title = "Inscription";
  });

  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [role, setRole] = React.useState<string>(user || "");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (role === "") {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un rôle",
        variant: "destructive",
      });
      const roleInput = document.getElementById("role") as HTMLElement;
      roleInput.classList.add("border-2");
      roleInput.classList.add("border-red-500");
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    const newUser: CreateUserDto = {
      email: values.email,
      password: values.password,
      role: role,
    };

    const request = await new UserService().create(newUser);
    if (request.status === "success") {
      toast({
        title: "Succès",
        description: "Votre compte a bien été créé",
      });
      const authRequest = await new AuthService().login(
        values.email,
        values.password
      );

      const token: string = authRequest.data.access_token as string;

      await setCookie("session", token);
      const result = await new AuthService().decrypt(token);
      console.log(result);

      router.push("/");
      router.refresh();
    } else {
      toast({
        title: "Erreur",
        description: request.message,
        variant: "destructive",
      });
      return;
    }
  }

  return (
    <div className="max-w-2xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full space-y-4"
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
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="password">Mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} id="password" placeholder="Mot de passe" />
                </FormControl>
                <FormMessage>{formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirmer mot de passe
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="confirmPassword"
                    placeholder="Confirmez votre mot de passe"
                  />
                </FormControl>
                <FormMessage>
                  {formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <section
            className="grid justify-center w-full gap-4 p-4 rounded"
            id="role"
          >
            <article
              onClick={() => setRole("Cavalier")}
              className={`transition cursor-pointer  text-center border-2  ${
                role === "Cavalier"
                  ? "bg-green-400 border-green-400 text-white font-bold tracking-wide"
                  : "bg-white text-primary hover:scale-105 border-primary"
              } rounded-md py-2 px-5 w-full`}
            >
              Je suis cavalier
            </article>
            <article
              onClick={() => setRole("Centre équestre")}
              className={`transition cursor-pointer text-center border-2 ${
                role === "Centre équestre"
                  ? "bg-green-400 border-green-400 text-white font-bold tracking-wide"
                  : "bg-white text-primary  hover:scale-105 border-primary"
              } rounded-md py-2 px-5 w-full`}
            >
              Je suis gérant de centre équestre / écuries
            </article>
          </section>
          <Button>S&apos;inscrire</Button>
        </form>
      </Form>
    </div>
  );
};
