"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CustomImage = ({
	src,
	size,
	alt,
	className,
}: {
	src: string;
	size: string;
	alt: string;
	className?: string;
}) => {
	const imageLoader = ({
		src,
		quality = 0,
		width,
	}: {
		width: number;
		quality?: number;
		src: string;
	}) => {
		const query = [`w=${width}`];
		if (quality) query.push(`q=${quality}`);
		const queryStr = query.join("&");
		console.log(width);
		return `/api/image-manager/view/${src}?${queryStr}`;
	};
	return (
		<div className={cn("relative w-full h-full", className)}>
			<Image
				sizes={size}
				fill
				priority
				alt={alt}
				className="object-cover h-full w-full"
				src={src}
				loader={({ src }) => `/api/image-manager/view/${src}?thumb=true`}
			/>
			<Image
				sizes={size}
				fill
				alt={alt}
				className="object-cover h-full w-full"
				src={src}
				loader={imageLoader}
			/>
		</div>
	);
};

export default CustomImage;
