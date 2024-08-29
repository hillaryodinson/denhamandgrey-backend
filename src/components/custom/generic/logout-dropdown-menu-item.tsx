"use client";
import { doLogout } from "@/app/(public)/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const LogoutMenuItem = () => {
	const handleLogout = async () => {
		try {
			await doLogout(); // Redirect to the homepage after logout
		} catch (error) {
			console.error("Logout error:", error);
		}
	};
	return (
		<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
			Log Out
		</DropdownMenuItem>
	);
};

export default LogoutMenuItem;
