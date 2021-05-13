/*
  Warnings:

  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
ADD PRIMARY KEY ("userId", "roleId");
