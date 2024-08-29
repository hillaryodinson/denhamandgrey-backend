"use client";
// import { AlertDialogProvider } from "@/components/custom/generic/alert-dialog";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function BaseProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		// <AlertDialogProvider>
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<ToastContainer />
		</>
		// </AlertDialogProvider>
	);
}
