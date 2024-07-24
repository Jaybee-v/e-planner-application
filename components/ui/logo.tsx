import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.jpeg"
        alt="logo"
        width={100}
        height={100}
        className="w-[50px] h-[50px] rounded-lg"
      />
      <span className="font-semibold text-lg">Equita-planner</span>
    </Link>
  );
};
