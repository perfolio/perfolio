import React, { MouseEvent } from "react"
import { Button, Modal, Card, Text } from "@perfolio/ui/components"

export interface DeletionModalProps {
  onCancel: (e?: MouseEvent<HTMLButtonElement>) => void | Promise<void>
  onDelete: (e?: MouseEvent<HTMLButtonElement>) => void | Promise<void>
}

/**
 * Force the user to delete or cancel
 */
export const DeletionModal: React.FC<DeletionModalProps> = ({
  onCancel,
  onDelete,
}): JSX.Element => {
  return (
    <Modal trigger={null}>
      <div>
        <Card>
          <Card.Header>
            <Card.Header.Title title="Do you really want to delete the portfolio?" />
          </Card.Header>
          <Card.Content>
            <Text>The given portfolio will be irrevocably deleted.</Text>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Status>
              <Button kind="primary" onClick={() => onCancel()}>
                Cancel
              </Button>
            </Card.Footer.Status>
            <Card.Footer.Actions>
              <Button kind="alert" onClick={() => onDelete()}>
                Delete
              </Button>
            </Card.Footer.Actions>
          </Card.Footer>
        </Card>
      </div>
    </Modal>
  )
}
