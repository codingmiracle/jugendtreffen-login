import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const checkinOverview = async () => {
  const participations = await db.participation.findMany({
    select: {
      id: true,
      checkinConfirmed: true,
      personalData: {
        select: {
          name: true,
          familyName: true,
          userId: true,
        },
      },
    },
  })

  return participations.map((p) => ({
    id: p.id,
    name: p.personalData.name,
    familyName: p.personalData.familyName,
    checkinConfirmed: p.checkinConfirmed ?? false,
  }))
}

export const checkinDetails = async ({
  participationId,
}: {
  participationId: bigint
}) => {
  const participation = await db.participation.findUnique({
    where: { id: participationId },
    select: {
      id: true,
      personalData: {
        select: {
          name: true,
          familyName: true,
          birthdate: true,
          email: true, // Again, must exist in schema
        },
      },
    },
  })

  if (!participation) {
    throw new Error(`Participation with ID ${participationId} not found`)
  }

  const birthdate = participation.personalData.birthdate

  return {
    id: participation.id,
    name: participation.personalData.name,
    familyName: participation.personalData.familyName,
    email: participation.personalData.email,
    age,
  }
}
