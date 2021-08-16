import { Input } from "./lib/input"
import { Select } from "./lib/select"
import { Digit } from "./lib/digit"
import { AutoCompleteSelect } from "./lib/autoCompleteSelect"
export * from "./lib/form"
export { useForm } from "react-hook-form"

export const Field = {
  Digit,
  Input,
  Select,
  AutoCompleteSelect,
}
