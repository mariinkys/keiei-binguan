import type { ReservationGuestsModel } from '@/server/models/reservationGuestModel';
import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const reservationId = queryParams.id

   try {
      const reservationGuests = await prisma.reservationGuests.findMany({
         where: {
            reservationId: +reservationId,
         }
      });

      const clientIds = reservationGuests.map((guest) => guest.guestId);
      const guests = await prisma.client.findMany({
         where: {
            id: {
               in: clientIds,
            },
         },
      });

      var res = new Array<ReservationGuestsModel>();
      for (let i = 0; i < reservationGuests.length; i++) {
         const val: ReservationGuestsModel = {
            id: reservationGuests[i].id,
            guestId: reservationGuests[i].guestId,
            reservationId: reservationGuests[i].reservationId,
            guest: guests[i]
         }
         res[i] = val;
      }

      setResponseStatus(event, 200)
      return res
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})