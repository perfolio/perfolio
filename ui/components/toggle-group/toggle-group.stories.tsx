import { ToggleGroup, ToggleGroupProps, } from "./group"

export default {
  title: "ToggleGroup",
  component: ToggleGroup,
}

export const Standard = (args: ToggleGroupProps<string>,) => (
  <div className="flex flex-col items-center gap-2">
    <ToggleGroup size="sm" {...args} />
    <ToggleGroup size="md" {...args} />
    <ToggleGroup size="lg" {...args} />
  </div>
)
Standard.args = {
  options: [
    { display: "1W", id: "1w", },
    { display: "1M", id: "1m", },
    { display: "3M", id: "3m", },
    { display: "6M", id: "6m", },
    { display: "YTD", id: "ytd", },
    { display: "1Y", id: "1y", },
    { display: "ALL", id: "all", },
  ],
  selected: "1M",
  setSelected: () => {},
}
