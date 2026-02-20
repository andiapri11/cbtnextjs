/*
  Warnings:

  - A unique constraint covering the columns `[slug,schoolId]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,schoolId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Exam_slug_idx` ON `exam`;

-- DropIndex
DROP INDEX `Exam_slug_key` ON `exam`;

-- DropIndex
DROP INDEX `Subject_name_key` ON `subject`;

-- AlterTable
ALTER TABLE `exam` ADD COLUMN `schoolId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subject` ADD COLUMN `schoolId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `schoolId` VARCHAR(191) NULL,
    MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE `School` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `address` TEXT NULL,
    `logo` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'EXPIRED', 'TRIAL') NOT NULL DEFAULT 'TRIAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `School_slug_key`(`slug`),
    INDEX `School_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(191) NOT NULL,
    `schoolId` VARCHAR(191) NOT NULL,
    `planName` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'EXPIRED', 'TRIAL') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Subscription_schoolId_key`(`schoolId`),
    INDEX `Subscription_schoolId_idx`(`schoolId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Exam_schoolId_idx` ON `Exam`(`schoolId`);

-- CreateIndex
CREATE UNIQUE INDEX `Exam_slug_schoolId_key` ON `Exam`(`slug`, `schoolId`);

-- CreateIndex
CREATE INDEX `Subject_schoolId_idx` ON `Subject`(`schoolId`);

-- CreateIndex
CREATE UNIQUE INDEX `Subject_name_schoolId_key` ON `Subject`(`name`, `schoolId`);

-- CreateIndex
CREATE INDEX `User_schoolId_idx` ON `User`(`schoolId`);

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
