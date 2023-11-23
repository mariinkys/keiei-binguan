import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const documentId = queryParams.id

   const data = await readBody(event)
   const body = data.body

   const date = new Date(Date.now())

   try {
      const document = await prisma.document.update({
         where: {
            id: +documentId
         },
         data: {
            expeditonDate: body.expeditonDate,
            documentValue: body.documentValue,
            documentType: {
               connect: {
                  id: +body.documentTypeId
               }
            },
            client: {
               connect: {
                  id: +body.clientId
               }
            },
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return document
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})