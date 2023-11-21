import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const clientId = queryParams.id

   const date = new Date(Date.now())

   try {
      const client = await prisma.client.update({
         where: {
            id: +clientId
         },
         data: {
            isDeleted: true,
            updatedAt: date
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