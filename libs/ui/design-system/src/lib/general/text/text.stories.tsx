import { Text, TextProps } from "./text"

export default {
  title: "General/Text",
  component: Text,
}

export const Standard = (args: TextProps) => <Text {...args}>Standard</Text>

export const CustomColor = (args: TextProps) => <Text {...args}>Colors</Text>
CustomColor.args = {
  color: "text-error-500",
}
