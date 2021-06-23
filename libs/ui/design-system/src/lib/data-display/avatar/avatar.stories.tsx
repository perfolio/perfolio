import { Avatar, AvatarProps } from "./avatar"

export default {
  title: "Data Display/Avatar",
  component: Avatar,
}

export const Avatars = (args: AvatarProps) => (
  <div className="flex items-center gap-4">
    <Avatar {...args} size="small">
      Avatar
    </Avatar>
    <Avatar {...args} size="medium">
      Avatar
    </Avatar>
    <Avatar {...args} size="large">
      Avatar
    </Avatar>
  </div>
)
Avatars.args = {
  src:
    "https://avatars.githubusercontent.com/u/18246773?s=88&u=bf8234ff570924c4f709b05936e140df599c94a4&v=4",
  alt: "sample icon",
}

export const Square = (args: AvatarProps) => (
  <div className="flex items-center gap-4">
    <Avatar {...args} size="small">
      Avatar
    </Avatar>
    <Avatar {...args} size="medium">
      Avatar
    </Avatar>
    <Avatar {...args} size="large">
      Avatar
    </Avatar>
  </div>
)
Square.args = {
  src:
    "https://avatars.githubusercontent.com/u/18246773?s=88&u=bf8234ff570924c4f709b05936e140df599c94a4&v=4",
  alt: "sample icon",
  square: true,
}
