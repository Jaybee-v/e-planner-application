import { RiderAndStableM } from "@/models/Stable";
import React from "react";

interface Props {
  stables: RiderAndStableM[];
}

export const MiniStableCard = ({ stables }: Props) => {
  return (
    <div>
      <h2>Vous êtes membre de ces écuries</h2>
      <section className="grid grid-cols-3 gap-6">
        {stables.map((stable) => (
          <article
            key={`stable_${stable.id}`}
            className="bg-white w-full py-4 px-6 rounded drop-shadow-md flex flex-col gap-2 justify-center items-center"
          >
            <h3>{stable.name}</h3>
            <p>{stable.address}</p>
            <p>
              {stable.zipcode} - {stable.city}
            </p>
            <p>{stable.country}</p>
            {stable.status === 0 ? (
              <p className="bg-orange-300 px-6 py-2 rounded font-semibold italic tracking-wide">
                En attente de validation
              </p>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  );
};
