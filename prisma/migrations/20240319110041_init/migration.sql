-- CreateTable
CREATE TABLE "UserBooks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" BIGINT,
    "chapter" TEXT,
    "created_at" time,
    "updated_at" time
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "question" TEXT,
    "key_word" TEXT,
    "is_verify" tinyint(1),
    "created_at" time,
    "updated_at" time
);
