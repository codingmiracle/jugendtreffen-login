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
