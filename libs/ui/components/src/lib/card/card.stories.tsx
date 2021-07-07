import { Card } from "./index"
import { Text } from "../text/text"
import { Button } from "../clickable"
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
        <Button kind="secondary" size="small" href="#">
          Undo
        </Button>
        <Button kind="primary" size="small" href="#">
          Save
        </Button>
      </Card.Footer.Actions>
    </Card.Footer>
  </Card>
)
