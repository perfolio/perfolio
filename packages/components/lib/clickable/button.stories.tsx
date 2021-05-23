import React from "react"
import { Story, Meta } from "@storybook/react"

import { Button } from "./button"
import { ButtonProps } from "./types"
export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: "primary",
  label: "Primary",
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: "secondary",
  label: "Secondary",
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Large",
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Small",
}
