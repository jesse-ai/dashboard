const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        // mock important requests
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', '/import-candles', { fixture: 'importCandles.json' }).as('importCandles')
        cy.intercept('delete', '/import-candles', { fixture: 'deleteImportCandles.json' }).as('deleteImportCandles')

        // remove cookies and storage 
        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        // visit first page and type password
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
        // check symbols errors
        cy.get('[data-cy="candles-symbol"]').type('sometext')
        cy.get('[data-cy="symbol-error-section"]').should('contain.text', 'Symbol parameter must contain "-" character!')
        cy.get('[data-cy="candles-symbol"]').type('somesome')
        cy.get('[data-cy="symbol-error-section"]').should('contain.text', 'Maximum symbol length is exceeded!')
        cy.get('[data-cy="candles-start-date"]').should('have.value', '2021-01-01')

        // test start button
        cy.get('[data-cy="start-button"]').click()
        cy.wait(50)
        cy.contains('Please wait')
        // press cancel button
        cy.get('[data-cy="import-candles-cancel-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="candles-page-content"]').should('include.text', 'Exchange')

        // test start in new tab button
        cy.get('[data-cy="start-new-tab-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="tab1"]').click()
        cy.wait(50)
        cy.contains('Please wait')
        // press cancel button
        cy.get('[data-cy="import-candles-cancel-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="candles-page-content"]').should('include.text', 'Start Date')
    })
})