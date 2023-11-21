import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const clientId = queryParams.id

   try {
      const client = await prisma.client.findUnique({
         where: {
            id: +clientId,
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return client
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})