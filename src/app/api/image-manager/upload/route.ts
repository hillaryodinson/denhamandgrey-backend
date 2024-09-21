import { randomUUID } from "crypto";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function GET() {
	return NextResponse.json({
		status: "active",
		message: "Application api is running",
	});
}

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const image = formData.get("image");

	console.log("BLOB: ", image);

	if (!image || !(image instanceof Blob)) {
		return NextResponse.json({
			success: false,
			message: "Invalid file or image",
		});
	}

	try {
		const imageArray = await image.arrayBuffer();
		const imageName = randomUUID();
		const imageExt = path.extname(image.name);
		const baseImageName = path.basename(imageName, imageExt);

		const uploadFolder = path.join(process.cwd(), "/public/uploads/");
		if (!fs.existsSync(uploadFolder)) {
			fs.mkdirSync(uploadFolder, { recursive: true });
		}

		const thumbnailBuffer = await sharp(Buffer.from(imageArray))
			.blur(1)
			.resize(10)
			.toBuffer();

		//write the image to their right
		fs.writeFileSync(
			path.join(uploadFolder, baseImageName + imageExt),
			Buffer.from(imageArray)
		);

		//write to thumbnail
		fs.writeFileSync(
			path.join(uploadFolder, baseImageName + "-thumb.jpg"),
			thumbnailBuffer
		);

		return NextResponse.json({
			success: true,
			data: {
				image: imageName + imageExt,
				thumb: imageName + "-thumb.jpg",
			},
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				success: false,
				error,
			},
			{ status: 400 }
		);
	}
}
