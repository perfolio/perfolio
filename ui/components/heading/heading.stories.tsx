import { Heading, HeadingProps } from "./heading"

export default {
  title: "Heading",
  component: Heading,
}

export const Headings = (args: HeadingProps) => (
  <div>
    <Heading {...args} h1>
      Heading
    </Heading>
    <Heading {...args} h2>
      Heading
    </Heading>
    <Heading {...args} h3>
      Heading
    </Heading>
    <Heading {...args} h4>
      Heading
    </Heading>
  </div>
)

export const CustomColor = (args: HeadingProps) => (
  <Heading h1 {...args}>
    Colors
  </Heading>
)
CustomColor.args = {
  color: "text-error",
}
