import { Input } from "./input"
import { Select } from "./select"
import { Digit } from "./digit"
import { AutoCompleteSelect } from "./autoCompleteSelect"
export * from "./form"
export { useForm } from "react-hook-form"

export const Field = {
  Digit,
  Input,
  Select,
  AutoCompleteSelect,
}
