import "@/styles/globals.css";

// import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import BaseProvider from "./base";

export const metadata: Metadata = {
	title: "Welcome",
	description: "Denham & gray",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="">
			<body>
				<BaseProvider>{children}</BaseProvider>
			</body>
		</html>
	);
}
