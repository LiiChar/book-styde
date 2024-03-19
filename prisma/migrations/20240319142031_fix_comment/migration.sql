/*
  Warnings:

  - You are about to alter the column `is_verify` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("tinyint(1)")` to `Boolean`.
  - Added the required column `book_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_verify` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("content", "created_at", "id", "rate", "updated_at", "user_id") SELECT "content", "created_at", "id", "rate", "updated_at", "user_id" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "key_word" TEXT NOT NULL,
    "is_verify" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("created_at", "id", "is_verify", "key_word", "name", "question", "updated_at") SELECT "created_at", "id", "is_verify", "key_word", "name", "question", "updated_at" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
