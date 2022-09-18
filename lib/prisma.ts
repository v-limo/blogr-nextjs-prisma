import { PrismaClient } from "@prisma/client"

let prismas: PrismaClient

if (process.env.NODE_ENV === "production") {
  prismas = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prismas = global.prisma
}

export default prismas
