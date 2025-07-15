import {
  DateField,
  FieldError,
  Form,
  Label,
  SelectField,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata, useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import PersonalDataCell from 'src/components/PersonalDataCell/PersonalDataCell'
import { UpdatePersonalDataInput } from 'types/graphql'

export const QUERY = PersonalDataCell.QUERY

const UPDATE_PERSONALDATA = gql`
  mutation UpdatePersonalDataMutation(
    $id: BigInt!
    $input: UpdatePersonalDataInput!
  ) {
    updatePersonalData(id: $id, input: $input) {
      id
    }
  }
`

const DELETE_PERSONALDATA = gql`
  mutation DeletePersonalDataMutation($id: BigInt!) {
    deletePersonalData(id: $id) {
      id
    }
  }
`

const PersonalDataPage = () => {
  const { id } = useParams()
  const { data, error } = useQuery(QUERY, {
    variables: { id: parseInt(id) },
  })
  const [updatePersonalData] = useMutation(UPDATE_PERSONALDATA, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.personalDatas())
    },
    onError: (error) => toast.error(error.message),
  })

  const [deletePersonalData] = useMutation(DELETE_PERSONALDATA, {
    onCompleted: () => {
      toast.success('Task deleted')
      navigate(routes.personalDatas())
    },
    onError: (error) => toast.error(error.message),
  })

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const input: UpdatePersonalDataInput = {
      name: (formData.get('name') as string) || null,
      familyName: (formData.get('familyName') as string) || null,
      birthdate: (formData.get('birthdate') as string) || null,
      gender: (formData.get('gender') as string) || null,
      roleId: parseInt(formData.get('role') as string, 10) || null,
      phoneNumber: (formData.get('phoneNumber') as string) || null,
      phoneCaretakerContact:
        (formData.get('phoneCaretakerContact') as string) || null,
      country: (formData.get('country') as string) || null,
      city: (formData.get('city') as string) || null,
      postalCode: (formData.get('postalCode') as string) || null,
      address: (formData.get('address') as string) || null,
    }
    updatePersonalData({ variables: { id, input } })
  }

  const onDelete = () => {
    if (confirm('Delete this task?')) {
      deletePersonalData({ variables: { id } })
    }
  }

  return (
    <>
      <Metadata title="PersonalData" description="PersonalData page" />

      <PersonalDataCell id={id} />
      <div className="rounded-2xl bg-white p-6 shadow-md max-w-xl mx-auto">
        <Form
          onSubmit={onUpdate}
          config={{ mode: 'onBlur' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div>
            <Label name="name" className="font-medium" />
            <TextField
              name="name"
              // defaultValue={data?.name}
              className="input"
              validation={{ required: true }}
            />
            <FieldError name="name" className="text-red-500 text-sm" />
          </div>

          {/* Family Name */}
          <div>
            <Label name="familyName" className="font-medium" />
            <TextField
              name="familyName"
              // defaultValue={data?.familyName}
              className="input"
              validation={{ required: true }}
            />
            <FieldError name="familyName" className="text-red-500 text-sm" />
          </div>

          {/* Birthdate */}
          <div>
            <Label name="birthdate" className="font-medium" />
            <DateField
              name="birthdate"
              // defaultValue={data?.birthdate}
              className="input"
              validation={{ required: true }}
            />
            <FieldError name="birthdate" className="text-red-500 text-sm" />
          </div>

          {/* Gender */}
          <div>
            <Label name="gender" className="font-medium" />
            <SelectField
              name="gender"
              // defaultValue={data?.gender}
              className="input"
              validation={{ required: true }}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </SelectField>
            <FieldError name="gender" className="text-red-500 text-sm" />
          </div>

          {/* Role */}
          <div>
            <Label name="role" className="font-medium" />
            <SelectField
              name="role"
              // defaultValue={data?.roleId}
              className="input"
              validation={{ required: true }}
            >
              <option value="">Select role</option>
              <option value="3">Teilnehmer</option>
              <option value="2">Quartier</option>
              <option value="1">Anmeldung</option>
              <option value="0">Admin</option>
            </SelectField>
            <FieldError name="role" className="text-red-500 text-sm" />
          </div>

          {/* Phone Number */}
          <div>
            <Label name="phoneNumber" className="font-medium" />
            <TextField
              name="phoneNumber"
              // defaultValue={data?.phoneNumber}
              className="input"
            />
            <FieldError name="phoneNumber" className="text-red-500 text-sm" />
          </div>

          {/* Caretaker Contact */}
          <div>
            <Label name="phoneCaretakerContact" className="font-medium" />
            <TextField
              name="phoneCaretakerContact"
              // defaultValue={data?.phoneCaretakerContact}
              className="input"
            />
            <FieldError
              name="phoneCaretakerContact"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Country */}
          <div>
            <Label name="country" className="font-medium" />
            <TextField
              name="country"
              // defaultValue={data?.country}
              className="input"
            />
            <FieldError name="country" className="text-red-500 text-sm" />
          </div>

          {/* City */}
          <div>
            <Label name="city" className="font-medium" />
            <TextField
              name="city"
              // defaultValue={data?.city}
              className="input"
            />
            <FieldError name="city" className="text-red-500 text-sm" />
          </div>

          {/* Postal Code */}
          <div>
            <Label name="postalCode" className="font-medium" />
            <TextField
              name="postalCode"
              // defaultValue={data?.postalCode}
              className="input"
            />
            <FieldError name="postalCode" className="text-red-500 text-sm" />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <Label name="address" className="font-medium" />
            <TextField
              name="address"
              // defaultValue={data?.address}
              className="input"
            />
            <FieldError name="address" className="text-red-500 text-sm" />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-right">
            <Submit className="mt-4 px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
              Save
            </Submit>
          </div>
        </Form>
      </div>
      <button onClick={onDelete}>Delete</button>
      <p>
        <Link to={routes.personalDatas()}>← Back to tasks</Link>
      </p>
    </>
  )
}

export default PersonalDataPage
