import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const documentId = queryParams.id

   try {
      const document = await prisma.document.update({
         where: {
            id: +documentId
         },
         data: {
            isDeleted: true,
         }
      });
      setResponseStatus(event, 200)
      return document
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})