import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'

interface FormFieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  name?: string
}

const FormField = ({ id, label, type, placeholder, value, onChange, name }: FormFieldProps) => {
  return (
    <div>
      <Label htmlFor={id} className='text-zinc-300'>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required
        name={name}
        className='bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500'
      />
    </div>
  )
}

export default FormField
