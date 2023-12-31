import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const documentTypes = await prisma.documentType.findMany({
         where: {
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return documentTypes
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})