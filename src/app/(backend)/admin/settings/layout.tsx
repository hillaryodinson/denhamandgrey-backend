import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";

function SettingsLayout({
	children,
	socials,
}: {
	children: React.ReactNode;
	socials: React.ReactNode;
}) {
	return (
		<div className="flex flex-col w-full">
			<Tabs defaultValue="settings" className="w-full">
				<TabsList className="w-full justify-start">
					<TabsTrigger value="settings" className="md:w-[200px]">
						Settings
					</TabsTrigger>
					<TabsTrigger value="socials" className="md:w-[200px]">
						Socials
					</TabsTrigger>
					<TabsTrigger value="tab2" className="md:w-[200px]">
						Tab 2
					</TabsTrigger>
					<TabsTrigger value="tab3" className="md:w-[200px]">
						Tab 3
					</TabsTrigger>
					<TabsTrigger value="password" className="md:w-[200px]">
						Others
					</TabsTrigger>
				</TabsList>
				<TabsContent value="settings">{children}</TabsContent>
				<TabsContent value="socials">
					<h1>{socials}</h1>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default SettingsLayout;
