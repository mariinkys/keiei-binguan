import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const queryParams = getRouterParams(event)
   const clientId = queryParams.id

   const data = await readBody(event)
   const body = data.body

   const date = new Date(Date.now())

   try {
      const client = await prisma.client.update({
         where: {
            id: +clientId
         },
         data: {
            name: body.name,
            firstSurname: body.firstSurname,
            secondSurname: body.secondSurname,
            country: body.country,
            birthDate: body.birthDate,
            notes: body.notes,
            gender: {
               connect: {
                  id: +body.genderId
               }
            },
            isDeleted: false,
            updatedAt: date
         }
      });
      setResponseStatus(event, 200)
      return client
   } catch (error) {
      console.log(error)
      setResponseStatus(event, 404)
      return event
   }
})