// option 1
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export default prisma;

// option 2
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

// $lib/prisma.js

// option 3
// import Prisma from "@prisma/client";

// export let prisma;

// if (Prisma === undefined) {
// 	import("@prisma/client").then(({ PrismaClient }) => {
// 		prisma = new PrismaClient();
// 	});
// } else {
// 	prisma = new Prisma.PrismaClient();
// }
