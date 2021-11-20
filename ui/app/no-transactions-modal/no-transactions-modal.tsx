import { useI18n } from "@perfolio/pkg/i18n"
import { Button, Card, Modal, Text } from "@perfolio/ui/components"
import React from "react"

/**
 * Force the user to add a transaction
 */
export const NoTransactionsModal: React.FC = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <Modal trigger={null}>
      <div>
        <Card>
          <Card.Header>
            <Card.Header.Title title={t("noTransactionsTitle")} />
          </Card.Header>
          <Card.Content>
            <Text>{t("noTransactionsText")}</Text>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Status></Card.Footer.Status>
            <Card.Footer.Actions>
              <Button type="primary" href="/transactions/new">
                {t("noTransactionsAdd")}
              </Button>
            </Card.Footer.Actions>
          </Card.Footer>
        </Card>
      </div>
    </Modal>
  )
}
