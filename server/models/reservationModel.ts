import { Client, Reservation, Room } from "@prisma/client";

export type ReservationModel = {
   id: number | null,
   clientId: number | null,
   client: Client | null,
   roomId: number | null,
   room: Room | null,
   checkInDate: Date,
   checkOutDate: Date,
   isDeleted: boolean,
   createdAt: Date,
   updatedAt: Date,
}

export function mapPrismaReservationModel(prismaModel: Reservation): ReservationModel {
   return {
      id: prismaModel.id,
      clientId: prismaModel.clientId,
      client: null,
      roomId: prismaModel.roomId,
      room: null,
      checkInDate: prismaModel.checkInDate,
      checkOutDate: prismaModel.checkOutDate,
      isDeleted: prismaModel.isDeleted,
      createdAt: prismaModel.createdAt,
      updatedAt: prismaModel.updatedAt
   };
}

export function initDefaultReservation(): ReservationModel {
   return {
      id: null,
      clientId: null,
      client: null,
      roomId: null,
      room: null,
      checkInDate: new Date,
      checkOutDate: new Date,
      isDeleted: false,
      createdAt: new Date,
      updatedAt: new Date
   };
}