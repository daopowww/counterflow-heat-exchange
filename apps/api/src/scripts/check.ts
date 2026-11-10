import { prisma } from "../lib/prisma.js";

try {
  const variantCount = await prisma.calculationVariant.count();
  console.log(variantCount);
} finally {
  await prisma.$disconnect();
}
