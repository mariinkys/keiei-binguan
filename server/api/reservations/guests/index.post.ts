import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const reservationGuest = await prisma.reservationGuests.findMany({
         where: {
            guestId: body.guestId,
            reservationId: body.reservationId,
         }
      });
      const reservation = await prisma.reservation.findUnique({
         where: {
            id: +body.reservationId
         }
      })
      setResponseStatus(event, 404)

      if (reservationGuest.length === 0 && (reservation?.clientId != body.guestId)) {
         await prisma.reservationGuests.create({
            data: {
               guestId: body.guestId,
               reservationId: body.reservationId,
            }
         });
         setResponseStatus(event, 200)
      }

      return event
   } catch (error) {
      setResponseStatus(event, 404)
      return event
   }
})