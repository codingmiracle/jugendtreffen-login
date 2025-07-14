import type {
  MutationResolvers,
  ParticipationRelationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { getUserEmails } from 'src/services/users/users'

export const participations: QueryResolvers['participations'] = async ({
  userId,
}) => {
  return await db.participation.findMany({
    include: { event: true, participationRole: true },
    where: { userId },
  })
}

export const participation: QueryResolvers['participation'] = ({ id }) => {
  return db.participation.findUnique({
    where: { id },
  })
}

export const participationsForCheckin: QueryResolvers['participationsForCheckin'] =
  async () => {
    const participations = await db.participation.findMany({
      select: {
        id: true,
        checkinConfirmed: true,
        userId: true,
        personalData: {
          select: {
            name: true,
            familyName: true,
            userId: true,
          },
        },
      },
    })
    const emails = await getUserEmails()

    function findEmailByUid(uid: string): string | undefined {
      const data = emails.find((row) => row.uid === uid)
      return data?.email
    }
    return participations.map((participation) => {
      return {
        id: participation.id,
        name: participation.personalData.name ?? '',
        familyName: participation.personalData.familyName ?? '',
        checkinConfirmed: participation.checkinConfirmed ?? false,
        email: findEmailByUid(participation.userId),
      }
    })
  }

export const createParticipation: MutationResolvers['createParticipation'] = ({
  input,
}) => {
  return db.participation.create({
    data: {
      travelMethod: input.travelMethod,
      accommodation: input.accommodation,
      accomodationLocation: input.accommodationLocation,
      startDate: input.startDate,
      endDate: input.endDate,
      foodChoice: input.foodChoice,
      helpAfterwards: input.helpAfterwards,
      acceptCoC: input.acceptCoC,
      acceptPhotos: input.acceptPhotos,
      participationRole: {
        connect: { id: input.participationRoleId },
      },
      event: {
        connect: { id: input.eventId },
      },
      userId: input.userId,
    },
  })
}

export const updateParticipation: MutationResolvers['updateParticipation'] = ({
  id,
  input,
}) => {
  return db.participation.update({
    data: input,
    where: { id },
  })
}

export const deleteParticipation: MutationResolvers['deleteParticipation'] = ({
  id,
}) => {
  return db.participation.delete({
    where: { id },
  })
}

export const Participation: ParticipationRelationResolvers = {
  event: (_obj, { root }) => {
    return db.participation.findUnique({ where: { id: root?.id } }).event()
  },
  participationRole: (_obj, { root }) => {
    return db.participation
      .findUnique({ where: { id: root?.id } })
      .participationRole()
  },
}
