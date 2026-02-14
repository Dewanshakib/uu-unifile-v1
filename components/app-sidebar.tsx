"use client";

import * as React from "react";
import {
  ChartBarStacked,
  Chromium,
  Files,
  FolderOpen,
  LayoutTemplate,
  LibraryBig,
  Undo2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;

  const dataForSuperAdmin = {
    navMain: [
      {
        title: "Category",
        url: "#",
        icon: ChartBarStacked,
        items: [
          {
            title: "Manage Categories",
            url: "/dashboard/category",
          },
        ],
      },
      {
        title: "Subject",
        url: "#",
        icon: LibraryBig,
        items: [
          {
            title: "Manage Subjects",
            url: "/dashboard/subject",
          },
        ],
      },
      {
        title: "File",
        url: "#",
        icon: Files,
        items: [
          {
            title: "Manage Files",
            url: "/dashboard/file",
          },
        ],
      },
      {
        title: "Google Classroom",
        url: "#",
        icon: Chromium,
        items: [
          {
            title: "Manage Google Classrooms",
            url: "/dashboard/google-classroom",
          },
        ],
      },
      {
        title: "Go back to the app",
        url: "/",
        icon: Undo2,
      },
    ],
  };

  const dataForAdmin = {
    navMain: [
      {
        title: "File",
        url: "#",
        icon: Files,
        items: [
          {
            title: "Manage Files",
            url: "/dashboard/file",
          },
        ],
      },
      {
        title: "Google Classroom",
        url: "#",
        icon: Chromium,
        items: [
          {
            title: "Manage Google Classrooms",
            url: "/dashboard/google-classroom",
          },
        ],
      },
      {
        title: "Go back to the app",
        url: "/",
        icon: Undo2,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <FolderOpen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-xl">Unifile</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            session?.user.role === "SUPER_ADMIN"
              ? dataForSuperAdmin.navMain
              : dataForAdmin.navMain
          }
        />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}