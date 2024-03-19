/*
  Warnings:

  - You are about to alter the column `created_at` on the `UserBooks` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("time")` to `DateTime`.
  - You are about to alter the column `updated_at` on the `UserBooks` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("time")` to `DateTime`.
  - You are about to alter the column `user_id` on the `UserBooks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("time")` to `DateTime`.
  - You are about to alter the column `updated_at` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("time")` to `DateTime`.
  - Made the column `chapter` on table `UserBooks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `UserBooks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `UserBooks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `key_word` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserBooks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "chapter" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "UserBooks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserBooks" ("chapter", "created_at", "id", "updated_at", "user_id") SELECT "chapter", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "id", "updated_at", "user_id" FROM "UserBooks";
DROP TABLE "UserBooks";
ALTER TABLE "new_UserBooks" RENAME TO "UserBooks";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "key_word" TEXT NOT NULL,
    "is_verify" tinyint(1),
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("created_at", "id", "is_verify", "key_word", "name", "question", "updated_at") SELECT coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "id", "is_verify", "key_word", "name", "question", "updated_at" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
