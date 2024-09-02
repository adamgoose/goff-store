"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Flag, HelpCircle, Home, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Protect from "./protect-client";

function NavItem(props: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={props.href}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
            { "bg-accent text-accent-foreground": path.startsWith(props.href) },
            { "text-muted-foreground": !path.startsWith(props.href) },
          )}
        >
          {props.icon || <Home className="h-5 w-5" />}
          <span className="sr-only">{props.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{props.label}</TooltipContent>
    </Tooltip>
  );
}

export default function LeftNav() {
  const { orgId } = useAuth();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <NavItem href="/" label="Home" />
        <NavItem
          href="/features"
          label="Features"
          icon={<Flag className="h-5 w-5" />}
        />
        <Protect permission="org:account:support">
          <NavItem
            href="/support"
            label="Support"
            icon={<HelpCircle className="h-5 w-5" />}
          />
        </Protect>
      </nav>
      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4"> */}
      {/*   <Tooltip> */}
      {/*     <TooltipTrigger asChild> */}
      {/*       <Link */}
      {/*         href="#" */}
      {/*         className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8" */}
      {/*       > */}
      {/*         <Settings className="h-5 w-5" /> */}
      {/*         <span className="sr-only">Settings</span> */}
      {/*       </Link> */}
      {/*     </TooltipTrigger> */}
      {/*     <TooltipContent side="right">Settings</TooltipContent> */}
      {/*   </Tooltip> */}
      {/* </nav> */}
    </aside>
  );
}
