import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const reservationId = queryParams.id

   const data = await readBody(event)
   const body = data.body

   const date = new Date(Date.now())

   try {
      const venta = await prisma.reservation.update({
         where: {
            id: +reservationId
         },
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
            updatedAt: date
         }
      });
      setResponseStatus(event, 200)
      return venta
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})