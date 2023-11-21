import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const reservations = await prisma.reservation.findMany({
         where: {
            isDeleted: false
         },
         include: {
            client: true,
            room: true,
         }
      });
      setResponseStatus(event, 200)
      return reservations
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})