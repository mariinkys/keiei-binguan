import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const document = await prisma.document.create({
         data: {
            expeditonDate: body.expeditonDate,
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
      setResponseStatus(event, 404)
      return event
   }
})