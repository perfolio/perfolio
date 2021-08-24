describe("sign in", () => {
  it("should display welcome message", () => {
    cy.clearCookies()
    cy.getCookie("PERFOLIO_SESSION").should("be.null")

    cy.intercept("POST", "/api/auth/admin").as("admin")

    cy.visit(`/auth/sign-in?email=dev@chronark.com&token=${process.env.AUTH_ROOT_TOKEN}`)
    cy.wait("@admin")
    cy.getCookie("PERFOLIO_SESSION").should("not.be.null")
  })
})
