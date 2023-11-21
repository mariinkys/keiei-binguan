import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const reservation = await prisma.reservation.create({
         data: {
            checkInDate: body.checkInDate,
            checkOutDate: body.checkOutDate,
            client: {
               connect: {
                  id: +body.clientId
               }
            },
            room: {
               connect: {
                  id: +body.roomId
               }
            },
            isDeleted: false,
         }
      });
      setResponseStatus(event, 200)
      return reservation
   } catch (error) {
      setResponseStatus(event, 404)
      return event
   }
})