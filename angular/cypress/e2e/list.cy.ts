describe("card deletion", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/todos", {fixture: "todos/getTodos"}).as("getTodos");
    cy.visit('/');

    cy.intercept("DELETE", "**/todos/*", '').as("deleteTodo");
    cy.visit('/');
  });

  it('should update the todo list on deletion', () => {
    cy.findAllByRole('listitem').should('have.length.at.least', 1);
    cy.findAllByText('test').should('have.length', 1);
    cy.findAllByText('test').should('exist');
    cy.contains('li', 'test').within(() => {
      cy.findAllByRole('button', {name: /delete/i}).should("exist").click();
    });
    cy.findAllByText('test').should('have.length', 0);
    cy.findAllByText('test').should('not.exist');
  })
})
