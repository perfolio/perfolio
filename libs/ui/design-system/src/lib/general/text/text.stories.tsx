import { Text, TextProps } from "./text"

export default {
  title: "General/Text",
  component: Text,
}

export const Standard = (args: TextProps) => <Text {...args}>Standard</Text>

export const Headings = (args: TextProps) => (
  <div>
    <Text {...args} heading="h1">
      Heading
    </Text>
    <Text {...args} heading="h2">
      Heading
    </Text>
    <Text {...args} heading="h3">
      Heading
    </Text>
    <Text {...args} heading="h4">
      Heading
    </Text>
  </div>
)

export const CustomColor = (args: TextProps) => <Text {...args}>Colors</Text>
CustomColor.args = {
  color: "text-error-500",
}
