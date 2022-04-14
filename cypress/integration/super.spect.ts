describe("Super Secret Rooms", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Test there's no super has long has bossroom isn't placed", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 0);
    cy.get("#13").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="boss"]').click();
    cy.get(".obstacle").first().click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 5);
  });
  it("Display super secrets suggestions when boss room is placed", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="boss"]').click();
    cy.get(".obstacle").first().click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 4);
  });
  it("Display less super secrets suggestions when obstacles", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="boss"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#11").click();
    cy.get('[data-obstacles="top,left"]').click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 2);
  });
  it("Doesn't associate super secret room to corridor", () => {
    cy.get("#12").click();
    cy.get('[data-type="corridor_h"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#12").click();
    cy.get('[data-type="boss"]').click();
    cy.get(".obstacle").first().click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 3);
  });
  it("Test there's no super after removing bossroom", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="boss"]').click();
    cy.get(".obstacle").first().click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 3);
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get(".room-wrapper")
      .find('[data-type="super"]')
      .should("have.length", 0);
  });
});
