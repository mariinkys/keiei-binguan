import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const genderId = queryParams.id

   const data = await readBody(event)
   const body = data.body

   try {
      const gender = await prisma.gender.update({
         where: {
            id: +genderId
         },
         data: {
            name: body.name,
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