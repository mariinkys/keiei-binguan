import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const clients = await prisma.client.findMany({
         where: {
            isDeleted: false
         },
         include: {
            gender: true,
            document: true,
         }
      });
      setResponseStatus(event, 200)
      return clients
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})