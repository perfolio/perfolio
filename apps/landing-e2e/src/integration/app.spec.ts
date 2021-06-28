describe("landing", () => {
  beforeEach(() => cy.visit("/"))

  it("should display welcome message", () => {
    cy.contains("Insights")
  })
})
