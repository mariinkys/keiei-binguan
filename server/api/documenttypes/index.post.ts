import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const documentType = await prisma.documentType.create({
         data: {
            name: body.name,
            isDeleted: false,
         }
      });
      setResponseStatus(event, 200)
      return documentType
   } catch (error) {
      setResponseStatus(event, 404)
      return event
   }
})