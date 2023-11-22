import { DocumentType } from "@prisma/client";

export type DocumentTypeModel = {
   id: number | null,
   name: string,
   isDeleted: boolean,
}

export function mapPrismaDocumentTypeModel(prismaModel: DocumentType): DocumentTypeModel {
   return {
      id: prismaModel.id,
      name: prismaModel.name,
      isDeleted: prismaModel.isDeleted,
   };
}

export function initDefaultDocumentType(): DocumentTypeModel {
   return {
      id: null,
      name: "",
      isDeleted: false,
   };
}