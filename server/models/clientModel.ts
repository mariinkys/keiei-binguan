import { Client, Document, Gender } from "@prisma/client";
import moment from 'moment';

export type ClientModel = {
   id: number | null,
   name: string,
   firstSurname: string | null,
   secondSurname: string | null,
   genderId: number | null,
   gender: Gender | null,
   country: string | null,
   birthDate: Date | null,
   document: Document | null,
   notes: string | null,
   isDeleted: boolean,
   createdAt: Date,
   updatedAt: Date,
}

export function mapPrismaClientModel(prismaModel: Client): ClientModel {
   return {
      id: prismaModel.id,
      name: prismaModel.name,
      firstSurname: prismaModel.firstSurname,
      secondSurname: prismaModel.secondSurname,
      genderId: prismaModel.genderId,
      gender: null,
      country: prismaModel.country,
      birthDate: new Date(moment(prismaModel.birthDate).format("YYYY-MM-DD")),
      document: null,
      notes: prismaModel.notes,
      isDeleted: prismaModel.isDeleted,
      createdAt: prismaModel.createdAt,
      updatedAt: prismaModel.updatedAt
   };
}

export function initDefaultClient(): ClientModel {
   return {
      id: null,
      name: "",
      firstSurname: null,
      secondSurname: null,
      genderId: null,
      gender: null,
      country: null,
      birthDate: new Date,
      document: null,
      notes: null,
      isDeleted: false,
      createdAt: new Date,
      updatedAt: new Date
   };
}