/*
  Warnings:

  - You are about to drop the `MemberSocial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Social` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MemberSocial" DROP CONSTRAINT "MemberSocial_membersId_fkey";

-- DropTable
DROP TABLE "MemberSocial";

-- DropTable
DROP TABLE "Social";

-- CreateTable
CREATE TABLE "MemberSocialLinks" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "membersId" TEXT,

    CONSTRAINT "MemberSocialLinks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberSocialLinks" ADD CONSTRAINT "MemberSocialLinks_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
