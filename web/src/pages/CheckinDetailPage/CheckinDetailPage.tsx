import { Metadata } from '@redwoodjs/web'
import { useParams } from '@redwoodjs/router'
import {
  CheckboxField,
  Form,
  Label,
  NumberField,
  SelectField,
  Submit,
  TextField,
} from '@redwoodjs/forms'

const CheckinDetailPage = () => {
  const { id } = useParams()
  const UserForm = ({ onSave }: { onSave: (data: any) => void }) => {
    const onSubmit = (data) => {
      onSave(data)
    }

    return (
      <>
        <Metadata title="Check In" description="Check In" />

        <section className="flex flex-col p-6 mx-auto lg:py-0 h-full mt-20 gap-2">
          <h1>Check In</h1>
          <div className="mb-4l">
            <Form
              onSubmit={onSubmit}
              className="space-y-6 bg-white p-6 rounded-md shadow-md max-w-xl mx-auto"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label name="firstName" className="block font-medium">
                    Name
                  </Label>
                  <TextField name="firstName" className="input" />
                </div>
                <div>
                  <Label name="lastName" className="block font-medium">
                    Familienname
                  </Label>
                  <TextField name="lastName" className="input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label name="age" className="block font-medium">
                    Alter
                  </Label>
                  <NumberField name="age" className="input" />
                </div>
                <div>
                  <Label name="gender" className="block font-medium">
                    Geschlecht
                  </Label>
                  <SelectField name="gender" className="input">
                    <option value="">Bitte wählen</option>
                    <option value="male">Männlich</option>
                    <option value="female">Weiblich</option>
                  </SelectField>
                </div>
              </div>

              <div>
                <Label name="dateFrom" className="block font-medium">
                  Date range
                </Label>
                <div className="flex items-center space-x-2">
                  <input type="date" name="dateFrom" className="input" />
                  <span>bis</span>
                  <input type="date" name="dateTo" className="input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <Label name="price" className="block font-medium">
                    Preis
                  </Label>
                  <div className="flex items-center space-x-2">
                    <NumberField name="price" className="input w-full" />
                    <span>€</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckboxField name="paid" />
                  <Label name="paid">hat bezahlt</Label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <CheckboxField
                  name="idChecked"
                  validation={{ required: true }}
                />
                <Label name="idChecked">Ausweis kontrolliert</Label>
              </div>

              <div className="flex items-center space-x-2">
                <CheckboxField name="parentConfirmed" />
                <Label name="parentConfirmed">Elternbestätigung</Label>
              </div>

              <div className="pt-4">
                <Submit className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  bestätigen
                </Submit>
              </div>
            </Form>
          </div>
        </section>
      </>
    )
  }
}

export default CheckinDetailPage
