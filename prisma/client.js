// import { PrismaClient } from '@prisma/client'

// declare global{
//     namespace NodeJS{
//         interface Global{}
//     }
// }

// interface CustomNodeJSGlobal extends NodeJS.Global{
//     prisma: PrismaClient
// }

// declare const global: CustomNodeJSGlobal

// const prisma = globalThis.prisma || new PrismaClient()
// if(process.env.NODE_ENV === "development") global.prisma = prisma

// export default prisma
import { PrismaClient } from "@prisma/client"

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client