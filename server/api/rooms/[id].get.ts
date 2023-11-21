import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const roomId = queryParams.id

   try {
      const room = await prisma.room.findUnique({
         where: {
            id: +roomId,
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return room
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})