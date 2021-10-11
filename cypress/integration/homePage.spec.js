const loginDetails = require('../fixtures/login')

describe('test home page', () => {
    beforeEach(() => {
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
    })
    it('test content', () => {
        cy.visit('/')
        cy.get('input').type('test')
        cy.get('button').click()
    })

})