import { XIcon } from "@heroicons/react/outline"
import { Icon, IconProps } from "./icon"
export default {
  title: "Icon",
  component: Icon,
}

export const Icons = (args: IconProps) => (
  <div className="flex items-center gap-4">
    <Icon {...args} size="sm">
      <XIcon />
    </Icon>
    <Icon {...args} size="md">
      <XIcon />
    </Icon>
    <Icon {...args} size="lg">
      <XIcon />
    </Icon>
  </div>
)

Icons.args = {
  label: "Close",
}
