-- CreateTable
CREATE TABLE "UserBooks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "chapter" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "UserBooks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserWork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "book_id" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "UserWork_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "key_word" TEXT NOT NULL,
    "group" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "is_verify" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "book_id" REAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "usersId" INTEGER NOT NULL,
    CONSTRAINT "Comments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" REAL NOT NULL,
    "visit" INTEGER NOT NULL DEFAULT 0,
    "resolve" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "explain" TEXT NOT NULL,
    "variant" TEXT,
    "code" TEXT,
    "language" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
