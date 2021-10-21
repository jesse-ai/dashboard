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
        cy.get('#import-candles-page-button').click()
        cy.wait(50)
    })

    it('test import candles page', () => {
        // test inputs of import candle candles pages
        cy.get('#candles-exchange').contains('Testnet Binance Futures')
        cy.get('#candles-exchange').contains('Bitfinex')
        cy.get('#candles-exchange').select('OKEX')
        cy.get('#candles-exchange').should('have.value', 'OKEX')
        cy.get('#candles-symbol').type('BTC-USDT')
        cy.get('#start-date').should('have.value', '2021-06-01')

        // test start button
        cy.get('#start-button').click()
        cy.wait(50)
        cy.contains('seconds remaining')
        cy.get('#import-candles-cancel-button').click()
        cy.wait(50)
        cy.contains('Exchange')

        // test start in new tab button0
        cy.get('#start-new-tab-button').click()
        cy.wait(50)
        cy.get('#tab1').click()
        cy.wait(50)
        cy.contains('seconds remaining')
        cy.get('#import-candles-cancel-button').click()
        cy.wait(50)
        cy.contains('Start Date')
    })
})