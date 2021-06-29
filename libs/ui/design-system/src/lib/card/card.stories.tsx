import { Card } from "./index"
import { Text } from "../text/text"
import { Button } from "@perfolio/ui/components"
export default {
  title: "Card",
  component: Card,
}

export const Default = () => (
  <Card>
    <Card.Header>
      <Card.Header.Title title="Hello World" subtitle="How are you?" />
    </Card.Header>
    <Card.Content>
      <Text>
        To get the most out of this module, you should have worked your way through the previous
        JavaScript modules in the series. Those modules typically involve simple API usage, as it is
        often difficult to write client-side JavaScript examples without them.
      </Text>
    </Card.Content>

    <Card.Footer>
      <Card.Footer.Status>200 OK</Card.Footer.Status>
      <Card.Footer.Actions>
        <Button
          kind="secondary"
          size="small"
          label="Undo"
          onClick={() => {
            console.log("I am not empty")
          }}
        ></Button>
        <Button
          kind="primary"
          size="small"
          label="Save"
          onClick={() => {
            console.log("I am not empty")
          }}
        ></Button>
      </Card.Footer.Actions>
    </Card.Footer>
  </Card>
)
