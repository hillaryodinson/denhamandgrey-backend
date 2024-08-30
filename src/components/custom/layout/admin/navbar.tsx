import React from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Package2, Menu, Search, CircleUser, ArrowUpRight } from "lucide-react";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { auth } from "@/server/auth";
import LogoutMenuItem from "../../generic/logout-dropdown-menu-item";

async function AdminNavbar() {
	const session = await auth();

	const menus = [
		{
			title: "Dashboard",
			url: "/admin/",
		},
		{
			title: "Members",
			url: "/admin/members",
		},
		{
			title: "Faq",
			url: "/admin/faqs",
		},
		{
			title: "Services",
			url: "/admin/services",
		},
		{
			title: "Settings",
			url: "/admin/settings",
		},
		{
			title: "Accounts",
			url: "/admin/accounts",
		},
	];
	console.log(session);
	return (
		<header className="sticky top-0 z-[100] flex h-16 items-center gap-4 border-b bg-white/75 px-4 backdrop-blur-lg md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link
					href="#"
					className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Package2 className="h-6 w-6" />
					<span className="sr-only">Acme Inc</span>
				</Link>
				{menus.map((menu) => (
					<Link
						key={menu.title}
						href={menu.url}
						className="text-foreground transition-colors hover:text-foreground">
						{menu.title}
					</Link>
				))}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="px-4 backdrop-blur-sm">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold">
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</Link>
						{menus.map((menu) => (
							<Link
								key={menu.title}
								href={menu.url}
								className="hover:text-foreground">
								{menu.title}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<Link
					href="/"
					className={cn(buttonVariants({ size: "sm" }), "ml-auto gap-1")}
					target="_blank">
					View Site
					<ArrowUpRight className="h-4 w-4" />
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<Avatar className="rounded-full">
								<AvatarImage
									src={session?.user?.image || undefined}
									alt="@avatar"
								/>
								<AvatarFallback>
									<CircleUser className="h-5 w-5" />
								</AvatarFallback>
							</Avatar>
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LogoutMenuItem />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}

export default AdminNavbar;
