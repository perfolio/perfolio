describe("Sign up for newsletter", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("/subscribe")
  })

  it("should display success message after successful subscription", () => {
    cy.get("input").type("cypress-test@perfol.io")
    cy.get("button").click()

    cy.contains("Thank you!")
  })
})
