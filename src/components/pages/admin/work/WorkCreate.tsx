import { PrismaClient, Work } from "@prisma/client"


// 
const createWork = async (chapterId: number, work: Omit<Work, 'id' | 'updated_at' | 'created_at'>) => {
    'use client'
    const prisma = new PrismaClient();
    const WORK = prisma.work
  
    try {
        WORK.create({
            data: {
                ...work
            }
        })
    } catch (error) {
      console.log(error)
    } finally {
      prisma.$disconnect()
    }
}

interface Props {
    chapterId: number
}

export const WorkCreate = ({}: Props) => {
  return (
    <div>WorkCreate</div>
  )
}
