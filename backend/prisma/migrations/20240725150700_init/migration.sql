-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_type" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "company_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pack" (
    "id" SERIAL NOT NULL,
    "packName" TEXT NOT NULL,

    CONSTRAINT "user_pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_type" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "car_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_dispo" (
    "id" SERIAL NOT NULL,
    "goingTo" TEXT,
    "startDay" TEXT,
    "endDay" TEXT,
    "startAt" TEXT,
    "endAt" TEXT,
    "comment" TEXT,
    "userId" INTEGER,

    CONSTRAINT "user_dispo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(20),
    "lastName" VARCHAR(20),
    "phone" VARCHAR(20),
    "email" VARCHAR(100) NOT NULL,
    "companyName" VARCHAR(50),
    "city" VARCHAR(20),
    "country" VARCHAR(20),
    "address" VARCHAR(50),
    "websiteUrl" VARCHAR(50),
    "commercialRegister" VARCHAR(20),
    "patent" VARCHAR(20),
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR(255) NOT NULL,
    "resetPasswordToken" VARCHAR(255),
    "carNumber" TEXT,
    "carWidth" DOUBLE PRECISION,
    "carHeight" DOUBLE PRECISION,
    "carWeight" DOUBLE PRECISION,
    "carTypeId" INTEGER,
    "companyTypeId" INTEGER,
    "userPackId" INTEGER,
    "roleId" INTEGER DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "category" TEXT,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_dispo_userId_key" ON "user_dispo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "article_title_key" ON "article"("title");

-- AddForeignKey
ALTER TABLE "user_dispo" ADD CONSTRAINT "user_dispo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "car_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyTypeId_fkey" FOREIGN KEY ("companyTypeId") REFERENCES "company_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userPackId_fkey" FOREIGN KEY ("userPackId") REFERENCES "user_pack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
