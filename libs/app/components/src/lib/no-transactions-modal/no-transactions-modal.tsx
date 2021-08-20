import React from "react"
import { Button, Modal, Card, Text } from "@perfolio/ui/components"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"

/**
 * Force the user to add a transaction
 */
export const NoTransactionsModal: React.FC = (): JSX.Element => {
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
              <Button size="auto" kind="primary" href="/transactions/new">
              {t("noTransactionsAdd")}
              </Button>
            </Card.Footer.Actions>
          </Card.Footer>
        </Card>
      </div>
    </Modal>
  )
}
