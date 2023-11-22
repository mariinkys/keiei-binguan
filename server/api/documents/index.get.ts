import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const documents = await prisma.document.findMany({
         where: {
            isDeleted: false
         },
         include: {
            documentType: true,
            client: true,
         }
      });
      setResponseStatus(event, 200)
      return documents
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})