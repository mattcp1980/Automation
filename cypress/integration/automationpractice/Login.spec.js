// <reference types="cypress" />
//NOTE running or opening cypress will need to be prefixed with CYPRESS_password=****** where ****** is the password

describe('Login to the site', () => {
    beforeEach(() => {
        //load the test site
        cy.pageload()

        //pull in user fixture data
        cy.fixture('users.json').as('users')
        
    })
    it('includes a sign in link', () => { 
        cy.get('.login').contains('Sign in')
    })
    it('loads the login page on selecting sign in', () =>{
        cy.get('.login').click()
        cy.contains('Authentication')
    })
    it('logs the user in when entering valid details', function() {
        //pass in password as an environment variable
        const password = Cypress.env('password')
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...')
        }
        //loop through the users to check multiple users logging in
        cy.get('@users').each((user) =>{

            //load the login page and enter each users details from the fixture file
            cy.get('.login').click()
            cy.get('#email').type(user.email)
            cy.get('#passwd').type(password, {log:false})
            cy.get('#SubmitLogin > span').click()
            
            //check that the first name and last name are displayed correctly for each user
            cy.get('.nav > .container > .row').contains(user.Firstname)
            cy.get('.nav > .container > .row').contains(user.Lastname)
            cy.get('.nav > .container > .row').contains('Sign out')
            cy.get('.logout').click()
        })   
    })
    it('checks that INCORRECT password provides the correct validation', function() {
        cy.get('@users').then((users) => {
            const user = users[0]

            //load the login page and enter the first user login details
            cy.get('.login').click()
            cy.get('#email').type(user.email)
            cy.get('#passwd').type('failtest')
            cy.get('#SubmitLogin > span').click()

            //check that the Authentication failed message is displayed
            cy.get('#center_column > :nth-child(2)').contains('Authentication failed')
        
        })
    })
    it('checks that INVALID password provides the correct validation', function() {
        cy.get('@users').then((users) => {
            const user = users[0]

            //load the login page and enter the first user login details
            cy.get('.login').click()
            cy.get('#email').type(user.email)
            cy.get('#passwd').type('1')
            cy.get('#SubmitLogin > span').click()

            //check that the Authentication failed message is displayed
            cy.get('#center_column > :nth-child(2)').contains('Invalid password')
        
        })
    })
    it('checks that UNKNOWN email provides the correct validation', () => {
        //pass in password as an environment variable
        const password = Cypress.env('password')
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...')
        }
        //load the login page and enter the first user login details
        cy.get('.login').click()
        cy.get('#email').type('mattp1980invalid@virginmedia.com')
        cy.get('#passwd').type(password, {log:false})
        cy.get('#SubmitLogin > span').click()

        //check that the Authentication failed message is displayed
        cy.get('#center_column > :nth-child(2)').contains('Authentication failed')
        
    })
    it('checks that INVALID email provides the correct validation', () => {
        //pass in password as an environment variable
        const password = Cypress.env('password')
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...')
        }
        //load the login page and enter the first user login details
        cy.get('.login').click()
        cy.get('#email').type('invaliduser')
        cy.get('#passwd').type(password, {log:false})
        cy.get('#SubmitLogin > span').click()

        //check that the Authentication failed message is displayed
        cy.get('#center_column > :nth-child(2)').contains('Invalid email address')
        
    })
})