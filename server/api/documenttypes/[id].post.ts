import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const documentTypeId = queryParams.id

   const data = await readBody(event)
   const body = data.body

   try {
      const documentType = await prisma.documentType.update({
         where: {
            id: +documentTypeId
         },
         data: {
            name: body.name,
         }
      });
      setResponseStatus(event, 200)
      return documentType
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})