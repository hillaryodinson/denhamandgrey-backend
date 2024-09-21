import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function GET(
	req: NextRequest,
	{ params }: { params: { src: string } }
) {
	const queryParams = req.nextUrl.searchParams;
	const src = params.src;
	const width = queryParams.get("w");
	const quality = queryParams.get("q");
	const isthumb = queryParams.get("thumb");

	console.log("SRC: ", src, quality, width);

	if (!src) {
		throw Error("Not a valid image");
	}

	const basename = path.basename(src, path.extname(src));

	if (isthumb) {
		//get the thumbnail image
		const thumbnailPath = path.join(
			process.cwd(),
			`/public/uploads/${basename}-thumb.jpg`
		);
		const thumbnail = readFileSync(thumbnailPath);

		return new Response(thumbnail);
	}

	//get the image path
	const imagePath = path.join(process.cwd(), `/public/uploads/${src}`);
	const image = readFileSync(imagePath);
	const imageBuffer = await sharp(image)
		.png({
			quality: quality ? Number(quality) : 75,
		})
		.resize(Number(width))
		.toBuffer();
	return new Response(imageBuffer);
}
