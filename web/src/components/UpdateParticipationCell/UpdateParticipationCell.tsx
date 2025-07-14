import type {
  ParticipationQuery,
  ParticipationQueryVariables,
} from 'types/graphql'

import {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
  useMutation,
} from '@redwoodjs/web'
import LoadingSpinner from 'src/components/Loading/LoadingSpinner'
import { useState } from 'react'

export const QUERY: TypedDocumentNode<
  ParticipationQuery,
  ParticipationQueryVariables
> = gql`
  query FindParticipationByIdQuery($id: Int!) {
    participation: participation(id: $id) {
      id
      participationRoleId
      accommodation
      startDate
      endDate
      eventId
      foodChoice
    }
  }
`

const UPDATE_PARTICIPATION_QUERY = gql`
  mutation UpdateParticipationQuery(
    $id: Int!
    $input: ParticipationQueryInput!
  ) {
    updateParticipation(id: $id, input: $input) {
      id
      participationRoleId
      accommodation
      startDate
      endDate
      eventId
      foodChoice
    }
  }
`

export const Loading = () => <LoadingSpinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<ParticipationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  participation,
}: {
  participation: ParticipationQuery['participation']
}) => {
  const [updateParticipation, { loading, error }] = useMutation<
    ParticipationQuery,
    ParticipationQueryVariables
  >(UPDATE_PARTICIPATION_QUERY, {
    update: (cache, { data: { updateParticipation } }) => {
      cache.writeQuery({
        query: QUERY,
        variables: { id: participation.id },
        data: { participation: updateParticipation },
      })
    },
  })

  const [formData, setFormData] = useState({
    participationRoleId: participation.participationRoleId,
    accommodation: participation.accommodation || '',
    startDate: participation.startDate,
    endDate: participation.endDate,
    eventId: participation.eventId,
    foodChoice: participation.foodChoice || 'None',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateParticipation({
        variables: {
          id: participation.id,
          input: {
            participationRoleId: parseInt(formData.participationRoleId, 10),
            accommodation: formData.accommodation,
            startDate: formData.startDate,
            endDate: formData.endDate,
            eventId: parseInt(formData.eventId, 10),
            foodChoice: formData.foodChoice,
          },
        },
        optimisticResponse: {
          updateParticipation: {
            __typename: 'Participation',
            id: participation.id,
            participationRoleId: parseInt(formData.participationRoleId, 10),
            accommodation: formData.accommodation,
            startDate: formData.startDate,
            endDate: formData.endDate,
            eventId: parseInt(formData.eventId, 10),
            foodChoice: formData.foodChoice,
          },
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Participation Details
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Participation Role ID
          </label>
          <input
            type="number"
            name="participationRoleId"
            value={formData.participationRoleId}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Accommodation
          </label>
          <input
            type="text"
            name="accommodation"
            value={formData.accommodation}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event ID
          </label>
          <input
            type="number"
            name="eventId"
            value={formData.eventId}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Food Choice
          </label>
          <select
            name="foodChoice"
            value={formData.foodChoice}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="None">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Updating...' : 'Update Participation'}
        </button>
      </form>
    </div>
  )
}
