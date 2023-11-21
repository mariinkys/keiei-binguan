import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const e = await prisma.documentType.findMany();
      setResponseStatus(event, 200)
      return e
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})