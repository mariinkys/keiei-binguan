import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const roomId = queryParams.id

   const data = await readBody(event)
   const body = data.body

   try {
      const room = await prisma.room.update({
         where: {
            id: +roomId
         },
         data: {
            name: body.name,
         }
      });
      setResponseStatus(event, 200)
      return room
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})