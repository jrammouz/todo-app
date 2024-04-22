describe("Delete Card", () => {
    it("deletes a todo card from list", () => {
        cy.visit('/')

        const card = cy.findAllByText('30');
        let deleteIcon = card.get("#delete-icon")
        deleteIcon.click()
        cy.findAllByText('30').should('exist');
    })
})
