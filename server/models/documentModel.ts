import { Client, Document, DocumentType } from "@prisma/client";
import moment from 'moment';

export type DocumentModel = {
   id: number | null,
   documentTypeId: number | null,
   documentType: DocumentType | null,
   clientId: number | null,
   client: Client | null,
   expeditionDate: Date,
   documentValue: string,
   isDeleted: boolean,
}

export function mapPrismaDocumentModel(prismaModel: Document): DocumentModel {
   return {
      id: prismaModel.id,
      documentTypeId: prismaModel.documentTypeId,
      documentType: null,
      clientId: prismaModel.clientId,
      client: null,
      expeditionDate: new Date(moment(prismaModel.expeditonDate).format("YYYY-MM-DD")),
      documentValue: prismaModel.documentValue,
      isDeleted: prismaModel.isDeleted,
   };
}

export function initDefaultDocument(): DocumentModel {
   return {
      id: null,
      documentTypeId: null,
      documentType: null,
      clientId: null,
      client: null,
      expeditionDate: new Date,
      documentValue: "",
      isDeleted: false,
   };
}