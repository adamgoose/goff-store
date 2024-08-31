import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { Button } from "./ui/button";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNav />
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <Home size="18" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbSeparator /> */}
          {/* <BreadcrumbItem> */}
          {/*   <BreadcrumbLink asChild> */}
          {/*     <Link href="#">Orders</Link> */}
          {/*   </BreadcrumbLink> */}
          {/* </BreadcrumbItem> */}
          {/* <BreadcrumbSeparator /> */}
          {/* <BreadcrumbItem> */}
          {/*   <BreadcrumbPage>Recent Orders</BreadcrumbPage> */}
          {/* </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <div className="relative ml-auto flex-1 md:grow-0"> */}
      {/*   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
      {/*   <Input */}
      {/*     type="search" */}
      {/*     placeholder="Search..." */}
      {/*     className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" */}
      {/*   /> */}
      {/* </div> */}
      {/* <DropdownMenu> */}
      {/*   <DropdownMenuTrigger asChild> */}
      {/*     <Button */}
      {/*       variant="outline" */}
      {/*       size="icon" */}
      {/*       className="overflow-hidden rounded-full" */}
      {/*     > */}
      {/*       <Image */}
      {/*         src="/placeholder-user.jpg" */}
      {/*         width={36} */}
      {/*         height={36} */}
      {/*         alt="Avatar" */}
      {/*         className="overflow-hidden rounded-full" */}
      {/*       /> */}
      {/*     </Button> */}
      {/*   </DropdownMenuTrigger> */}
      {/*   <DropdownMenuContent align="end"> */}
      {/*     <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
      {/*     <DropdownMenuSeparator /> */}
      {/*     <DropdownMenuItem>Settings</DropdownMenuItem> */}
      {/*     <DropdownMenuItem>Support</DropdownMenuItem> */}
      {/*     <DropdownMenuSeparator /> */}
      {/*     <DropdownMenuItem>Logout</DropdownMenuItem> */}
      {/*   </DropdownMenuContent> */}
      {/* </DropdownMenu> */}
    </header>
  );
}
