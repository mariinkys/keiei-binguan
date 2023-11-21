import prisma from './../../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const genderId = queryParams.id

   try {
      const gender = await prisma.gender.update({
         where: {
            id: +genderId
         },
         data: {
            isDeleted: true,
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