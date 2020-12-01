// <reference types="cypress" />
//NOTE running or opening cypress will need to be prefixed with CYPRESS_password=****** where ****** is the password

describe('Login to the site and search for a product e2e', () => {
    before(() => {
        //load the test site
        cy.pageload()
        
    })
    beforeEach(() => {
        //pull in user fixture data
        cy.fixture('users.json').as('users')
        
    })
    it('logs user in', function() {
        //pass in password as an environment variable
        const password = Cypress.env('password')
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...')
        }
        cy.get('@users').then((users) => {
            const user = users[0]

            //load the login page and enter the first user login details
            cy.get('.login').click()
            cy.get('#email').type(user.email)
            cy.get('#passwd').type(password, {log:false})
            cy.get('#SubmitLogin > span').click()

            //check that the first name and last name are displayed correctly for each user
            cy.get('.nav > .container > .row').contains(user.Firstname)
            cy.get('.nav > .container > .row').contains(user.Lastname)
            cy.get('.nav > .container > .row').contains('Sign out')
        
        })
    })
    it('enters a general term into search and searches using search button', () =>{
        cy.get('#search_query_top').type('Dress')
        cy.get('#searchbox > .btn').click()
        cy.contains('No results were found for your search').should('not.exist')
        cy.get('.lighter').contains('Dress')
    })
})   