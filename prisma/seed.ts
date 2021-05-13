import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

const main = async () => {
  await prisma.user.deleteMany({})

  const lindell = await prisma.user.create({
    data: {
      email: 'email@email.com',
      username: 'lindell',
      password: 'password123'
    }
  })

  const jason = await prisma.user.create({
    data: {
      email: 'jason@email.com',
      username: 'jason.derulo',
      password: 'password'
    }
  })
}

main()
  .finally(async () => await prisma.$disconnect())