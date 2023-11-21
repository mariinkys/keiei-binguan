import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const genderId = queryParams.id

   try {
      const gender = await prisma.gender.findUnique({
         where: {
            id: +genderId,
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return gender
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})