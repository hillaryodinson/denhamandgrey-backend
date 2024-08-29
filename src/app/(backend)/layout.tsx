import AdminNavbar from "@/components/custom/layout/admin/navbar";
import SectionWrapper from "@/components/custom/layout/section-wrapper";
import { auth } from "@/server/auth";
import { useRouter } from "next/router";

function adminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<AdminNavbar />
			<SectionWrapper>
				<main className="flex flex-1 flex-col gap-4 pt-4 md:gap-8 md:pt-8">
					{children}
				</main>
			</SectionWrapper>
		</div>
	);
}

export default adminLayout;
