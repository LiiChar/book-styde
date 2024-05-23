import WorkUpdateEditor from '@/components/pages/admin/work/WorkUpdateEditor';
import { PrismaClient, Work } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
	params: {
		chapter: string;
    work: number;
	};
}

const getWorkById = async (id: number) => {
  const prisma = new PrismaClient();
  const WORK = prisma.work

  try {
    const work = await WORK.findFirstOrThrow({
      where: {
        id
      }
    })
    return work;
  } catch (error) {
    return null
  } finally {
    prisma.$disconnect()
  }
}

export default async function UpdateWork({params}: Props) {
  const work: Work | null = await getWorkById(params.work)
  
  if (!work) {
    return redirect(`admin/work/${params.chapter}`)
  }

  return (
    <section>
      <WorkUpdateEditor work={work}/>
    </section>
  )
}
