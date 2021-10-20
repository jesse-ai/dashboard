const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')

        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
        cy.visit('/#/backtest')
        cy.wait(50)
    })
    it('test routes section', () => {
        cy.contains('Routes')
        cy.contains('Import Candles')
        cy.contains('Start in a new tab')

        cy.get('#add-route').click()
        cy.wait(50)
        cy.get('#trading-route-exchange1').should('have.value', 'Binance')
        cy.get('#trading-route-symbol1').should('have.value', '')
        cy.get('#trading-route-exchange1').contains('Bitfinex')

        cy.get('#trading-route-menu-button1').click()
        cy.wait(50)
        cy.get('[name=trading-delete-menu1]').click()
        cy.get('#trading-route-exchange1').should('not.exist');
    })
})