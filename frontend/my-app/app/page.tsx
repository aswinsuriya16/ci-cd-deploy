import { PrismaClient } from "@prisma/client";
import Image from "next/image";

export default async function Home() {
  const prismaClient = new PrismaClient();
  const user = await prismaClient.user.findFirst();
  return <div>
    {JSON.stringify(user)}
  </div>
}
