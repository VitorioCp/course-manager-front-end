"use client";

import HeaderAuth from "@/components/layout/headerAuth";
import HeaderPublic from "@/components/layout/headerPublic";
import { ReactNode, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Layout({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  return (
    <>
      <HeaderAuth />
      <main>{children}</main>
    </>
  );
}
