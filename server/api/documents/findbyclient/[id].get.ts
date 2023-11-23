import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const clientId = queryParams.id

   try {
      const document = await prisma.document.findUnique({
         where: {
            clientId: +clientId,
            isDeleted: false
         },
         
      });
      setResponseStatus(event, 200)
      return document
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})