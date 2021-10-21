const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', '/logout-jesse-trade', { fixture: 'logout.json' }).as('logout')

        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
        cy.get('#live-page-button').click()
        cy.wait(50)
    })

    it('test live page', () => {
        cy.url().should('include', '/live/1')

        // we check routes component previously in backtest page

        // check element for login situation
        cy.get('#live-start-button').click()
        cy.wait(50)
        cy.contains('seconds remaining')
        cy.get('#live-cancel-button').click()
        cy.wait(50)
        cy.contains('Routes')

        // close notification
        cy.get('.notyf__dismiss-btn').click()
        // logout
        cy.get('#nav-menu-button').click()
        cy.wait(50)
        cy.get('[name=nav-logout-button]').click()
        cy.wait(50)
        cy.get('#confirm-logout-button').click()
        cy.get('#nav-menu-button').click()
        cy.wait(50)
        cy.get('[name=nav-logout-button]').should('not.exist')
        cy.get('#live-action-button').should('have.text', ' Login to Jesse.Trade ')

        // close notifications
        cy.get('.notyf__dismiss-btn').click()

        // check login button
        cy.get('#live-login-button').click()
        cy.wait(50)
        cy.get('#slideover-title').should('have.text', 'Login to your Jesse account')
        cy.get('#login-cancel-button').click()
        cy.wait(50)
        cy.get('#nav-menu-button').click()
        cy.get('[name=nav-login-button]').should('not.exist')
    })
})