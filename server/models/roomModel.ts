import { Room } from "@prisma/client";

export type RoomModel = {
   id: number | null,
   name: string,
   isDeleted: boolean,
}

export function mapPrismaRoomModel(prismaModel: Room): RoomModel {
   return {
      id: prismaModel.id,
      name: prismaModel.name,
      isDeleted: prismaModel.isDeleted,
   };
}

export function initDefaultRoom(): RoomModel {
   return {
      id: null,
      name: "",
      isDeleted: false,
   };
}