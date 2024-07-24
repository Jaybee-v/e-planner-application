"use client";
import React, { useState } from "react";
import { StableForm } from "../form/stable-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, ThumbsDown, ThumbsUp } from "lucide-react";
import StableService from "@/services/stable.service";

export interface StoredStable {
  id: number;
  name: string;
  city: string;
  zipcode: string;
  isUsed: boolean;
}

interface Props {
  userID: string;
}

export const FirstLoginStableForm = ({ userID }: Props) => {
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [storedStable, setStoredStable] = useState<StoredStable[]>([]);
  const [selectedStable, setSelectedStable] = useState<StoredStable | null>(
    null
  );

  if (step === 1)
    return (
      <div className="max-w-2xl w-full">
        <StableForm userID={userID} storedStable={selectedStable} />
      </div>
    );

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await new StableService().findAllStoredByZip(search);
    console.log(request.data);
    if (request.status === "success") {
      setStoredStable(request.data);
      // setStep(1);
    }
  };

  return (
    <div className="w-full max-w-2xl max-md:px-4">
      <h1>C&apos;est votre première connexion !</h1>
      <p>Complétez les informations de votre écurie.</p>
      <p>Commencez par rechercher votre écuire:</p>
      <form
        className="grid gap-4 max-w-[180px] mx-auto"
        onSubmit={handleSearch}
      >
        <section>
          <Label htmlFor="search">Entrez le code postal</Label>
          <Input
            id="search"
            placeholder="Code postal"
            value={search}
            className="text-right max-w-[120px] mx-auto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        <section className="flex  w-full">
          <Button className="w-full">
            <Search />
            Rechercher
          </Button>
        </section>
      </form>
      {storedStable.length > 0 ? (
        <>
          <section className="grid lg:grid-cols-2 gap-4 py-6">
            {storedStable.map((stable) => (
              <article
                key={`stored_stabble_${stable.id}`}
                className="p-4 rounded drop-shadow-md bg-white hover:drop-shadow-sm transition"
              >
                <h2>{stable.name}</h2>
                <p>
                  {stable.zipcode} {stable.city}
                </p>
                <Button
                  className="gap-4 w-full"
                  onClick={() => {
                    setSelectedStable(stable);
                    setStep(1);
                  }}
                >
                  <ThumbsUp /> C&apos;est mon écurie
                </Button>
              </article>
            ))}
          </section>
          <section className="flex justify-center">
            <Button
              className="gap-4"
              variant={"ghost"}
              type="button"
              onClick={() => setStep(1)}
            >
              <ThumbsDown />
              Vous ne trouvez pas vos écuries ? Cliquez ici
            </Button>
          </section>
        </>
      ) : null}
    </div>
  );
};
