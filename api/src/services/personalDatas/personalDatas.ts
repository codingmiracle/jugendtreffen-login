import type {
  MutationResolvers,
  PersonalDataRelationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'

export const personalDatas: QueryResolvers['personalDatas'] = () => {
  return db.personalData.findMany()
}

export const personalData: QueryResolvers['personalData'] = ({ id }) => {
  return db.personalData.findUnique({
    where: { id },
  })
}

export const getPersonalDataByUserId: QueryResolvers['getPersonalDataByUserId'] =
  ({ userId }) => {
    return db.personalData.findUnique({
      where: { userId },
    })
  }

export const createPersonalData: MutationResolvers['createPersonalData'] = ({
  input,
}) => {
  if (db.personalData.findUnique({ where: { userId: input.userId } })) {
    throw new UserInputError('Zu dieser Email existiert bereits ein Account')
  }
  return db.personalData.create({
    data: input,
  })
}

export const updatePersonalData: MutationResolvers['updatePersonalData'] = ({
  id,
  input,
}) => {
  return db.personalData.update({
    data: input,
    where: { id },
  })
}

export const deletePersonalData: MutationResolvers['deletePersonalData'] = ({
  id,
}) => {
  return db.personalData.delete({
    where: { id },
  })
}

export const PersonalData: PersonalDataRelationResolvers = {
  role: (_obj, { root }) => {
    return db.personalData.findUnique({ where: { id: root?.id } }).role()
  },
}
