describe("Rooms Management", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#12").as("test-room");
  });
  it("Open the types/obstacles modal", () => {
    cy.get("@test-room").click();
    cy.get('[data-cy="modal"]');
  });
  it("Change room types, add obstacles, remove obstacles, remove type", () => {
    cy.get("@test-room").click();
    cy.get('[data-cy="modal-types"]').should("exist");
    cy.get('[data-cy="modal-obstacles"]').should("not.exist");
    cy.get('[data-type="treasure"]').click();
    cy.get('[data-cy="modal-types"]').should("not.exist");
    cy.get('[data-cy="modal-obstacles"]').should("exist");
    cy.get('[data-obstacles="right,left"]').click();
    cy.get('[data-cy="modal"]').should("not.exist");
    cy.get("@test-room")
      .invoke("attr", "data-type")
      .should("equal", "treasure");
    cy.get("@test-room").should("have.class", "right-left");
    cy.get("@test-room").click();
    cy.get(".obstacle").first().click();
    cy.get("@test-room").should("not.have.class", "right-left")
    cy.get("@test-room").click();
    cy.get('[data-cy="modal-types"]').find('.room').first().click();
    cy.get(".obstacle").first().click();
    cy.get("@test-room").invoke('attr', 'data-type').should('be.empty');
  });
  it("Display type AND obstacles if clicked on a room with a type", () => {
    cy.get("@test-room").click();
    cy.get('[data-type="treasure"]').click();
    cy.get('[data-obstacles="right,left"]').click();
    cy.get("@test-room").click();
    cy.get('[data-cy="modal-types"]').should("exist");
    cy.get('[data-cy="modal-obstacles"]').should("exist");
  });
  it("Add a line and a column when adding room in edges", () => {
    cy.get(".room-wrapper").find(".room").should("have.length", 9);
    cy.get("#02").click();
    cy.get('[data-type="treasure"]').click();
    cy.get('[data-obstacles="right,left"]').click();
    cy.get(".room-wrapper").find(".room").should("have.length", 16);
  });
});
