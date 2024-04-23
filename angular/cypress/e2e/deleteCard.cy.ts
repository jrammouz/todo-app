describe("Delete Card", () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it("deletes a todo card from list", () => {
    const card = cy.findByText('30');
    const deleteIcon = card.get("#delete-icon")
    deleteIcon.click()
    const deleteConfirmation = card.get("#confirmed-delete");
    deleteConfirmation.click();
    cy.findByText('30').should('not.exist');
  });

  it("show details modal on click", () => {
    const card = cy.findByText('30');
    card.click()


    const modal = cy.get('[data-testid="iammodal"]');
    modal.should('exist');
  });
})
