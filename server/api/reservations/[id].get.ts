import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const reservationId = queryParams.id

   try {
      const reservation = await prisma.reservation.findUnique({
         where: {
            id: +reservationId,
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return reservation
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})