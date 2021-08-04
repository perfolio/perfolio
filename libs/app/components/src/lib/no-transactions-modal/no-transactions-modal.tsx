import React from "react"
import { Button, Modal, Card, Text } from "@perfolio/ui/components"

/**
 * Force the user to add a transaction
 */
export const NoTransactionsModal: React.FC = (): JSX.Element => {
  return (
    <Modal trigger={null}>
      <div>
        <Card>
          <Card.Header>
            <Card.Header.Title title="Your portfolio seems to be empty" />
          </Card.Header>
          <Card.Content>
            <Text>Looks like you did not add any transactions yet.</Text>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Status></Card.Footer.Status>
            <Card.Footer.Actions>
              <Button size="auto" kind="primary" href="/transactions/new">
                Add transaction
              </Button>
            </Card.Footer.Actions>
          </Card.Footer>
        </Card>
      </div>
    </Modal>
  )
}
