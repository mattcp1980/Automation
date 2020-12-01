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