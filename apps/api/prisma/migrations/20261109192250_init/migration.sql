-- CreateTable
CREATE TABLE "CalculationVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bedHeight" DOUBLE PRECISION NOT NULL,
    "materialInletTemp" DOUBLE PRECISION NOT NULL,
    "gasVelocity" DOUBLE PRECISION NOT NULL,
    "gasVolumetricHeatCapacity" DOUBLE PRECISION NOT NULL,
    "materialMassFlow" DOUBLE PRECISION NOT NULL,
    "gasInletTemp" DOUBLE PRECISION NOT NULL,
    "materialSpecificHeatCapacity" DOUBLE PRECISION NOT NULL,
    "volumetricHeatTransferCoefficient" DOUBLE PRECISION NOT NULL,
    "apparatusDiameter" DOUBLE PRECISION NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculationVariant_pkey" PRIMARY KEY ("id")
);
