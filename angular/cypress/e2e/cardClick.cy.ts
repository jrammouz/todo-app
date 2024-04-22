describe('Click on a Todo Card', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/todos', {fixture: 'todos/getTodos'}).as('getTodos');
		cy.visit('/');
	})
	it('Shows a popup with the data of the Todo', () => {
		const div = cy.findAllByText(/30/i);
		div.click();
		let closeButton = cy.findByRole("button", {name: /Close/i});
		closeButton.should('exist');
		closeButton.click();
		closeButton.should('not.exist');
	});

	it("Deletes a todo card when the trash icon is clicked after clicking on a card", () => {
		let div = cy.findAllByText(/30/i);
		div.click();
		let trash = div.get('#trash-icon');
		trash.click();
		cy.findAllByText(/30/i).should('not.exist');
	});

	it("Checks if all cards are available", () => {
		cy.findAllByRole('listitem').should('have.length', 30);
	})

})