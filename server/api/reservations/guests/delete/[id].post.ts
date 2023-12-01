import prisma from './../../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const reservationGuestId = queryParams.id

   try {
      await prisma.reservationGuests.delete({
         where: {
            id: +reservationGuestId
         },
      });
      setResponseStatus(event, 200)
      return event
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})