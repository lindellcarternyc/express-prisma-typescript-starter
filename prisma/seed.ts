import { PrismaClient } from '@prisma/client' 
import { encodePassword } from '../src/controllers/utils/auth.utils'

const prisma = new PrismaClient()

const main = async () => {
  const password = await encodePassword('password123')

  await prisma.userRole.deleteMany({})
  console.log('deleted all user roles')

  await prisma.role.deleteMany({})
  console.log('deleted all roles')

  await prisma.user.deleteMany({})
  console.log('deleted all users')

  const adminRole = await prisma.role.create({
    data: {
      name: 'admin'
    }
  })
  console.log({adminRole})

  const userRole = await prisma.role.create({
    data: {
      name: 'user'
    }
  })
  console.log({userRole})

  const lindell = await prisma.user.create({
    data: {
      username: 'lindell',
      password, // password123
      email: 'email@email.com'
    }
  })
  await prisma.userRole.create({
    data: {
      user: {
        connect: {
          id: lindell.id
        }
      },
      role: {
        connect: {
          id: userRole.id
        }
      }
    }
  })
  await prisma.userRole.create({
    data: {
      userId: lindell.id,
      roleId: adminRole.id
    }
  })
  console.log({ lindell })

  const jason = await prisma.user.create({
    data: {
      username: 'jason',
      password, // password123
      email: 'email2@email.com'
    },
    include: {
      roles: true
    }
  })
  await prisma.userRole.create({
    data: {
      user: {
        connect: {
          id: jason.id
        }
      },
      role: {
        connect: {
          id: userRole.id
        }
      }
    }
  })
}

main()
  .then(() => console.log('we did it!'))
  .catch(err => console.log(err))
  .finally(async () => await prisma.$disconnect())