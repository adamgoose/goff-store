"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    getToken({
      template: "feature",
    }).then((token) => token && setToken(token));
  }, [getToken]);

  return (
    <Button asChild>
      {token && (
        <Link
          href={`https://jwt.io/#debugger-io?token=` + token}
          target="_blank"
        >
          Debug JWT
        </Link>
      )}
    </Button>
  );
}
