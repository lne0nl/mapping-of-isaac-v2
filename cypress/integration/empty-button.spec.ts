describe("Destroy the Floor button", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Empty the floor", () => {
    cy.get(".room-wrapper").find(".room").should("have.length", 9);
    cy.get(".room-wrapper").find('[data-type="empty"]').should("have.length", 1);

    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();

    cy.get(".room-wrapper").find(".room").should("have.length", 16);
    cy.get(".room-wrapper").find('[data-type="empty"]').should("have.length", 3);

    // Testing initial state.
    cy.get('.button').click();
    cy.get(".room-wrapper").find(".room").should("have.length", 9);
    cy.get(".room-wrapper").find('[data-type="empty"]').should("have.length", 1);
  });
});
