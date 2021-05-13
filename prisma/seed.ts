import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient()

const main = async () => {
  await prisma.role.deleteMany({})
  await prisma.user.deleteMany({})

  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN'
    }
  })

  const userRole = await prisma.role.create({
    data: {
      name: 'user'
    }
  })

  const lindell = await prisma.user.create({
    data: {
      email: 'email@email.com',
      username: 'lindell',
      password: '$2y$12$sYpXl8QlkWvTkdgnfMeskuSJWLLqJGXsRafn2FrFVjBzYEzBW0SMK',
    }
  })

  await prisma.userRole.create({
    data: {
      userId: lindell.id,
      roleId: adminRole.id
    }
  })
  await prisma.userRole.create({
    data: {
      userId: lindell.id,
      roleId: userRole.id
    }
  })

  const jason = await prisma.user.create({
    data: {
      email: 'jason@email.com',
      username: 'jason.derulo',
      password: '$2y$12$sYpXl8QlkWvTkdgnfMeskuSJWLLqJGXsRafn2FrFVjBzYEzBW0SMK'
    }
  })
  await prisma.userRole.create({
    data: {
      userId: jason.id,
      roleId: userRole.id
    }
  })
}

main()
  .finally(async () => await prisma.$disconnect())