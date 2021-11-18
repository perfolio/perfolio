import { XIcon, } from "@heroicons/react/outline"
import { Card, } from "../card"
import Icon from "../icon/icon"
import { Modal, } from "."
import { ModalProps, } from "./modal"
export default {
  title: "Modal",
  component: Modal,
}

export const Default = (args: ModalProps,) => (
  <Modal {...args}>
    <Card>
      <Card.Header>
        <Card.Header.Title title="Title" />
        <Modal.Close>
          <Icon label="Close" size="sm">
            <XIcon />
          </Icon>
        </Modal.Close>
      </Card.Header>
      <Card.Content>
        US Recession Probabilities. Smoothed recession probabilities for the United States are
        obtained from a dynamic-factor markov-switching model applied to four monthly coincident
        variables: non-farm payroll employment, the index of industrial production, real personal
        income excluding transfer payments, and real manufacturing and trade sales.
      </Card.Content>
    </Card>
  </Modal>
)
Default.args = {
  trigger: "Trigger",
}

export const ForceOpen = (args: ModalProps,) => (
  <Modal {...args}>
    <Card>
      <Card.Header>
        <Card.Header.Title title="Title" />
      </Card.Header>
      <Card.Content>I am always open</Card.Content>
    </Card>
  </Modal>
)
ForceOpen.args = {
  trigger: null,
}
