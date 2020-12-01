// <reference types="cypress" />
describe('Complete an product search', () => {
    beforeEach(() => {
        //set password to env variable password passed in and ensure if not passed in errors don't show the password.
        //NOTE running or opening cypress will need to be prefixed with CYPRESS_password=****** where ****** is the password
        const password = Cypress.env('password')
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...')
        }
        //login, load the page and pull the product fixture data in
        cy.login('matthewparker@diversitus.com', 'mat28par')
        cy.pageload()
        cy.fixture('products.json').as('products')
    })
    it('enters a general term into search and searches using search button', () =>{
        cy.get('#search_query_top').type('Dress')
        cy.get('#searchbox > .btn').click()
        cy.contains('No results were found for your search').should('not.exist')
        cy.get('.lighter').contains('Dress')
    })
    it('checks specific products searched for by pressing enter return correct products', function() {
        //Loop through each product in the collection
        cy.get('@products').each((product) =>{
            //Enter the product and run a search
            cy.get('#search_query_top').type(product.Product + '{enter}')
            
            //Ensure results are returned and the product searched is returned
            cy.contains('No results were found for your search').should('not.exist')
            cy.get('#center_column').contains(product.Product)
            cy.get('#center_column').contains(product.Price)
            //clear the search box before the next search
            cy.get('#search_query_top').clear()
        })
    })
})