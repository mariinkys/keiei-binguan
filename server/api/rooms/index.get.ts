import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const rooms = await prisma.room.findMany({
         where: {
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return rooms
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})