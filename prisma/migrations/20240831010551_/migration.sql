/*
  Warnings:

  - You are about to drop the `MemberSocials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Socials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MemberSocials" DROP CONSTRAINT "MemberSocials_membersId_fkey";

-- DropTable
DROP TABLE "MemberSocials";

-- DropTable
DROP TABLE "Members";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "Socials";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "type" "MemberType" NOT NULL DEFAULT 'management',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberSocial" (
    "id" TEXT NOT NULL,
    "socialsId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "membersId" TEXT,

    CONSTRAINT "MemberSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberSocial" ADD CONSTRAINT "MemberSocial_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
