const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        // mock important requests
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', '/backtest', { fixture: 'backtest.json' }).as('backtest')
        cy.intercept('delete', '/backtest', { fixture: 'deleteBacktest.json' }).as('backtest')

        // remove cookies and storage 
        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        // visit first page and type password
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
        cy.visit('/#/backtest')
        cy.wait(50)
    })
    it('test routes section', () => {
        // close notification
        cy.get('.notyf__dismiss-btn').click()

        // check main title of page
        cy.get('[data-cy="backtest-content-section"]').should('include.text', 'Routes')
        cy.get('[data-cy="backtest-content-section"]').should('include.text', 'Options')

        // check add trading route
        cy.get('[data-cy="add-route"]').click()
        cy.wait(50)
        cy.get('[data-cy="trading-route-exchange1"]').should('have.value', 'Binance')
        cy.get('[data-cy="trading-route-symbol1"]').should('have.value', '')
        cy.get('[data-cy="trading-route-exchange1"]').should('include.text', 'Bitfinex')

        // check trading route delete button
        cy.get('[data-cy="trading-route-menu-button1"]').click()
        cy.wait(50)
        cy.get('[name=trading-delete-menu1]').click()
        cy.get('[data-cy="trading-route-exchange1"]').should('not.exist');

        // check trading route duplicate
        cy.get('[data-cy="trading-route-exchange0"]').select('Coinbase')
        cy.wait(100)
        cy.get('[data-cy="trading-route-menu-button0"]').click()
        cy.wait(50)
        cy.get('[name=trading-duplicate-menu0]').click()
        cy.get('[data-cy="trading-route-exchange1"]').should('have.value', 'Coinbase');

        // check trading route move up
        cy.get('[data-cy="trading-route-exchange1"]').select('Binance')
        cy.wait(50)
        cy.get('[data-cy="trading-route-menu-button1"]').click()
        cy.wait(50)
        cy.get('[name=trading-moveup-menu1]').click()
        cy.get('[data-cy="trading-route-exchange0"]').should('have.value', 'Binance');

        // check trading route move down
        cy.wait(50)
        cy.get('[data-cy="trading-route-menu-button0"]').click()
        cy.wait(50)
        cy.get('[name=trading-movedown-menu0]').click()
        cy.get('[data-cy="trading-route-exchange1"]').should('have.value', 'Binance');

        // check add extra route button
        cy.get('[data-cy="add-extra-route"]').click()
        cy.get('[data-cy="extra-route-exchange0"]').should('have.value', 'Binance')

        // check extra route duplicate
        cy.get('[data-cy="extra-route-exchange0"]').select('Coinbase')
        cy.wait(50)
        cy.get('[data-cy="extra-route-menu-button0"]').click()
        cy.wait(50)
        cy.get('[name=extra-duplicate-menu0]').click()
        cy.get('[data-cy="extra-route-exchange1"]').should('have.value', 'Coinbase');

        // check delete button of extra route
        cy.get('[data-cy="extra-route-menu-button1"]').click()
        cy.wait(50)
        cy.get('[name=extra-delete-menu1]').click()
        cy.get('[data-cy="extra-route-exchange1"]').should('not.exist');

        // check errors of routes
        cy.get('[data-cy="trading-route-symbol1"]').type('btcsdescdscds')
        cy.wait(50)
        cy.get('[data-cy="error0"]').should('have.text', 'Maximum symbol length is exceeded!')
        cy.get('[data-cy="error1"]').should('have.text', 'Symbol parameter must contain "-" character!')

        cy.get('[data-cy="extra-route-symbol0"]').type('BTC-USDT')
        cy.get('[data-cy="error2"]').should('have.text', 'Extra routes timeframe and routes timeframe must be different')

        cy.get('[data-cy="trading-route-exchange1"]').select('Coinbase')
        cy.wait(50)
        cy.get('[data-cy="trading-route-symbol1"]').clear()
        cy.get('[data-cy="trading-route-symbol1"]').type('BTC-USDT')
        cy.get('[data-cy="error0"]').should("include.text", "each exchange-symbol pair can be traded only once!")
    })

    it('test options, duration and tabs', () => {
        // options fields
        cy.get('[data-cy="backtest-option-section"]').should("include.text", 'Debug Mode')
        cy.get('[data-cy="backtest-option-section"]').should("include.text", 'Export JSON')

        // duration field text
        cy.get('[data-cy="backtest-start-date"]').should('have.value', '2021-01-01')

        // press start button
        cy.get('[data-cy="start-button"]').click()
        cy.wait(50)
        cy.contains('Tab 1 - 0%')
        cy.wait(50)
        cy.contains('Please wait')
        // press cancel button
        cy.get('[data-cy="backtest-cancel-button"]').click()
        cy.wait(50)
        cy.contains('Routes')

        // press new tab button
        cy.get('[data-cy="start-new-tab-button"]').click()
        cy.wait(50)
        cy.get('[data-cy="tab1"]').click()
        cy.wait(50)
        cy.contains('Please wait')
        // press cancel
        cy.get('[data-cy="backtest-cancel-button"]').click()
        cy.wait(50)
        cy.contains('Routes')

        // check remove button
        cy.get('[data-cy="tab-close-button1"]').click()
        cy.wait(50)
        cy.get('[data-cy="tab-close-button1"]').should('not.exist')
    })
})