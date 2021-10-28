const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', '/import-candles', { fixture: 'importCandles.json' }).as('importCandles')
        cy.intercept('delete', '/import-candles', { fixture: 'deleteImportCandles.json' }).as('deleteImportCandles')

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
        cy.get('[data-cy="candles-exchange"]').contains('Testnet Binance Futures')
        cy.get('[data-cy="candles-exchange"]').contains('Bitfinex')
        cy.get('[data-cy="candles-exchange"]').select('OKEX')
        cy.get('[data-cy="candles-exchange"]').should('have.value', 'OKEX')
        cy.get('[data-cy="candles-symbol"]').type('BTC-USDT')
        cy.get('[data-cy="candles-start-date"]').should('have.value', '2021-06-01')

        // test start button
        cy.get('[data-cy="start-button"]').click()
        cy.wait(50)
        cy.contains('seconds remaining')
        cy.get('[data-cy="import-candles-cancel-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="candles-page-content"]').should('include.text', 'Exchange')

        // test start in new tab button
        cy.get('[data-cy="start-new-tab-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="tab1"]').click()
        cy.wait(50)
        cy.contains('seconds remaining')
        cy.get('[data-cy="import-candles-cancel-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="candles-page-content"]').should('include.text', 'Start Date')
    })
})