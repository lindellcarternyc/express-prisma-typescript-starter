import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

const main = async () => {
  await prisma.user.deleteMany({})

  const lindell = await prisma.user.create({
    data: {
      email: 'email@email.com',
      username: 'lindell',
      password: '$2y$12$sYpXl8QlkWvTkdgnfMeskuSJWLLqJGXsRafn2FrFVjBzYEzBW0SMK'
    }
  })

  const jason = await prisma.user.create({
    data: {
      email: 'jason@email.com',
      username: 'jason.derulo',
      password: '$2y$12$sYpXl8QlkWvTkdgnfMeskuSJWLLqJGXsRafn2FrFVjBzYEzBW0SMK'
    }
  })
}

main()
  .finally(async () => await prisma.$disconnect())