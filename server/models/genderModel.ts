import { Gender } from "@prisma/client";

export type GenderModel = {
   id: number | null,
   name: string,
   isDeleted: boolean,
}

export function mapPrismaGenderModel(prismaModel: Gender): GenderModel {
   return {
      id: prismaModel.id,
      name: prismaModel.name,
      isDeleted: prismaModel.isDeleted,
   };
}

export function initDefaultGender(): GenderModel {
   return {
      id: null,
      name: "",
      isDeleted: false,
   };
}