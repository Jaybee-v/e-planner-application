"use client";
import StableService from "@/services/stable.service";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, ThumbsDown, TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PiHorseBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { CreateOrganizationDto } from "@/models/create/Organization";
import { StableM } from "@/models/Stable";
import OrganizationService from "@/services/organization.service";
import { useToast } from "../ui/use-toast";

interface Props {
  userID: string;
}

export const OrganizationChoice = ({ userID }: Props) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [storedStable, setStoredStable] = useState<StableM[]>([]);
  const [selectedStable, setSelectedStable] = useState<StableM | null>(null);
  const [searchDone, setSearchDone] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await new StableService().findAllByZip(search);
    console.log(request.data);
    setSearchDone(true);
    if (request.status === "success") {
      setStoredStable(request.data);
      // setStep(1);
    }
  };

  const handleSubmit = async () => {
    const organization: CreateOrganizationDto = {
      riderId: userID,
      stableId: selectedStable!.id,
    };
    const request = await new OrganizationService().create(organization);
    if (request.status === "success") {
      toast({
        title: "Club sélectionné",
        description: `Vous avez bien sélectionné ${selectedStable?.name} comme étant votre club.`,
      });
      router.refresh();
    } else {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de la sélection de votre club. Veuillez réessayer.`,
      });
    }
  };

  return (
    <div className="">
      <Alert variant={"destructive"}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Vous devez sélectionner votre club</AlertTitle>
        <AlertDescription>
          En sélectionnant votre club, vous aurez accès à la liste des leçons et
          des événements organisés par votre club.
        </AlertDescription>
      </Alert>
      <h1>Sélectionnez votre club en quelques clics.</h1>
      <form className="grid gap-4 w-fit mx-auto" onSubmit={handleSearch}>
        <h2>Recherchez votre club dans une liste grace au code postal</h2>
        <section className="max-w-[200px] mx-auto">
          <Label htmlFor="search">Entrez le code postal</Label>
          <Input
            id="search"
            placeholder="Code postal"
            value={search}
            className="text-right max-w-[120px] mx-auto"
            onChange={(e) => setSearch(e.target.value)}
          />
          <section className="flex py-4  w-full">
            <Button className="w-full">
              <Search />
              Rechercher
            </Button>
          </section>
        </section>
      </form>
      {storedStable.length > 0 ? (
        <>
          <section className="grid lg:grid-cols-4 gap-4 py-6">
            {storedStable.map((stable) => (
              <article
                key={`stored_stabble_${stable.id}`}
                className="p-4 rounded grid gap-4 drop-shadow-md bg-white hover:drop-shadow-sm transition"
              >
                <h2>{stable.name}</h2>
                <p>
                  <span className="font-semibold">{stable.zipcode}</span>{" "}
                  {stable.city}
                </p>
                <div className="flex justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      {" "}
                      <Button
                        className="gap-4 w-full "
                        onClick={() => {
                          setSelectedStable(stable);
                          setStep(1);
                        }}
                      >
                        <PiHorseBold className="h-6 w-6" />
                        C&apos;est mon club
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Vous allez sélectionner <br />
                          <span className="text-primary font-black tracking-wide">
                            {stable.name}
                          </span>
                          <br />
                          comme étant votre club
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En sélectionnant ce club, vous associerez votre compte
                          à <br />
                          <span className="text-primary font-black tracking-wide">
                            {stable.name}
                          </span>
                          . Cette action peut être modifiée ultérieurement dans
                          vos paramètres de compte.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>
                          Valider
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </article>
            ))}
          </section>
          <section className="flex flex-col max-w-lg mx-auto gap-4 py-6 justify-center">
            <Button
              className="gap-4"
              variant={"ghost"}
              type="button"
              onClick={() => router.push("/invite-my-club")}
            >
              <ThumbsDown />
              Vous ne trouvez pas votre club ? <br /> Cliquez ici
            </Button>
            {/* <Button
              className="gap-4"
              variant={"outline"}
              type="button"
              onClick={() => setStep(1)}
            >
              <ArrowRightFromLine />
              Passer cette étape
            </Button> */}
          </section>
        </>
      ) : storedStable.length === 0 && search !== "" && searchDone ? (
        <section className="grid gap-4">
          <h2 className="text-center">
            Aucun club de cette ville n&apos;est actuellement inscrit sur notre
            plateforme.
          </h2>
          <Button
            className="gap-4"
            variant={"outline"}
            type="button"
            onClick={() => router.push("/invite-my-club")}
          >
            <PiHorseBold className="h-6 w-6" />
            Invitez votre Club à découvrir Equita-planner
          </Button>
        </section>
      ) : null}
    </div>
  );
};
