describe("Secret Rooms", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Suggest a Secret Room", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#22").invoke("attr", "data-type").should("equal", "secret");
  });
  it("Should not suggest a secret room if adjacent room has obstacle", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".bottom.obstacle").click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#22").invoke("attr", "data-type").should("be.empty");
  });
  it("Should not suggest a secret room if top room is a corridor", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="corridor_h"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#22").invoke("attr", "data-type").should("be.empty");
  });
  it("Priorize 3 or 4 contacts room for Secret", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#01").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#02").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#42").invoke("attr", "data-type").should("be.empty");
    cy.get("#22").invoke("attr", "data-type").should("equal", "secret");
  });
  it("Doesn't suggest secret if a near room is a boss room", () => {
    cy.get("#12").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="empty"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#21").click();
    cy.get('[data-cy="modal-types"]').find('[data-type="boss"]').click();
    cy.get(".obstacle").first().click();
    cy.get("#22").invoke("attr", "data-type").should("be.empty");
  })
});
