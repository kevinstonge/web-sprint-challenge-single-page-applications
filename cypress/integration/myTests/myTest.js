context("TestForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });

  describe("Implicit Assertions", () => {
    it("should fill in the form", () => {
      // https://on.cypress.io/should
      cy.get("[data-cy=name]").type("asdf").should("have.value", "asdf");
      cy.get("[data-cy=size]").select("small").should("have.value", "small");
      cy.get("[data-cy=tp_pepperoni]").check().should("be.checked");
      cy.get("[data-cy=tp_sausage]").check().should("be.checked");
      cy.get("[data-cy=addToOrderButton")
        .click()
        .then(() =>
          cy.get("[data-cy=cartButton]").should("contain", "cart [1]")
        );
    });
  });
});
