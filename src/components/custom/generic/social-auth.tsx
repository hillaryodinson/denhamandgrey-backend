import { doSocialLogin } from "@/app/(public)/actions";
import { Button } from "@/components/ui/button";
import React from "react";

const SocialAuth = () => {
	return (
		<form action={doSocialLogin}>
			<div className="flex justify-between space-x-1">
				<Button
					className="w-full"
					variant="outline"
					type="submit"
					name="action"
					value="google">
					Google
				</Button>
				<Button
					className="w-full"
					variant="outline"
					type="submit"
					name="action"
					value="github">
					Github
				</Button>
			</div>
		</form>
	);
};

export default SocialAuth;
