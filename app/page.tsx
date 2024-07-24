import { NewsletterForm } from "@/components/form/newsletter-form";
import Image from "next/image";
import React from "react";

const DATA = {
  banner: {
    title:
      "Simplifiez les Réservations de Leçons et Activités Équestres en un Clic",
    content:
      "La plateforme idéale pour cavaliers et centres équestres, pour une gestion rapide et efficace des réservations de leçons",
    image: "/images/assets/cso2.jpeg",
    button: {
      label: "Je m'inscris",
      link: "http://localhost:3000/auth/register",
      enable: true,
    },
  },
  feature: {
    title: "Equita-Planner Révolutionne la Gestion de Vos Réservations",
    features: [
      {
        name: "Gestion de Planning Simplifiée.",
        icon: "/images/calendar-days.svg",
        content:
          "Gérez vos plannings où que vous soyez, avec une interface intuitive et accessible.",
      },
      {
        name: "Notifications et Rappels",
        icon: "/images/bell-ring.svg",
        content:
          "Recevez des notifications par email et ne manquez jamais une leçon avec des rappels automatiques.",
      },
      {
        name: "Inscription Facile",
        icon: "/images/user-check.svg",
        content:
          "Réservez vos leçons en quelques clics, rapidement et simplement.",
      },
    ],
  },
};

export default function Home() {
  return (
    <div>
      <section className="section pb-[50px]">
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto lg:col-10">
              <h1 className="font-primary font-bold">{DATA.banner?.title}</h1>
              {DATA.banner?.content && <p className="mt-4 text-lg"></p>}

              <NewsletterForm />

              {DATA.banner?.image && (
                <Image
                  className="mx-auto mt-12 rounded drop-shadow-md"
                  src={DATA.banner?.image}
                  width={750}
                  height={390}
                  alt="banner image"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{DATA.feature!.title}</h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.feature!.features.map((item: any, i: number) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={"features_" + i}
              >
                {item.icon && (
                  // <Image
                  //   className="mx-auto"
                  //   src={item.icon}
                  //   width={30}
                  //   height={30}
                  //   alt=""
                  // />
                  <Image
                    className="mx-auto text-primary"
                    alt={item.icon}
                    src={item.icon}
                    width={30}
                    height={30}
                  />
                )}
                <div className="mt-4">
                  <p className="h5 font-semibold">{item.name}</p>
                  <p className="mt-3 text-lg">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Call to Action -->
  <Cta cta={call_to_action} /> */}
    </div>
  );
}
