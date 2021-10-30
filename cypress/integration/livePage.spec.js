const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        // mock important requests
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', '/logout-jesse-trade', { fixture: 'logout.json' }).as('logout')
        cy.intercept('post', '/live', { fixture: 'live.json' }).as('live')
        cy.intercept('delete', '/live', { fixture: 'deleteLive.json' }).as('deleteLive')
        cy.intercept('post', '/login-jesse-trade', { fixture: 'loginJesseTrade.json' }).as('loginJesseTrade')

        // remove cookies and storage 
        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        // visit first page and type password
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
        cy.get('#live-page-button').click()
        cy.wait(50)
    })

    it('test live page', () => {
        // check page url
        cy.url().should('include', '/live/1')

        // we check routes component previously in backtest page

        // press live start button
        cy.get('[data-cy="live-start-button"]').click()
        cy.wait(50)
        cy.contains('Please wait')
        // press cancel button
        cy.get('[data-cy="live-cancel-button"]').click()
        cy.wait(50)
        // check we are in live page
        cy.get('[data-cy="live-page-content"]').should('include.text', 'Routes')
        cy.get('[data-cy="live-page-content"]').should('include.text', 'Options')

        // close notification
        cy.get('.notyf__dismiss-btn').click()
        // by mocking request app think we are login. for watching login button of live page
        // open navbar
        cy.get('[data-cy="nav-dropdown-menu-button"]').click()
        cy.wait(50)
        // press logout
        cy.get('[name=nav-logout-button]').click()
        cy.wait(50)
        cy.get('[data-cy="confirm-logout-button"]').click()
        cy.get('[data-cy="nav-dropdown-menu-button"]').click()
        cy.wait(50)
        // check logout not exist and watch login button on live page
        cy.get('[name=nav-logout-button]').should('not.exist')
        cy.get('[data-cy="live-action-button"]').should('have.text', ' Login to Jesse.Trade ')

        // close notifications 
        cy.get('.notyf__dismiss-btn').click()

        // now check login button
        cy.get('[data-cy="live-login-button"]').click()
        cy.wait(50)
        // must visit login slideover
        cy.get('[data-cy="slideover-title"]').should('have.text', 'Login to your Jesse account')
        cy.get('[data-cy="login-cancel-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="nav-dropdown-menu-button"]').click()
        cy.get('[name=nav-login-button]').should('not.exist')
    })
})