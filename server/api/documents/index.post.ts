import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const document = await prisma.document.upsert({
         where: {
            clientId: +body.clientId
         },
         create: {
            expeditonDate: body.expeditionDate,
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
         },
         update: {
            expeditonDate: body.expeditionDate,
            documentValue: body.documentValue,
            documentType: {
               connect: {
                  id: +body.documentTypeId
               }
            }
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