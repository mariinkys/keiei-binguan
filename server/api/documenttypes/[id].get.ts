import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const documentTypeId = queryParams.id

   try {
      const documentType = await prisma.documentType.findUnique({
         where: {
            id: +documentTypeId,
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return documentType
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})