import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   try {
      const genders = await prisma.gender.findMany({
         where: {
            isDeleted: false
         }
      });
      setResponseStatus(event, 200)
      return genders
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})