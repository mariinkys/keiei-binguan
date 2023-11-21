import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   await prisma.documentType.create({
      data: {
         name: 'DNI',
      },
   })
   await prisma.documentType.create({
      data: {
         name: 'NIE',
      },
   })
   await prisma.documentType.create({
      data: {
         name: 'CIF',
      },
   })
   await prisma.gender.create({
      data: {
         name: 'Male',
      },
   })
   await prisma.gender.create({
      data: {
         name: 'Female',
      },
   })
   await prisma.gender.create({
      data: {
         name: 'Other',
      },
   })
}
main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })
