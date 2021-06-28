describe("Sign up for newsletter", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("/subscribe")
  })

  it("should display success message after successful subscription", () => {
    cy.intercept("POST", "api/emails/subscribe", {}).as("subscribe")
    cy.get("input").type("cypress-test@perfol.io")
    cy.get("button").click()

    cy.wait("@subscribe")
    cy.contains("Thank you!")
  })
})
