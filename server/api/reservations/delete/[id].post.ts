import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const reservationId = queryParams.id

   const date = new Date(Date.now())

   try {
      const reservation = await prisma.reservation.update({
         where: {
            id: +reservationId
         },
         data: {
            isDeleted: true,
            updatedAt: date
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