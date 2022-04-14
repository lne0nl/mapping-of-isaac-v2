import { mount } from "@cypress/vue";
import Room from '../Room.vue';

describe('Room', () => {
  it('Room', () => {
    mount(Room, { props: { id: '12', type: 'treasure', obstacles: [], title: 'Empty' } });
  });

  it("Renders properly", () => {
    mount(Room, { props: { id: "12", type: "boss", obstacles: [] } });
    cy.get("img").should("have.attr", "src").should("contain", "boss.png");
  })
})