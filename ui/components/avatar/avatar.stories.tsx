import { Avatar, AvatarProps } from "./avatar"

export default {
  title: "Avatar",
  component: Avatar,
}

export const Avatars = (args: AvatarProps) => (
  <div className="flex items-center gap-4">
    <Avatar {...args} size="sm">
      Avatar
    </Avatar>
    <Avatar {...args} size="md">
      Avatar
    </Avatar>
    <Avatar {...args} size="lg">
      lg
    </Avatar>
  </div>
)
Avatars.args = {
  src:
    "https://avatars.githubusercontent.com/u/18246773?s=88&u=bf8234ff570924c4f709b05936e140df599c94a4&v=4",
}

export const Square = (args: AvatarProps) => (
  <div className="flex items-center gap-4">
    <Avatar {...args} size="sm">
      Avatar
    </Avatar>
    <Avatar {...args} size="md">
      Avatar
    </Avatar>
    <Avatar {...args} size="lg">
      Avatar
    </Avatar>
  </div>
)
Square.args = {
  src:
    "https://avatars.githubusercontent.com/u/18246773?s=88&u=bf8234ff570924c4f709b05936e140df599c94a4&v=4",
  square: true,
}

export const Fallback = (args: AvatarProps) => (
  <div className="flex items-center gap-4">
    <Avatar {...args} size="sm">
      Avatar
    </Avatar>
    <Avatar {...args} size="md">
      Avatar
    </Avatar>
    <Avatar {...args} size="lg">
      lg
    </Avatar>
  </div>
)
Fallback.args = {
  fallback: "FB",
}
