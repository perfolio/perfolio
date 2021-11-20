import { Description } from "./description"
export default {
  title: "Description",
  component: Description,
}

export const Default = () => (
  <Description title="Section title">
    To get the most out of this module, you should have worked your way through the previous
    JavaScript modules in the series. Those modules typically involve simple API usage, as it is
    often difficult to write client-side JavaScript examples without them.
  </Description>
)
