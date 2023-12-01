import { Client } from "@prisma/client";

export type ReservationGuestsModel = {
   id: number | null,
   guestId: number | null,
   guest: Client | null,
   reservationId: number | null,
}