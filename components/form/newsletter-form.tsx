import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const NewsletterForm = () => {
  return (
    <section className="grid gap-4">
      <h2 className="text-center text-3xl">
        Notre solution est en développement ! <br /> Inscrivez-vous pour être
        les premiers informés de sa sortie et des offres exclusives
      </h2>
      <form id="newsletter-form" className="grid gap-4">
        <Input
          className="max-w-lg mx-auto"
          name="email"
          type="email"
          id="email"
          placeholder="Mon adresse email ici"
          required
        />
        <Button id="newsletter-submit" type="button" className="w-fit mx-auto">
          Je m&apos;abonne à la newsletter
        </Button>
        <p id="response-message"></p>
      </form>
    </section>
  );
};
