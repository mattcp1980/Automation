// -- Login to the system --
Cypress.Commands.add("pageload", () => {
    cy.visit('/')
    cy.get('h1').contains('Automation Practice Website')
})
// -- Login to the system --
Cypress.Commands.add("login", (email, password) => {
    cy.request({
        method: 'POST',
        url: '/index.php?controller=authentication',
        form: true, 
        body: {
            email: email,
            passwd: password,
            back: 'my-account',
            SubmitLogin:''
        }
    })
    cy.reload()
})

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
