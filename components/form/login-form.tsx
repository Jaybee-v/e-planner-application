"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import AuthService from "@/services/auth.service";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies-store";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const request = await new AuthService().login(
        values.email,
        values.password
      );

      const token: string = request.data.access_token as string;

      await setCookie("session", token);
      const result = await new AuthService().decrypt(token);
      console.log(result);

      router.push("/");
      router.refresh();

      console.log(request);
    } catch (error: any) {
      console.log(error);

      console.log(JSON.stringify(error.message));
      toast({
        title: "Error with your credentials",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-sm w-full">
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
                  <Input {...field} id="email" type="email" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} id="password" type="password" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className="" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
