import { ToggleGroupProps, ToggleGroup } from "./group"

export default {
  title: "ToggleGroup",
  component: ToggleGroup,
}

export const Standard = (args: ToggleGroupProps<string>) => (
  <div className="flex flex-col items-center gap-2">
    <ToggleGroup size="sm" {...args} />
    <ToggleGroup size="md" {...args} />
    <ToggleGroup size="lg" {...args} />
  </div>
)
Standard.args = {
  options: ["1W", "1M", "3M", "6M", "YTD", "1Y", "ALL"],
  selected: "1M",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelected: () => {},
}
