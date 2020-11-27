// <reference types="cypress" />
describe('Complete an product search', () => {
    beforeEach(() => {
        //login, load the page and pull the product fixture data in
        cy.login('matthewparker@diversitus.com', 'mat28par')
        cy.pageload()
        cy.fixture('products.json').as('products')
    })
    it('Enters a single value into search search using search button', () =>{
        cy.get('#search_query_top').type('Dress')
        cy.get('#searchbox > .btn').click()
        cy.contains('No results were found for your search').should('not.exist')
        cy.get('.lighter').contains('Dress')
    })
    it('Checks specific products searched return correct products', function() {
        //Loop through each product in the collection
        cy.get('@products').each((product) =>{
            //Enter the product and run a search
            cy.get('#search_query_top').type(product.Product)
            cy.get('#searchbox > .btn').click()
            
            //Ensure results are returned and the product searched is returned
            cy.contains('No results were found for your search').should('not.exist')
            cy.get('#center_column').contains(product.Product)
            cy.get('#center_column').contains(product.Price)
            //clear the search box before the next search
            cy.get('#search_query_top').clear()
        })
    })
})