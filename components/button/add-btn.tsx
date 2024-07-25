import { Cross } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  url: string;
  label: string;
}

export const AddBtn = ({ url, label }: Props) => {
  return (
    <Link
      href={url}
      className="text-green-600 flex items-center hover:bg-green-600 hover:text-white gap-2 border border-transparent mx-auto w-fit px-6 rounded-xl transition-all py-2 hover:border-green-600"
    >
      <Cross /> <span>{label}</span>
    </Link>
  );
};
