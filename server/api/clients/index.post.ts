import prisma from './../../db/prisma';

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body

   try {
      const client = await prisma.client.create({
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
            document: {
               connect: {
                  id: +body.documentId
               }
            },
            isDeleted: false,
         }
      });
      setResponseStatus(event, 200)
      return client
   } catch (error) {
      setResponseStatus(event, 404)
      return event
   }
})