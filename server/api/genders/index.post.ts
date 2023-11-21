import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const gender = await prisma.gender.create({
         data: {
            name: body.name,
            isDeleted: false,
         }
      });
      setResponseStatus(event, 200)
      return gender
   } catch (error) {
      setResponseStatus(event, 404)
      return event
   }
})